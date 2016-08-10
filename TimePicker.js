import React from 'react';
import moment from 'moment-timezone';

const TimePickerUnit = (props) => (
    <div className="TimePickerUnit">
        <a className="TimePickerUnitNext" onClick={props.onNextClick}>
            <i className="fa fa-chevron-up"></i>
        </a>
        <div className="TimePickerUnitValue">
            {props.children}
        </div>
        <a className="TimePickerUnitPrev" onClick={props.onPrevClick}>
            <i className="fa fa-chevron-down"></i>
        </a>
    </div>
);

class TimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.toggleAmPm = this.toggleAmPm.bind(this);
        this.incrementTime = this.incrementTime.bind(this);
        this.decrementTime = this.decrementTime.bind(this);

        const time = props.time || moment().startOf('hour');
        this.state = {
            time,
        };
    }

    componentWillReceiveProps(props) {
        const time = props.time || moment().startOf('hour');
        this.setState({time});
    }

    setTime(time) {
        this.setState({time});
        this.props.onSelect(
            time.hour(),
            time.minute(),
            time.second()
        );
    }

    toggleAmPm() {
        const time = this.state.time.clone();
        const hours = time.format('A') === 'AM' ? 12 : -12;
        time.add(hours, 'hour');
        this.setTime(time);
    }

    incrementTime(unit) {
        const time = this.state.time.clone();
        const delta = unit === 'hour' ? 1 : 5;
        const ampm = time.format('A');
        if (unit === 'hour' && ampm === 'AM' && time.hour() === (12 - delta)) {
            time.hour(0);
        } else if (unit === 'hour' && ampm === 'PM' && time.hour() === (24 - delta)) {
            time.hour(12);
        } else if (unit === 'minute' && time.minute() === (60 - delta)) {
            time.minute(0);
        } else if (unit === 'second' && time.second() === (60 - delta)) {
            time.second(0);
        } else {
            time.add(delta, unit);
        }
        this.setTime(time);
    }

    decrementTime(unit) {
        const time = this.state.time.clone();
        const delta = unit === 'hour' ? 1 : 5;
        const ampm = time.format('A');
        if (unit === 'hour' && ampm === 'AM' && time.hour() === 0) {
            time.hour(12 - delta);
        } else if (unit === 'hour' && ampm === 'PM' && time.hour() === 12) {
            time.hour(24 - delta);
        } else if (unit === 'minute' && time.minute() === 0) {
            time.minute(60 - delta);
        } else if (unit === 'second' && time.second() === 0) {
            time.second(60 - delta);
        } else {
            time.subtract(delta, unit);
        }
        this.setTime(time);
    }

    render() {
        const { time } = this.state;

        return (
            <div className="TimePicker">
                <TimePickerUnit
                    onPrevClick={() => this.decrementTime('hour')}
                    onNextClick={() => this.incrementTime('hour')}>
                    {time.format('hh')}
                </TimePickerUnit>
                <TimePickerUnit
                    onPrevClick={() => this.decrementTime('minute')}
                    onNextClick={() => this.incrementTime('minute')}>
                    {time.format('mm')}
                </TimePickerUnit>
                <TimePickerUnit
                    onPrevClick={() => this.decrementTime('second')}
                    onNextClick={() => this.incrementTime('second')}>
                    {time.format('ss')}
                </TimePickerUnit>
                <TimePickerUnit
                    onPrevClick={() => this.toggleAmPm()}
                    onNextClick={() => this.toggleAmPm()}>
                    {time.format('A')}
                </TimePickerUnit>
            </div>
        );
    }
}

export default TimePicker;
