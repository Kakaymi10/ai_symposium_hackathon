const container = document.createElement('div');
container.id = 'interactive-extension-container';
document.body.appendChild(container);

const root = document.createElement('div');
root.id = 'root';
container.appendChild(root);

const script = document.createElement('script');
script.src = chrome.runtime.getURL('index.js');
container.appendChild(script);
