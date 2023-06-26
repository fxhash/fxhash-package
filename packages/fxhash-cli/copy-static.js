var chokidar = require("chokidar")
var fs = require("fs")
var path = require("path")

var watcher = chokidar.watch("./src/static", {
  ignored: ".DS_Store",
})

function getOriginDestination(file) {
  const origin = path.join(__dirname, file)
  const splitFile = file.split("/")
  const destination = path.join(
    __dirname,
    "dist",
    ...splitFile.slice(1, splitFile.length)
  )
  return {
    origin,
    destination,
  }
}

function copyToDist(file) {
  console.log(`copy-static: copying ${file}`)
  const { origin, destination } = getOriginDestination(file)
  fs.cpSync(origin, destination, {
    recursive: true,
  })
}

function removeFromDist(file) {
  console.log(`copy-static: deleting ${file}`)
  const { destination } = getOriginDestination(file)
  fs.rmSync(destination, {
    recursive: true,
  })
}

console.log("copy-static: watching for changes in src/static")

watcher
  .on("add", copyToDist)
  .on("change", copyToDist)
  .on("unlink", removeFromDist)
