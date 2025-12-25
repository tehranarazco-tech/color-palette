

const baseColorInput = document.getElementById("baseColor");
const paletteTypeSelect = document.getElementById("paletteType");

baseColorInput.addEventListener("input", generatePalette);
paletteTypeSelect.addEventListener("change", generatePalette);

generatePalette();

function generatePalette() {
  const baseColor = baseColorInput.value;
  const type = paletteTypeSelect.value;
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
    div.style.color =
      chroma(color).luminance() > 0.5 ? "#000" : "#fff";

    div.innerHTML = `
      <span>${color}</span>
    `;

    div.onclick = () => {
      navigator.clipboard.writeText(color);
    };

    paletteDiv.appendChild(div);
  });
}
