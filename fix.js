// fix.js：裁剪填充（基线：原样返回）
import { readShape } from "./shape.js";

export function fixLength(series, spec) {
  const shape = readShape(spec);
  const target = shape.length;
  const original = series.length;
  if (original > target) {
    return { fixed: series.slice(0, target), cut: original - target, padded: 0 };
  }
  if (original < target) {
    return { fixed: series.concat(new Array(target - original).fill(shape.fill)),
             cut: 0, padded: target - original };
  }
  return { fixed: series.slice(), cut: 0, padded: 0 };
}
