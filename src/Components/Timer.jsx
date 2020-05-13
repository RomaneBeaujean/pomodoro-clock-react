import React from 'react';

const Timer = ({ step, turn, seconds, millis, handlePlayPause, reinitialize, finish }) => {

    return (
        <div id="timer" className="time-initial">
            <div id='step'>Step: {step}</div>
            <div id="turn">Turn: {turn}</div>
            {finish &&
                <div id="time">
                    <p id="finish">FINISH</p>
                </div>
            }
            {!finish &&
                <div id="time">
                    <div id="seconds">{seconds}</div> <div id="millis">{millis}</div>
                </div>}
            <audio id="beep" src="https://goo.gl/65cBl1" />
            <div id="buttons">
                <button className="btn-timer" id="Start" onClick={handlePlayPause}>Start/Pause</button>
                <button className="btn-timer" id="reinitialize" onClick={reinitialize}>Reinitialize</button>
            </div>
        </div>
    );
};

export default Timer;