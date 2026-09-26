// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let length = spec.length || 0;
  parts.log.textContent = "原序列 " + (spec.series || []).length + " 个，目标长度 " + length + "。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { length: length }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.fixed.forEach(function (value, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + (spot + 1) + " 个";
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip" + (spot >= (spec.series || []).length ? " bad" : " ok");
      mark.textContent = String(value);
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "裁掉 " + view.cut + " 个，补上 " + view.padded + " 个";
    parts.log.textContent = "目标长度 " + length;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "裁剪并填充";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const moreButton = document.createElement("button");
  moreButton.textContent = "目标长度加一";
  moreButton.addEventListener("click", function () {
    length = length + 1;
    draw();
  });
  parts.controls.appendChild(moreButton);

  const lessButton = document.createElement("button");
  lessButton.textContent = "目标长度减一";
  lessButton.addEventListener("click", function () {
    length = Math.max(0, length - 1);
    draw();
  });
  parts.controls.appendChild(lessButton);

  const label = document.createElement("label");
  label.textContent = "目标长度";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = String(length);
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (parsed >= 0) { length = parsed; draw(); }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看裁剪与填充数";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { length: length }));
    parts.out.textContent = "裁掉 " + view.cut + " 个，补上 " + view.padded + " 个";
  });
  parts.controls.appendChild(readButton);

  draw();
}
