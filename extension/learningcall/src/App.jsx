import React, { useState } from "react";

const App = () => {
  const [quizzes, setQuizzes] = useState([]);

  const getGPTQuizzes = async (content) => {
    const response = await fetch(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({
          prompt: `Generate quizzes from the following content: ${content}`,
          max_tokens: 150,
        }),
      }
    );
    const data = await response.json();
    setQuizzes(data.choices[0].text.split("\n").filter((q) => q.trim() !== ""));
  };

  const getPageContent = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { message: "get_page_content" },
        (response) => {
          getGPTQuizzes(response);
        }
      );
    });
  };

  return (
    <div>
      <h1>Voice Chat Bot Quiz Generator</h1>
      <button onClick={getPageContent}>Generate Quizzes</button>
      <ul>
        {quizzes.map((quiz, index) => (
          <li key={index}>{quiz}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
