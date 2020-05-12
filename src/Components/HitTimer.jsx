import React from 'react';
import Timer from './Timer';

class HitTimer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            break: 10,
            session: 20,
            repeat: 2,
        };
    };

    incrementSession = () => {
        const session = this.state.session + 1;
        this.setState({session})
    };

    decrementSession = () => {
        const session = this.state.session - 1;
        if (session>0){
            this.setState({session});
        }
    };

    incrementBreak = () => {
        const breakTime = this.state.break + 1;
        this.setState({break: breakTime});
    };

    decrementBreak = () => {
        const breakTime = this.state.break - 1;
        if (breakTime >= 0) {
        this.setState({break: breakTime});            
        }
    };

    incrementRepeat = () => {
        const repeat = this.state.repeat + 1;
        this.setState({repeat});
    };

    decrementRepeat = () => {
        const repeat = this.state.repeat - 1;
        if (repeat > 0){
            this.setState({repeat});
        };
    };

    render(){
        return(<div>

        <h1 id="title">HIIT TIMER</h1>

        <div id='container'>

            <div id="parameters">
                <div id="session">
                    <h2>Session</h2>
                    <button className="btn btn-decrement" id="session-decrement" onClick={this.decrementSession}>↓</button>
                    {this.state.session}'
                    <button className="btn btn-increment" id="session-increment" onClick={this.incrementSession}>↑</button>
                </div>

                <div id="break">
                    <h2>Break</h2>
                    <button className="btn btn-decrement" id="break-decrement" onClick={this.decrementBreak}>↓</button>
                    {this.state.break}'
                    <button className="btn btn-increment" id="break-increment" onClick={this.incrementBreak}>↑</button>
                </div>

                <div id="repeat">
                    <h2>Repeat</h2>
                    <button className="btn btn-decrement" id="repeat-decrement" onClick={this.decrementRepeat}>↓</button>
                    x {this.state.repeat}
                    <button className="btn btn-increment" id="repeat-increment" onClick={this.incrementRepeat}>↑</button>
                </div>
            </div>

            <div id="chrono">
                <Timer
                    break={this.state.break}
                    session={this.state.session}
                    repeat={this.state.repeat}
                />
            </div>

        </div>
        </div>);
    };
};

export default HitTimer;