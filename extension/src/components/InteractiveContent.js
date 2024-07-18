import React from 'react';
import { interactiveContent } from './data';
import './Content.css';

const InteractiveContent = ({ index }) => {
    const content = interactiveContent[index];
    let introText = "";

    if (content.type === "fact") {
        introText = "Did You Know?";
    } else if (content.type === "highlight") {
        introText = "Fun Fact:";
    } else if (content.type === "quote") {
        introText = "Quote:";
    }

    return (
        <div>
            <div className="intro-text">{introText}</div>
            <div id="content">
                <p className="shake">{content.content}</p>
            </div>
        </div>
    );
};

export default InteractiveContent;
