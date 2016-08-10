import React from 'react';
import moment from 'moment-timezone';

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
        this.setDate = this.setDate.bind(this);

        const date = props.date || moment().startOf('hour');
        const visibleMonth = date.clone().startOf('month');
        const startOfWeek = props.startOfWeek || 'Monday';
        this.state = {
            date,
            visibleMonth,
            startOfWeek,
        };
    }

    componentWillReceiveProps(props) {
        const date = props.date || moment().startOf('hour');
        const visibleMonth = date.clone().startOf('month');
        this.setState({date, visibleMonth});
    }

    prevMonth() {
        const visibleMonth = this.state.visibleMonth.clone().subtract(1, 'month');
        this.setState({visibleMonth});
    }

    nextMonth() {
        const visibleMonth = this.state.visibleMonth.clone().add(1, 'month');
        this.setState({visibleMonth});
    }

    setDate(date) {
        this.setState({date});
        this.props.onSelect(
            date.year(),
            date.month(),
            date.date()
        );
    }

    render() {
        const { visibleMonth, date, startOfWeek } = this.state;
        const ref = visibleMonth.clone().day(startOfWeek);

        const days = [...Array(42).keys()].map((i) => {
            const d = ref.clone().add(i, 'day');
            let className = '';
            className += date.isSame(d, 'day') ? ' isSelected' : '';
            className += visibleMonth.isSame(d, 'month') ? '' : ' isNotSameMonth';
            return {
                date: d,
                className,
            }
        });

        const daynames = days.slice(0, 7).map((day) => day.date.format('dd'));

        return (
            <div className="DatePicker">
                <div className="DatePickerHead">
                    <a className="DatePickerPrev" onClick={this.prevMonth}>
                        <i className="fa fa-chevron-left"></i>
                    </a>
                    <div className="DatePickerMonth">
                        {visibleMonth.format('MMM YYYY')}
                    </div>
                    <a className="DatePickerNext" onClick={this.nextMonth}>
                        <i className="fa fa-chevron-right"></i>
                    </a>
                </div>
                <div className="DatePickerBody">
                    {daynames.map((name) => (
                        <div className="DatePickerDayname" key={name}>
                            {name}
                        </div>
                    ))}
                    {days.map((day) => (
                        <div
                            className={'DatePickerDay' + day.className}
                            key={day.date.format('YYYY-MM-DD')}
                            onClick={() => this.setDate(day.date)}>
                            {day.date.format('DD')}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default DatePicker;
