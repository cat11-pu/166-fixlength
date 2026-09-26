// shape.js：读参数并校验
export function readShape(spec) {
  const source = spec || {};
  const length = source.length;
  const fill = source.fill;
  if (!Number.isInteger(length) || length < 0) {
    const error = new Error("E_BAD_SHAPE: length must be a non-negative integer");
    error.code = "E_BAD_SHAPE";
    throw error;
  }
  if (!Number.isInteger(fill)) {
    const error = new Error("E_BAD_SHAPE: fill must be an integer");
    error.code = "E_BAD_SHAPE";
    throw error;
  }
  return { length: length, fill: fill };
}
