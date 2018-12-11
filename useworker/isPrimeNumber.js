function eratosfen(n) {
  const arr = Array(n);
  let p = 2;

  arr.fill(true);
  arr[0] = false;
  arr[1] = false;

  while (p < n && p > 0) {
    for (let i = 2 * p; i < n; i += p) {
      arr[i] = false;
    }

    p = arr.indexOf(true, (p + 1));
  }

  return arr;
}

function isPrimeNumber(num, max) {
  if (typeof max === 'number' && !Number.isNaN(max)) {
    isPrimeNumber.cache = eratosfen(max);
  }
  return isPrimeNumber.cache[num];
}
isPrimeNumber.cache = eratosfen(1e5);

export default isPrimeNumber;
