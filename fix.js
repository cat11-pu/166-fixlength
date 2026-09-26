// fix.js：裁剪填充（基线：原样返回）
import { readShape } from "./shape.js";

export function fixLength(series, spec) {
  return { fixed: series.slice(), cut: 0, padded: 0 };
}
