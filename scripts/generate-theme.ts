import fs from "node:fs";
import path from "node:path";

const rootDir = path.resolve(__dirname, "..");
const cssPath = path.join(rootDir, "global.css");
const themePath = path.join(rootDir, "lib", "temp-theme.ts");

const css = fs.readFileSync(cssPath, "utf8");

function toCamelCase(value: string) {
  return value.replace(/-([a-z0-9])/g, (_, character) =>
    character.toUpperCase(),
  );
}

function readVariables(selector: string) {
  const block =
    css.match(new RegExp(`${selector}\\s*\\{([\\s\\S]*?)\\}`))?.[1] ?? "";
  const variables: Record<string, string> = {};

  for (const match of block.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    variables[toCamelCase(match[1])] = hslToHex(match[2].trim());
  }

  return variables;
}

function hslToHex(value: string) {
  const [h, s, l] = value.replace(/%/g, "").split(/\s+/).map(Number);

  const saturation = s / 100;
  const lightness = l / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const hue = h / 60;
  const x = chroma * (1 - Math.abs((hue % 2) - 1));

  let red = 0;
  let green = 0;
  let blue = 0;

  if (hue < 1) [red, green, blue] = [chroma, x, 0];
  else if (hue < 2) [red, green, blue] = [x, chroma, 0];
  else if (hue < 3) [red, green, blue] = [0, chroma, x];
  else if (hue < 4) [red, green, blue] = [0, x, chroma];
  else if (hue < 5) [red, green, blue] = [x, 0, chroma];
  else [red, green, blue] = [chroma, 0, x];

  const match = lightness - chroma / 2;
  const toHex = (channel: number) =>
    Math.round((channel + match) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

const light = readVariables(":root");
const dark = readVariables("\\.dark:root");

const output = `/**
 * This file is generated from global.css.
 * Do not edit manually.
 */

export const Colors = {
  light: ${JSON.stringify(light, null, 2)},
  dark: ${JSON.stringify(dark, null, 2)},
} as const;
`;

fs.writeFileSync(themePath, output);
console.log(`Generated ${path.relative(rootDir, themePath)}`);
