import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const workspaceRoot = process.cwd();

function getWorkspacePackages() {
  // --only-projects restricts to workspace projects (not their node_modules)
  // --depth -1 means "just the projects", not their dependency graph
  const raw = execSync(
    "pnpm list -r --depth -1 --only-projects --json",
    { encoding: "utf-8" }
  );

  let parsed = [];
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse pnpm list output as JSON:", e);
    return [];
  }

  const items = (Array.isArray(parsed) ? parsed : [parsed])
    .filter((it) => it && it.name && it.path)
    // keep things inside the repo root and not under node_modules
    .filter(
      (it) =>
        path.resolve(it.path).startsWith(path.resolve(workspaceRoot)) &&
        !it.path.includes(`${path.sep}node_modules${path.sep}`)
    )
    .map((it) => ({ name: it.name, path: it.path }));

  console.log("Workspace projects:", items);
  return items;
}

function updatePackageJson(packageJsonPath, workspacePackages) {
  if (!fs.existsSync(packageJsonPath) || fs.statSync(packageJsonPath).isDirectory()) {
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  const keys = ["dependencies", "devDependencies", "peerDependencies"];

  const workspaceNames = new Set(workspacePackages.map((p) => p.name));

  let updated = false;
  for (const depType of keys) {
    const deps = packageJson[depType];
    if (!deps) continue;

    for (const dep of Object.keys(deps)) {
      if (workspaceNames.has(dep)) {
        if (!String(deps[dep]).startsWith("workspace:")) {
          deps[dep] = "workspace:*";
          updated = true;
          console.log(`Updated ${dep} in ${packageJsonPath} -> workspace:*`);
        }
      }
    }
  }

  if (updated) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }
}

function updateWorkspaces() {
  const workspacePackages = getWorkspacePackages();
  if (workspacePackages.length === 0) {
    console.log("No workspace packages found.");
    return;
  }

  for (const pkg of workspacePackages) {
    const packageJsonPath = path.join(pkg.path, "package.json");
    if (fs.existsSync(packageJsonPath) && fs.statSync(packageJsonPath).isFile()) {
      updatePackageJson(packageJsonPath, workspacePackages);
    }
  }
}

updateWorkspaces();
