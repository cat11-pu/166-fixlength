// fix.js：裁剪填充
import { readShape } from "./shape.js";

export function fixLength(series, spec) {
  const shape = readShape(spec);
  const source = Array.isArray(series) ? series : [];
  if (source.length > shape.length) {
    return { fixed: source.slice(0, shape.length), cut: source.length - shape.length, padded: 0 };
  }
  if (source.length < shape.length) {
    const padded = shape.length - source.length;
    return { fixed: source.concat(new Array(padded).fill(shape.fill)), cut: 0, padded: padded };
  }
  return { fixed: source.slice(), cut: 0, padded: 0 };
}
