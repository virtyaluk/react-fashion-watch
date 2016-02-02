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
import { render } from 'react-dom';
import ReactFashionWatch from './ReactFashionWatch.jsx';

class ReactApp extends React.Component {
    state = {
        time1: new Date(),
        time2: new Date()
    };

    onTick1(time) {
        this.setState({ time1: time });

        return time;
    }

    transformTime(time) {
        var nd = ReactApp.localTimeByUTCOffset(time); // Returns current time in London

        this.setState({ time2: nd });

        return nd;
    }

    static timeToStr(time) {
        var h = time.getHours(),
            m = time.getMinutes(),
            s = time.getSeconds();

        return `${h >= 10 ? h : '0' + h}:${m >= 10 ? m : '0' + m}:${s >= 10 ? s : '0' + s}`;
    }

    static localTimeByUTCOffset(dt, UTCOffset = 0) {
        let utc = dt.getTime() + dt.getTimezoneOffset() * 60000;

        return new Date(utc + 3600000 * UTCOffset);
    }

    render = () => (
        <div>
            <div className="group">
                <div className="watch-mock">
                    <ReactFashionWatch onTick={this.onTick1.bind(this)}/>
                </div>
                <div className="label">{`Local time: ${ReactApp.timeToStr(this.state.time1)}`}</div>
            </div>

            <div className="group">
                <div className="watch-mock">
                    <ReactFashionWatch rounded={true} onTick={this.transformTime.bind(this)}/>
                </div>
                <div className="label">{`London time: ${ReactApp.timeToStr(this.state.time2)}`}</div>
            </div>
        </div>
    );
}

render(<ReactApp />, document.getElementById('app'));