
const colorInputs = document.querySelectorAll('.palette input[type="color"]');
const hexOutputs = document.querySelectorAll('.output p');

colorInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        hexOutputs[index].textContent = input.value;
    });
});
function generatePalette() {
  const baseColor = document.getElementById("baseColor").value;
  const type = document.getElementById("paletteType").value;
  const paletteDiv = document.getElementById("palette");

  paletteDiv.innerHTML = "";

  let colors = [];

  if (type === "monochrome") {
    colors = chroma.scale([baseColor, "#000", "#fff"]).colors(5);
  }

  if (type === "complement") {
    colors = [
      baseColor,
      chroma(baseColor).set("hsl.h", "+180").hex()
    ];
  }

  if (type === "analogous") {
    colors = chroma.scale([
      chroma(baseColor).set("hsl.h", "-30"),
      baseColor,
      chroma(baseColor).set("hsl.h", "+30")
    ]).colors(5);
  }

  if (type === "triad") {
    colors = [
      baseColor,
      chroma(baseColor).set("hsl.h", "+120").hex(),
      chroma(baseColor).set("hsl.h", "+240").hex()
    ];
  }

  colors.forEach(color => {
    const div = document.createElement("div");
    div.className = "color-box";
    div.style.background = color;
    div.innerText = color;

    div.onclick = () => {
      navigator.clipboard.writeText(color);
      alert("کپی شد: " + color);
    };

    paletteDiv.appendChild(div);
  });
}
