import React from 'react';
import moment from 'moment-timezone';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import TimezonePicker from './TimezonePicker';

class DateTimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.setDate = this.setDate.bind(this);
        this.setTime = this.setTime.bind(this);
        this.setTimezone = this.setTimezone.bind(this);
        const datetime = props.datetime || moment().startOf('hour');
        const timezone = props.timezone || moment.tz.guess();
        this.state = {
            datetime,
            timezone,
        }
    }

    componentWillReceiveProps(props) {
        const formatted = (props.datetime || moment().startOf('hour')).format('YYYY-MM-DD HH:mm:ss');
        const timezone = props.timezone || this.state.timezone;
        const datetime = moment.tz(formatted, timezone);
        this.setState({datetime, timezone});
    }

    setDate(year, month, date) {
        const datetime = moment(this.state.datetime);
        datetime.year(year).month(month).date(date);
        this.setState({datetime});
        this.props.onSelect(
            datetime,
            this.state.timezone
        );
    }

    setTime(hour, minute, second) {
        const datetime = moment(this.state.datetime);
        datetime.hour(hour).minute(minute).second(second);
        this.setState({datetime});
        this.props.onSelect(
            datetime,
            this.state.timezone
        );
    }

    setTimezone(timezone) {
        const formatted = moment(this.state.datetime).format('YYYY-MM-DD HH:mm:ss');
        const datetime = moment.tz(formatted, timezone);
        this.setState({datetime, timezone});
        this.props.onSelect(
            datetime,
            timezone
        );
    }

    render() {
        const { datetime, timezone } = this.state;

        return (
            <div className="DateTimePicker">
                <DatePicker
                    {...this.props}
                    date={datetime}
                    onSelect={this.setDate}
                    />
                <TimePicker
                    time={datetime}
                    onSelect={this.setTime}
                    />
                <TimezonePicker
                    timezone={timezone}
                    onSelect={this.setTimezone}
                    />
            </div>
        );
    }
}

export default DateTimePicker;
