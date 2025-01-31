import DatePicker from 'react-datepicker';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { useField } from 'formik';

const today = new Date().toISOString().split('T')[0];

const MyDatePicker = ({ name = '', birthday }) => {
  const [field, meta, helpers] = useField('date');
  const [currentMonth, setCurrentMonth] = useState(moment());

  const { value } = meta;
  const { setValue } = helpers;

  const isWeekend = useCallback(date => {
    const day = moment(date).format('dddd');
    return day === 'Saturday' || day === 'Sunday';
  }, []);

  const dayClassNames = useCallback(
    date => {
      const classNames = [];

      const monthStart = moment(currentMonth).startOf('month');
      const monthEnd = moment(currentMonth).endOf('month');

      if (moment(date).isBefore(monthStart) || moment(date).isAfter(monthEnd)) {
        classNames.push('outside-month');
      }

      if (isWeekend(date)) {
        classNames.push('highlighted-weekend');
      }

      return classNames.join(' ');
    },
    [currentMonth, isWeekend]
  );
  const formatWeekDay = (weekdayShort, dayOfWeek) => weekdayShort.charAt(0);

  const handleMonthChange = useCallback(date => {
    setCurrentMonth(moment(date));
  }, []);

  const handleCloseDatePicker = useCallback(() => {
    setCurrentMonth(moment());
  }, []);

  return (
    <DatePicker
      {...field}
      selected={value || new Date(birthday || today)}
      onChange={date => setValue(date)}
      onMonthChange={handleMonthChange}
      onFocus={handleCloseDatePicker}
      dayClassName={dayClassNames}
      calendarStartDay={1}
      placeholderText={birthday || 'Choose a date'}
      formatWeekDay={formatWeekDay}
    />
  );
};

export default MyDatePicker;
