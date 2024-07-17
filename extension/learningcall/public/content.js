chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "get_page_content") {
    const content = document.body.innerText;
    sendResponse(content);
  }
});
