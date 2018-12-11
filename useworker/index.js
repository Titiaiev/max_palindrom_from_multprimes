/* eslint-disable import/extensions */
/* eslint-disable func-names */
import isPrimeNumber from './isPrimeNumber.js';
import dislay from './display.js';

let currentNum = 1e4;
const maxNum = currentNum * 10;
const primeNumbers = [];

// собираем массив простых пятизначных чисел
for (currentNum; currentNum < maxNum; currentNum += 1) {
  if (isPrimeNumber(currentNum)) {
    primeNumbers.push(currentNum);
  }
}


function useWorker(data = [], threads) {
  // определить количество ядер на машине
  const cores = navigator.hardwareConcurrency;
  // console.log(cores);
  const chuncksCount = threads || cores || 1;
  const threadsArray = [];
  const { length } = data;
  const part = Math.ceil(data.length / chuncksCount);
  let startPoint = 0;
  let endPoint = part;

  for (let i = 0; i < chuncksCount; i += 1) {
    // eslint-disable-next-line no-loop-func
    const thread = new Promise((resolve, reject) => {
      // console.log(`chunck-${i}: start at: ${startPoint} row, end at: ${endPoint} row`);
      dislay(`chunck-${i}: start at: ${startPoint} row, end at: ${endPoint} row`);

      const worker = new Worker('useworker/worker.js');

      worker.postMessage({
        nums: data,
        start: startPoint,
        end: endPoint,
      });

      startPoint = endPoint + 1;
      endPoint = ((endPoint + part) < length) ? (endPoint + part) : length;

      worker.onmessage = function (e) { resolve(e.data); };
      worker.onerror = function (err) { reject(Error(err.filename, err.lineno, err.message)); };
    });

    threadsArray.push(thread);
  }

  return Promise.all(threadsArray);
}


document.getElementById('calcBtn').addEventListener('click', () => {
  const startTimer = performance.now();
  useWorker(primeNumbers)
    .then((d) => {
    // console.log(d);
    // выбрать чанк с максимальным полиндромом
      const answer = d.sort((a, b) => b.maxPolindrom - a.maxPolindrom)[0];
      const stopTimer = performance.now();
      // console.log(answer);
      dislay('###########################');
      dislay(`max palindrom is: ${answer.maxPolindrom}`);
      dislay(`argument-1: ${answer.arg1}`);
      dislay(`argument-2: ${answer.arg2}`);

      const time = `${((stopTimer - startTimer) / 1000).toFixed(2)}s`;

      // console.log(time);
      dislay(`time: ${time}`);
      dislay('###########################');
    })
    .catch((err) => { console.log(err); });
});
