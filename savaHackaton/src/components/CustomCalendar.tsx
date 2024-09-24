// import {useState} from 'react';

// interface Notification {
//     day: number;
//     month: number;
//     year: number;
//     message: string;
//   }

//   export function CustomCalendar() {
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [notifications, setNotifications] = useState<Notification[]>([
//       { day: 15, month: 5, year: 2024, message: 'Meeting at 3 PM' },
//       { day: 20, month: 5, year: 2024, message: 'Project deadline' },
//       { day: 30, month: 6, year: 2024, message: 'Project deadline' },
//       { day: 20, month: 7, year: 2024, message: 'Project deadline' }
//     ]);

//     const daysInMonth = (year: number, month: number) => {
//       return new Date(year, month + 1, 0).getDate();
//     };

//     const generateCalendar = (year: number, month: number) => {
//       const days = [];
//       const totalDays = daysInMonth(year, month);
//       const firstDay = new Date(year, month, 1).getDay();

//       for (let i = 0; i < firstDay; i++) {
//         days.push(<div key={`empty-${i}`} className="day empty"></div>);
//       }

//       for (let day = 1; day <= totalDays; day++) {
//         const hasNotification = notifications.some(notification =>
//           notification.day === day &&
//           notification.month === month &&
//           notification.year === year
//         );
//         days.push(
//           <div key={day} className={`day ${hasNotification ? 'notification' : ''}`}>
//             {day}
//             {hasNotification && <span className="red-dot">!</span>}
//           </div>
//         );
//       }

//       return days;
//     };

//     const handlePreviousMonth = () => {
//       setCurrentDate(prevDate => {
//         const year = prevDate.getFullYear();
//         const month = prevDate.getMonth() - 1;
//         return new Date(year, month, 1);
//       });
//     };

//     const handleNextMonth = () => {
//       setCurrentDate(prevDate => {
//         const year = prevDate.getFullYear();
//         const month = prevDate.getMonth() + 1;
//         return new Date(year, month, 1);
//       });
//     };

//     const monthNames = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ];

//     return (
//       <div className="calendar">
//         <div className="header">
//           <button className='calendarBtns' onClick={handlePreviousMonth}>&lt;</button>
//           <span className='monthName'>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
//           <button className='calendarBtns' onClick={handleNextMonth}>&gt;</button>
//         </div>
//         <div className="days smth">
//           {generateCalendar(currentDate.getFullYear(), currentDate.getMonth())}
//         </div>
//       </div>
//     );
//   };

import { useState } from "react";

interface Notification {
  day: number;
  month: number;
  year: number;
  message: string;
}

export function CustomCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    { day: 15, month: 5, year: 2024, message: "Meeting at 3 PM" },
    { day: 20, month: 5, year: 2024, message: "Project deadline" },
    { day: 10, month: 6, year: 2024, message: "Project deadline" },
    { day: 20, month: 7, year: 2024, message: "Project deadline" },
    { day: 30, month: 8, year: 2024, message: "Project deadline" },
    { day: 10, month: 9, year: 2024, message: "Project deadline" },
    { day: 20, month: 10, year: 2024, message: "Project deadline" },
    { day: 30, month: 11, year: 2024, message: "Project deadline" },
    { day: 10, month: 12, year: 2024, message: "Project deadline" },
    { day: 20, month: 1, year: 2025, message: "Project deadline" },
    { day: 30, month: 2, year: 2025, message: "Project deadline" },
    { day: 10, month: 3, year: 2025, message: "Project deadline" },
    { day: 20, month: 4, year: 2025, message: "Project deadline" },
    { day: 30, month: 5, year: 2025, message: "Project deadline" },
    { day: 10, month: 6, year: 2025, message: "Project deadline" },
    { day: 20, month: 7, year: 2025, message: "Project deadline" },
    { day: 30, month: 8, year: 2025, message: "Project deadline" },
  ]);

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = (year: number, month: number) => {
    const days = [];
    const totalDays = daysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const hasNotification = notifications.some(
        (notification) =>
          notification.day === day &&
          notification.month === month &&
          notification.year === year
      );
      days.push(
        <div
          key={day}
          className={`day ${hasNotification ? "notification" : ""}`}
          onMouseEnter={() => setHoveredDay(day)}
          onMouseLeave={() => setHoveredDay(null)}
        >
          {day}
          {hasNotification && <span className="red-dot">!</span>}
          {hasNotification && hoveredDay === day && (
            <div className="popup">
              <span className="popupMessage">
                {getNotificationMessage(day, month, year)}
              </span>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const getNotificationMessage = (day: number, month: number, year: number) => {
    const notification = notifications.find(
      (n) => n.day === day && n.month === month && n.year === year
    );
    return notification ? notification.message : "";
  };

  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const year = prevDate.getFullYear();
      const month = prevDate.getMonth() - 1;
      return new Date(year, month, 1);
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const year = prevDate.getFullYear();
      const month = prevDate.getMonth() + 1;
      return new Date(year, month, 1);
    });
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="calendar">
      <div className="header">
        <button className="calendarBtns" onClick={handlePreviousMonth}>
          &lt;
        </button>
        <span className="monthName">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button className="calendarBtns" onClick={handleNextMonth}>
          &gt;
        </button>
      </div>
      <div className="days">
        {generateCalendar(currentDate.getFullYear(), currentDate.getMonth())}
      </div>
    </div>
  );
}

export default CustomCalendar;

// export default Calendar;
