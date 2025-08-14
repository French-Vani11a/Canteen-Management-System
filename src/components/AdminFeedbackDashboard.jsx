import React, { useState } from 'react';

const AdminFeedbackDashboard = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // const fetchFeedback = () => {
    //     // Make sure dates are in YYYY-MM-DD format
    //     const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
    //     const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

    //     const xhr = new XMLHttpRequest();
    //     xhr.open('POST', 'http://localhost/e_eat/fetch_feedback.php', true);
    //     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState === 4 && xhr.status === 200) {
    //             console.log(xhr.responseText);
    //             const response = JSON.parse(xhr.responseText);
    //             setFeedbackList(response);
    //         }
    //     };

    //     xhr.send(`startDate=${encodeURIComponent(formattedStartDate)}&endDate=${encodeURIComponent(formattedEndDate)}`);
    // };
    const fetchFeedback = () => {
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }
    
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost/e_eat/fetch_feedback.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
        xhr.onreadystatechange = function () {
            console.log(xhr.responseText)
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
                const response = JSON.parse(xhr.responseText);
                setFeedbackList(response);
            }
        };
    
        xhr.send(`startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`);
    };
    

    return (
        <div className='admin_feedback'>
            <h2>Admin Feedback Dashboard</h2>
            <div className='admin_feedback_inputs_container'>
                <input 
                    type="date" 
                    value={startDate} 
                    // name="startDate"
                    onChange={(e) => setStartDate(e.target.value)} 
                    placeholder='Start Date'
                />   
                <input 
                    type="date" 
                    value={endDate} 
                    // name="endDate"
                    onChange={(e) => setEndDate(e.target.value)} 
                    placeholder='End Date'
                /> 
            </div>
            <button onClick={fetchFeedback}>Filter Feedback</button>
            <ul>
                {feedbackList.map((feedback, index) => (
                    <li key={index}>{feedback.feedback} - {new Date(feedback.created_at).toLocaleString()}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminFeedbackDashboard;
