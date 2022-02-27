const si = require('systeminformation');

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }


  si.mem()
  .then(data => {
    console.log(data)
    const element = document.getElementById('systeminfo')
    if (element) element.innerText = JSON.stringify(data, null, 2);
  })
  .catch(error => console.error(error));

})
