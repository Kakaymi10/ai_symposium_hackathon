import React, { useState } from 'react';
import InteractiveContent from './InteractiveContent';
import Quiz from './Quizz';
import { interactiveContent, quizzes } from './data'; // Import the data
import './Content.css';

const Content = () => {
    const [showWelcome, setShowWelcome] = useState(true);
    const [currentContentIndex, setCurrentContentIndex] = useState(0);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizKey, setQuizKey] = useState(0);

    const handleStart = () => {
        setShowWelcome(false);
        const showQuiz = Math.random() < 0.5;
        setShowQuiz(showQuiz);
        setShowContent(!showQuiz);
    };

    const handleNext = () => {
        if (showContent) {
            if (currentContentIndex + 1 < interactiveContent.length) {
                setCurrentContentIndex(currentContentIndex + 1);
            } else {
                setShowContent(false);
                setShowQuiz(true);
                setCurrentQuizIndex(0); // Reset quiz index to start from the beginning
            }
        } else if (showQuiz) {
            if (currentQuizIndex + 1 < quizzes.length) {
                setCurrentQuizIndex(currentQuizIndex + 1);
                setQuizKey(quizKey + 1); // Force re-render to reset the quiz options
            } else {
                setShowQuiz(false);
                setShowContent(true);
                setCurrentContentIndex(0); // Reset content index to start from the beginning
            }
        }
    };

 

    return (
        <div id="container">
            {showWelcome && (
                <div id="welcome">
                    <p className="welcome-message">🎉 Your assistant is ready! Let's have fun learning! 🎉</p>
                    <button id="startButton" onClick={handleStart}>Start</button>
                </div>
            )}
            {showContent && (
                <div id="interactiveContent">
                    <InteractiveContent index={currentContentIndex} />
                    <button id="nextButton" onClick={handleNext}>Next</button>
                </div>
            )}
            {showQuiz && (
                <div id="quizSection">
                    <Quiz index={currentQuizIndex} key={quizKey} />
                    <button id="nextButton" onClick={handleNext}>Next</button>
                </div>
            )}
        </div>
    );
};

export default Content;
