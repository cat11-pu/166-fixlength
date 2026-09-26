// shape.js：读参数并校验
export function readShape(spec) {
  const source = spec || {};
  const length = source.length;
  const fill = source.fill;
  if (!Number.isInteger(length) || length < 0) {
    throw badShape("目标长度必须是非负整数，收到 " + String(length));
  }
  if (!Number.isInteger(fill)) {
    throw badShape("填充值必须是整数，收到 " + String(fill));
  }
  return { length: length, fill: fill };
}

function badShape(message) {
  const error = new Error(message);
  error.code = "E_BAD_SHAPE";
  return error;
}
