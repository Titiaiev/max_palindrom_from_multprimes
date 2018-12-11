/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
// ответ {arg1: 30109, arg2: 33211, maxPolindrom: 999949999}
importScripts('isPolindrom.js');

function findMaxPolindrom(data, startRow, endRow) {
  const { length } = data;
  const end = endRow || length;
  let rowIndex = startRow || 0; // row
  let columnIndex = startRow || 0; // column
  let maxPolindrom = 0;
  let arg1 = 0;
  let arg2 = 0;

  for (rowIndex; rowIndex < end; rowIndex += 1) {
    const n1 = data[rowIndex];

    for (columnIndex; columnIndex < length; columnIndex += 1) {
      const n2 = data[columnIndex];
      // что-то эта штука оказалась не безопасной, вызывает переполнение буфера
      // const res = Math.imul(n1, n2);
      const res = (n1 * n2);

      // eslint-disable-next-line no-undef
      if (res > maxPolindrom && isPolindrom(res)) {
        maxPolindrom = res;
        arg1 = n1;
        arg2 = n2;
      }
    }
    // смещение по диагонали, чтобы не повторять уножение с теми же множителями (a * b === b * a)
    columnIndex = rowIndex + 1;
  }
  return {
    arg1,
    arg2,
    maxPolindrom,
  };
}

onmessage = function (e) {
  const { data } = e;
  const result = findMaxPolindrom(data.nums, data.start, data.end);
  postMessage(result);
};
