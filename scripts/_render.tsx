import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync } from "node:fs";
import { Art } from "../src/components/Art";
import { IMAGES } from "../src/data/images";
const out = process.argv[2];
for (const [name, s] of Object.entries(IMAGES)) {
  const w = name === "hero" ? 1600 : 1200, h = name === "hero" ? 900 : 900;
  const svg = renderToStaticMarkup(<Art kind={s.art as never} seed={name} className="x" />)
    .replace("<svg ", `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" `).replace(/ class="x"/, "");
  writeFileSync(`${out}/${name}.svg`, svg);
}
console.log("ok");
