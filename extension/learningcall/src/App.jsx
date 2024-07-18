import React, { useState } from "react";

const App = () => {
  const [content, setContent] = useState("");
  const [response, setResponse] = useState("");

  const getContent = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
          chrome.runtime.sendMessage({ content: document.body.innerText });
        },
      });
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.content) {
        setContent(request.content);
        fetch("http://localhost:5000/process_text", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: request.content }),
        })
          .then((response) => response.json())
          .then((data) => {
            setResponse(data.response);
            const audio = new Audio(data.audio_url);
            audio.play();
          })
          .catch((error) => console.error("Error:", error));
      }
    });
  };

  return (
    <div>
      <h1>Content of Current Tab</h1>
      <button onClick={getContent}>Get Content</button>
      <div style={{ whiteSpace: "pre-wrap", marginTop: "20px" }}>{content}</div>
      <div style={{ whiteSpace: "pre-wrap", marginTop: "20px" }}>
        {response}
      </div>
    </div>
  );
};

export default App;
