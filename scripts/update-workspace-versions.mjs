import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PACKAGES_DIR = path.join(__dirname, "packages");

async function findPackageJsonFiles() {
  return await glob("**/package.json", {
    cwd: PACKAGES_DIR,
    absolute: true,
    ignore: ["**/node_modules/**"],
  });
}

async function getLocalPackages(packageJsonPaths) {
  const packages = new Map();

  for (const pkgPath of packageJsonPaths) {
    const pkgJson = JSON.parse(await fs.readFile(pkgPath, "utf-8"));
    if (pkgJson.name) {
      packages.set(pkgJson.name, pkgPath);
    }
  }

  return packages;
}

function updateDependencies(pkgJson, localPackages) {
  const depTypes = ["dependencies", "devDependencies", "peerDependencies"];
  let changed = false;

  for (const type of depTypes) {
    if (!pkgJson[type]) continue;

    for (const [dep, version] of Object.entries(pkgJson[type])) {
      if (localPackages.has(dep) && version !== "workspace:*") {
        pkgJson[type][dep] = "workspace:*";
        changed = true;
      }
    }
  }

  return changed;
}

async function main() {
  const packageJsonPaths = await findPackageJsonFiles();
  const localPackages = await getLocalPackages(packageJsonPaths);

  for (const [name, pkgPath] of localPackages.entries()) {
    const pkgJson = JSON.parse(await fs.readFile(pkgPath, "utf-8"));
    const updated = updateDependencies(pkgJson, localPackages);

    if (updated) {
      await fs.writeFile(pkgPath, JSON.stringify(pkgJson, null, 2) + "\n");
      console.log(`✅ Updated ${name}`);
    }
  }

  console.log('🎉 All local package dependencies updated to "workspace:*"');
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
