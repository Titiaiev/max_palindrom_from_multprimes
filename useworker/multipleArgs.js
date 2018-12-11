function multipleArgs(data) {
  const { length } = data;
  let i = 0;
  let j = 0;
  const result = {
    mults: [],
    args: [],
  };


  for (i; i < length; i += 1) {
    const n1 = data[i];

    for (j; j < length; j += 1) {
      const n2 = data[j];
      const res = Math.imul(n1, n2);

      result.mults.push(res);
      result.args.push({ arg1: n1, arg2: n2 });
    }
    // смещение по диагонали, чтобы не повторять уножение с теми же множителями (a * b === b * a)
    j = i + 1;
  }

  return result;
}

export default multipleArgs;
