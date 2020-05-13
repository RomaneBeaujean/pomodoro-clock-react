import React from 'react';
import HitParameters from './HitParameters';
import Timer from './Timer';

class HitTimer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            session: 5,
            breakTime: 5,
            repeat: 2,
            running: false,
            step: 'session',
            seconds: 5,
            millis: 10,
            turn: 1,
            finish: false,
        };
    };

    //Fonctions de paramétrages du hiit

    incrementSession = () => {
        if (!this.state.running) {
            const session = this.state.session + 1;
            this.initialize(session, 'session');
            this.setState({ session });
        };
    };

    decrementSession = () => {
        if (!this.state.running) {
            const session = this.state.session - 1;
            if (session > 0) {
                this.initialize(session, 'session');
                this.setState({ session });
            };
        };
    };

    incrementBreak = () => {
        if (!this.state.running) {
            const breakTime = this.state.breakTime + 1;
            this.setState({ breakTime });
        };
    };

    decrementBreak = () => {
        if (!this.state.running) {
            const breakTime = this.state.breakTime - 1;
            if (breakTime >= 0) {
                this.setState({ breakTime });
            };
        };
    };

    incrementRepeat = () => {
        if (!this.state.running) {
            const repeat = this.state.repeat + 1;
            this.setState({ repeat });
        }
    };

    decrementRepeat = () => {
        if (!this.state.running) {
            const repeat = this.state.repeat - 1;
            if (repeat > 0) {
                this.setState({ repeat });
            };
        };
    };

    // Fonctions du timer

    initialize = (seconds, step, turn) => {
        this.setState({
            running: false,
            seconds,
            step,
            millis: 10,
            turn,
        });
    };

    handlePlayPause = () => {
        const running = !this.state.running;
        if (running) {
            this.handleStart();
        } else {
            this.handleStop();
        };
    };

    handleStart = () => {
        if (this.state.step === "session") {
            this.styleSession();
        } else {
            this.styleBreak();
        }
        this.interval = setInterval(() => {
            this.tick();
        }, 100);
        this.setState({ running: true });
    };

    handleStop = () => {
        this.stylePause();
        clearInterval(this.interval);
        this.setState({ running: false });
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
        if (seconds === 3 && millis === 10){
            this.playBeep();
            this.styleLastSeconds();
        };
        if (seconds === 0) {
            this.handleStop();
            if (this.state.step === 'session') {
                this.nextStep();
                this.styleBreak();
            } else {
                this.nextTurn();
            };
        } else {
            this.setState({
                millis,
                seconds
            });
        };
    };

    playBeep = () => {
        document.getElementById('beep').play();
    };

    nextStep = () => {
        this.initialize(this.state.breakTime, 'break', this.state.turn);
        this.handleStart();
    };

    nextTurn = () => {
        const turn = this.state.turn + 1
        if (turn - 1 < this.state.repeat) {
            this.styleSession();
            this.initialize(this.state.session, "session", turn)
            this.handleStart();
            this.setState({
                turn
            });
        } else {
            this.finishHit();
        };
    };

    finishHit = () => {
        this.styleFinish();
        this.setState({finish: true})
    }

    reinitialize = () => {
        this.handleStop();
        this.styleInitial();
        this.initialize(this.state.session, "session", 1);
        this.setState({
            finish: false
        });
    };

    //Fonctions de style

    styleInitial = () => {
        document.getElementById("timer").className = "time-initial";
    }

    styleSession = () => {
        document.getElementById("timer").className = "time-session";
    };

    styleBreak = () => {
        document.getElementById("timer").className = "time-break";
    };

    stylePause = () => {
        document.getElementById("timer").className = "time-pause";
    };

    styleLastSeconds = () => {
        document.getElementById("timer").className = "time-last-seconds";
    };

    styleFinish = () => {
        document.getElementById("timer").className = "time-finish";
    }

    render() {
        return (
            <div id="container">
                <h1 id="title">HIIT TIMER</h1>
                <div id="hit-timer">
                    <HitParameters
                        session={this.state.session}
                        breakTime={this.state.breakTime}
                        repeat={this.state.repeat}
                        incrementSession={this.incrementSession}
                        incrementBreak={this.incrementBreak}
                        incrementRepeat={this.incrementRepeat}
                        decrementSession={this.decrementSession}
                        decrementBreak={this.decrementBreak}
                        decrementRepeat={this.decrementRepeat}
                    />
                    <Timer
                        step={this.state.step}
                        turn={this.state.turn}
                        seconds={this.state.seconds}
                        millis={this.state.millis}
                        handlePlayPause={this.handlePlayPause}
                        reinitialize={this.reinitialize}
                        finish={this.state.finish}
                    />
                </div>
            </div>

        );
    };
};

export default HitTimer;