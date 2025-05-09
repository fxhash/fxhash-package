import { ColorTransform, RGB } from "@/_types";

export interface ColorHandler {
  (arg?: number): string;
  (arg: ColorTransform): ColorHandler;
  rgb: RGB;
}

export function color(rgb: RGB): ColorHandler {
  const colorHandler = function (arg: number | ColorTransform): string | ColorHandler {
    if (typeof arg === 'number') {
      return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${arg})`;
    }

    if (typeof arg === 'function') {
      const transformedRGB = arg(rgb);
      return color(transformedRGB);
    }

    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  };

  colorHandler.rgb = rgb;

  return colorHandler as ColorHandler
}

/**
 * Dims a color to white or black
 * @param color An array of 3 numbers representing RGB values (0-255)
 * @param dimFactor A value between 0 and 1 where 0 is completely black and 1 is the original color
 * @returns A new array with the dimmed RGB values
 */
export function dim(factor: number = 0.6, white: boolean = true): ColorTransform {
  const base = white ? 255 : 0
  return function (rgb: RGB): RGB {
    return [
      Math.round(rgb[0] + (base - rgb[0]) * (1 - factor)),
      Math.round(rgb[1] + (base - rgb[1]) * (1 - factor)),
      Math.round(rgb[2] + (base - rgb[2]) * (1 - factor))
    ];
  };
}
