import React from 'react';
import './Intro.css';

const Intro = ({ onStart }) => (
  <div id="intro">
    <p className="intro-text">🎉 Excitement! Your assistant is ready to make learning fun! 🎉</p>
    <button onClick={onStart}>Let's Start</button>
  </div>
);

export default Intro;
