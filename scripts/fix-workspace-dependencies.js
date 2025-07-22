import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// Get the current working directory (root of the monorepo)
const workspaceRoot = process.cwd();

// Function to get all workspace package names and their paths using `pnpm list -r`
function getWorkspacePackages() {
  const result = execSync("pnpm list -r --json", { encoding: "utf-8" });

  // Regular expression to match `name` and `path` in the pnpm output
  const regex = /"name":\s*"([^"]+)"[^}]*"path":\s*"([^"]+)"/g;

  const workspacePackages = [];
  let match;

  // Find all matches for package names and paths
  while ((match = regex.exec(result)) !== null) {
    const name = match[1]; // Package name
    const packagePath = match[2]; // Package path
    workspacePackages.push({ name, path: packagePath });
  }

  console.log("Found workspace packages:", workspacePackages); // Debugging output
  return workspacePackages;
}

// Function to update package.json version for workspace dependencies
function updatePackageJson(packageJsonPath, workspacePackages) {
  if (
    !fs.existsSync(packageJsonPath) ||
    fs.statSync(packageJsonPath).isDirectory()
  ) {
    console.log(`Skipping directory: ${packageJsonPath}`);
    return; // Skip if the path is not a file (i.e., it's a directory)
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  let updated = false;

  // Iterate over dependencies (dependencies, devDependencies, peerDependencies)
  const keys = ["dependencies", "devDependencies", "peerDependencies"];

  keys.forEach((depType) => {
    if (packageJson[depType]) {
      Object.keys(packageJson[depType]).forEach((dep) => {
        if (workspacePackages.some((pkg) => pkg.name === dep)) {
          console.log(`Updating ${dep} in ${packageJsonPath}`); // Debugging output
          packageJson[depType][dep] = "workspace:*";
          updated = true;
        }
      });
    }
  });

  // Write back the modified package.json if there was an update
  if (updated) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }
}

// Main function to update all workspaces
function updateWorkspaces() {
  const workspacePackages = getWorkspacePackages();

  if (workspacePackages.length === 0) {
    console.log("No workspace packages found.");
    return;
  }

  // Get all directories that might contain package.json files (including `packages/` folder)
  workspacePackages.forEach((pkg) => {
    let packageJsonPath = path.join(pkg.path, "package.json");

    console.log(`Checking package.json at: ${packageJsonPath}`); // Debugging output

    // Check if the path is a directory, and if it is, skip it
    if (
      fs.existsSync(packageJsonPath) &&
      fs.statSync(packageJsonPath).isFile()
    ) {
      updatePackageJson(packageJsonPath, workspacePackages);
    } else {
      console.log(
        `Skipping directory or non-existent file: ${packageJsonPath}`,
      );
    }
  });
}

updateWorkspaces();
