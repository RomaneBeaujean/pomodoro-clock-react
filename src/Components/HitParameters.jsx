import React from 'react';

const HitParameters = ({session, breakTime, repeat, incrementSession, incrementBreak, incrementRepeat, decrementSession, decrementBreak, decrementRepeat}) => {
    
    return (
        <div id="parameters">
            <div id="session">
                <h2>Session</h2>
                <button className="btn btn-decrement" id="session-decrement" onClick={decrementSession}>↓</button>
                {session}'
                    <button className="btn btn-increment" id="session-increment" onClick={incrementSession}>↑</button>
            </div>

            <div id="break">
                <h2>Break</h2>
                <button className="btn btn-decrement" id="break-decrement" onClick={decrementBreak}>↓</button>
                {breakTime}'
                    <button className="btn btn-increment" id="break-increment" onClick={incrementBreak}>↑</button>
            </div>

            <div id="repeat">
                <h2>Repeat</h2>
                <button className="btn btn-decrement" id="repeat-decrement" onClick={decrementRepeat}>↓</button>
                    x {repeat}
                <button className="btn btn-increment" id="repeat-increment" onClick={incrementRepeat}>↑</button>
            </div>
        </div>
    );
};

export default HitParameters;