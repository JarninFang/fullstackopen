import React from 'react';
import './Notification.css';

const Notification = ({ message, status }) => {
    return (
        <div className="notification">
            <p className={status}>{message}</p>
        </div>
    )}

export default Notification;