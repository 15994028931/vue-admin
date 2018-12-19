export function formateDate(value) {
  if (!value) return;
  let index = value.indexOf("T");
  let val = value
    .split("")
    .splice(0, index)
    .join("");
  return val;
}

export function updateText(value) {
  if (!value) return;
  return value.toString().trim() === "original" ? "原创" : "借鉴";
}
