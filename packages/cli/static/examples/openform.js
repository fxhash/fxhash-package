console.log("$fx.depth:", $fx.depth)

function renderArtwork(container) {
  for (let i = 0; i <= $fx.depth; i++) {
    const val = $fx.randAt(i)
    console.log(i, val)
    const div = document.createElement("div")
    div.style.height = (1 / ($fx.depth + 1)) * 100 + "vh"
    div.style.width = val * 100 + "vw"
    div.style.backgroundColor = "green"
    container.appendChild(div)
  }
}

renderArtwork(document.getElementById("app"))
