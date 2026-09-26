// app.js：渲染结果
import { readShape } from "./shape.js";
import { fixLength } from "./fix.js";

export function render(spec) {
  const series = spec.series || [];
  const shape = readShape(spec);
  const view = fixLength(series, spec);
  const fixed = view.fixed || [];
  return { fixed: fixed, cut: view.cut || 0, padded: view.padded || 0,
           length: fixed.length, target: shape.length, source: series.length };
}
