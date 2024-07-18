import React, { useState } from 'react';
import { quizzes } from './data'; // Import the data
import './Content.css';

const Quiz = ({ index }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const quiz = quizzes[index];

    const checkAnswer = (option) => {
        setSelectedOption(option);
    };

    return (
        <div>
            <div className="intro-text" id="quizIntroText">Time for a Quiz!</div>
            <div id="quiz">
                <div className="quiz-question">
                    <p>{quiz.question}</p>
                    {quiz.options.map((option, idx) => (
                        <div
                            key={idx}
                            className={`quiz-option ${selectedOption === option ? (option === quiz.answer ? 'correct' : 'incorrect') : ''}`}
                            data-answer={option}
                            onClick={() => checkAnswer(option)}
                        >
                            {option}
                        </div>
                    ))}
                    {selectedOption && (
                        <div className="feedback">
                            {selectedOption === quiz.answer ? "Correct!" : `Incorrect! ${quiz.explanation}`}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
