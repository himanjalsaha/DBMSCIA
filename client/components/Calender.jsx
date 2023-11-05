
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
 
export default function Calender() {
    const [value, onChange] = useState(new Date());
 
    return (
        <div>
            <h1>Calendar</h1>
            <Calendar
                onChange={onChange}
                value={value}
            />
        </div>
    );
}