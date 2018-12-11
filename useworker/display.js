
const display = function dislay(data) {
  const info = document.getElementById('info');
  const li = document.createElement('li');
  li.innerText = data;
  info.appendChild(li);
};

export default display;
