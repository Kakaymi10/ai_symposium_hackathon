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
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-500">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-3xl w-full">
        <h1 className="text-xl text-center font-bold text-purple-600 mb-4">
          Welcome to Chatbot!
        </h1>
        <div className="space-y-4">
          <div className="flex items-center justify-start">
            <div className="bg-purple-300 text-white p-3 rounded-r-full rounded-tl-full">
              Check out the documentation!
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="bg-purple-300 text-white p-3 rounded-l-full rounded-tr-full">
              {content}
            </div>
          </div>
          <div className="flex items-center justify-start">
            <div className="bg-purple-300 text-white p-3 rounded-r-full rounded-tl-full">
              {response}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={getContent}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Get Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
