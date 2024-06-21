import React from 'react'
import dynamic from 'next/dynamic';
const Calendar = dynamic(() => import('react-calendar'), { ssr: false });
import 'react-calendar/dist/Calendar.css';
import "./Calendar.scss"

const CalendarComponent = ({ values, setFieldValue, handleDateChange }: { values: any; setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void; handleDateChange: (date: Date) => Date; }) => {
    return (
        <Calendar onChange={(value) => setFieldValue('date', handleDateChange(value as Date))} value={values.date} minDate={new Date()} />

    )
}

export default CalendarComponent