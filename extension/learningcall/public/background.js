chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getPageContent,
  });
});

function getPageContent() {
  chrome.runtime.sendMessage({ content: document.body.innerText });
}
