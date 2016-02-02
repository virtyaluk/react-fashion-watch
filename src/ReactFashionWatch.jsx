/**
 * ReactFashionWatch - a carefully crafted Fashion Watch component for React.
 * https://github.com/virtyaluk/react-fashion-watch
 *
 * Copyright (c) 2016 Bohdan Shtepan
 * http://modern-dev.com/
 *
 * Licensed under the MIT license.
 */

import React from 'react';
import styleNormalizer from 'react-style-normalizer';
import './styles';

export default class ReactFashionWatch extends React.Component {
    static degsPerSec = 360 / 60;
    static degsPerMin = 360 / 60;
    static degsPerHour = 360 / 12;

    state = {
        currentDate: new Date(),
        angles: {
            secondsHand: 0,
            minutesHand: 0,
            hoursHand: 0
        }
    };

    static propTypes = {
        rounded: React.PropTypes.bool,
        onTick: React.PropTypes.func,
        updateInterval: React.PropTypes.number
    };

    static defaultProps = {
        rounded: false,
        onTick: curTime => curTime,
        updateInterval: 1000
    };

    componentDidMount() {
        this.interval = setInterval(this.tick.bind(this), this.props.updateInterval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick(time) {
        let currentDate = this.props.onTick(time || new Date()),
            inst = ReactFashionWatch,
            angles = this.state.angles,
            curSecs = currentDate.getSeconds() || 60,
            curMins = currentDate.getMinutes() || 60,
            curHours = currentDate.getHours() % 12,
            secondsHand = inst.normalizeAngle(curSecs * inst.degsPerSec, angles.secondsHand),
            minutesHand = inst.normalizeAngle(curMins * inst.degsPerMin, angles.minutesHand),
            hoursHand = inst.normalizeAngle(curHours * inst.degsPerHour + curMins / 60 * inst.degsPerHour,
                angles.hoursHand);

        this.setState({ angles: { secondsHand, minutesHand, hoursHand }, currentDate });
    }

    static normalizeAngle(newAngle, oldAngle) {
        let rot = oldAngle || 0,
            ar = rot % 360;

        if (ar < 0) { ar += 360; }
        if (ar < 180 && newAngle > ar + 180) { rot -= 360; }
        if (ar >= 180 && newAngle <= ar - 180) { rot += 360; }

        rot += newAngle - ar;

        return rot;
    }

    render() {
        return (
            <div className={`fashion-watch${this.props.rounded ? '--rounded' : ''}`}>
                <div className="fashion-watch__clock-face">
                    {[...Array(6)].map((k, i) => <div className="fashion-watch__indicator--long" key={i + 1}></div>)}
                    {[...Array(24)].map((k, i) => <div className="fashion-watch__indicator" key={i + 1}></div>)}
                </div>

                <div className="fashion-watch__hands">
                    <div className="fashion-watch__hand--seconds"
                         style={styleNormalizer({ transform: `rotate(${this.state.angles.secondsHand}deg)` })}></div>

                    <div className="fashion-watch__hand--minutes"
                         style={styleNormalizer({ transform: `rotate(${this.state.angles.minutesHand}deg)` })}>
                        <div className="fashion-watch__gear"></div>
                        <div className={`fashion-watch__gear${this.props.rounded ? '--bridge' : ''}`}></div>
                        <div className="fashion-watch__gear--dot"></div>
                    </div>

                    <div className="fashion-watch__hand--hours"
                         style={styleNormalizer({ transform: `rotate(${this.state.angles.hoursHand}deg)` })}>
                        <div className="fashion-watch__gear"></div>
                        <div className={`fashion-watch__gear${this.props.rounded ? '--bridge' : ''}`}></div>
                        <div className="fashion-watch__gear--dot"></div>
                    </div>

                    <div className="fashion-watch__hand--date">
                        <span>{this.state.currentDate.getDay()}</span>
                    </div>
                </div>
            </div>
        );
    }
}