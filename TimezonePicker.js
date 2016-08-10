import React from 'react';
import moment from 'moment-timezone';

class TimezonePicker extends React.Component {
    constructor(props) {
        super(props);
        this.setTimezone = this.setTimezone.bind(this);

        const timezone = props.timezone || moment.tz.guess();
        this.state = {
            timezone,
        };
    }

    componentWillReceiveProps(props) {
        const timezone = props.timezone || moment.tz.guess();
        this.setState({timezone});
    }

    setTimezone(timezone) {
        this.setState({timezone});
        this.props.onSelect(timezone);
    }

    render() {
        return (
            <div className="TimezonePicker">
                <select
                    value={this.state.timezone}
                    onChange={(e) => this.setTimezone(e.target.value)}>
                    {moment.tz.names().map((tz) => (
                        <option value={tz} key={tz}>{tz}</option>
                    ))}
                </select>
            </div>
        );
    }
}

export default TimezonePicker;
