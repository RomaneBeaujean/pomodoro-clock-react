import React from 'react';

class Timer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            running: false,
            step: 'session',
            seconds: 0,
            millis: 10,
            turn: 1,
        };
    };

    componentDidMount(){
        this.initialize(this.props.session, "session");
    };

    initialize = (seconds, step) => {
        this.setState({
            seconds,
            millis: 10,
            step
        });
    };

    handlePlayPause = () => {
        const running = !this.state.running;
        if (running) {
            this.handleStart()
        } else {
            this.handleStop()
        };
    };

    handleStart = () => {
        if (!this.state.running) {
            this.interval = setInterval( () => {
                this.tick();
            }, 100);
        this.setState({running: true});
        }
    };

    handleStop = () => {
        if (this.state.running){
            clearInterval(this.interval);
            this.setState({running: false});
        };
    };

    tick = () => {
        let millis = this.state.millis - 1;
        let seconds = this.state.seconds;
        if (millis === 0) {
            millis = 10;
            seconds -= 1;
        };
        this.update(millis, seconds);
    };

    update = (millis, seconds) => {
        if (seconds === 0) {
            this.handleStop();
            if (this.state.step === 'session') {
                this.nextStep();
            } else {
                this.nextTurn();
            }
        } else {
            this.setState({
            millis, 
            seconds
            });
        };
    };

    nextStep = () => {
        this.initialize(this.props.break, 'break');
        this.handleStart();
    };

    nextTurn = () => {
        let turn = this.state.turn
        if (turn < this.props.repeat) {
            this.initialize(this.props.session, "session")
            this.handleStart();
            this.setState({
                turn: turn + 1
            });
        };
    };

    reinitialize = () => {
        this.handleStop();
        this.initialize(this.props.session, "session")
    };

    render(){
        return(
            <div id='timer'>
                <div id='step'>Step: {this.state.step}</div>
                <div id="turn">Turn: {this.state.turn}</div>
               
                <div id="time">
                    <p id="seconds">{this.state.seconds}</p> 
                    <p id="millis">{this.state.millis}</p>
                </div>
                <button className="btn-2" id="Start" onClick={this.handlePlayPause}>Start/Pause</button>
                <button className="btn-2" id="reinitialize" onClick={this.reinitialize}>Reinitialize</button>
            </div>
        );
    };
};

export default Timer;