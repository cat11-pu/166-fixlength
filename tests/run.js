import assert from "node:assert";
import { readShape } from "../shape.js";
import { fixLength } from "../fix.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("readShape returns a length", () => {
  assert.strictEqual(typeof readShape({ length: 3, fill: 0 }).length, "number");
});

check("fixLength returns a list", () => {
  assert.ok(Array.isArray(fixLength([1], { length: 3, fill: 0 }).fixed));
});

check("fixLength returns cut", () => {
  assert.strictEqual(typeof fixLength([1], { length: 3, fill: 0 }).cut, "number");
});

check("render counts source", () => {
  assert.strictEqual(typeof render({ series: [1], length: 2, fill: 0 }).source, "number");
});

check("render exposes padded", () => {
  assert.strictEqual(typeof render({ series: [1], length: 2, fill: 0 }).padded, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
