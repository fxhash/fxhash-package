// New properties

// list of hashes in the lineageof the iteration
console.log("lineage:", $fx.lineage)

// the depth in the lineage, ie the number of ancestors
console.log("depth:", $fx.depth)

// previously, you would be using $fx.rand() to get a random number [0; 1]
// console.log("previously, $fx.rand():", $fx.rand())

// now, you can use $fx.rand( depth ) to get a random number using the seed at
// the given depth
console.log("$fx.randAt(0)", $fx.randAt(0))

// General ideas to work with open-form
// - Apply randomness in sequence for each depth, so that you keep existing
//   properties of ancestors
// - You may want to first define the features of your piece, and mutate these
//   features for each depth
// - You also have the option to apply the same algorithm in sequence for each
//   depth if that fits your project.
// - More generally, there are no hard rules :)
//   You have access to a list of hashes/randomizers for each depth, you are
//   free to leverage these in any way that makes sense for your art. have fun!

// This is an example where the features are defined first, and the depth
// is used to mutate these features. In this case the features are defined as
// an array of numbers, but it can be anything :)
const options = {
  color: ["red", "green", "blue"],
  size: ["small", "medium", "big"],
}
// we use depth 0 to define the first features
const features = {
  color: options.color[Math.floor($fx.randAt(0) * options.color.length)],
  size: options.size[Math.floor($fx.randAt(0) * options.size.length)],
  complexity: 0,
}
// we iterate through each depth to mutate some features
for (let i = 0; i <= $fx.depth; i++) {
  // randomly mutate color or size
  if ($fx.randAt(i) < 0.5) {
    features.color =
      options.color[Math.floor($fx.randAt(i) * options.color.length)]
  } else {
    features.size =
      options.size[Math.floor($fx.randAt(i) * options.size.length)]
  }
  // we can also mutate a number for instance
  features.complexity += $fx.randAt(i) * 0.1

  console.log(`Features at depth ${i}:`, { ...features })
}

// Below is an example where the depth is used to change the visual
// representation of the artwork. This is the exampel you see in the live view.
function render(container) {
  const colors = ["red", "green", "blue", "orange", "greenyellow", "darkviolet"]
  for (let i = 0; i <= $fx.depth; i++) {
    const val = $fx.randAt(i)
    console.log(i, val)
    const div = document.createElement("div")
    div.style.height = (1 / ($fx.depth + 1)) * 100 + "vh"
    div.style.width = val * 100 + "vw"
    div.style.backgroundColor =
      colors[Math.floor($fx.randAt(i) * colors.length)]
    container.appendChild(div)
  }
}
render(document.getElementById("app"))
