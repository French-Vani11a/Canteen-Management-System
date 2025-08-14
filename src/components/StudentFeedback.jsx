import React, { useState } from 'react';

const StudentFeedback = () => {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost/e_eat/submit_feedback.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert('Feedback submitted successfully!');
                setFeedback(''); 
            } else if (xhr.readyState === 4) {
                alert('Error submitting feedback!');
            }
        };

        xhr.send(`feedback=${encodeURIComponent(feedback)}`);
    };

    return (
        <div className='student_feedback'>
            <h2>Submit Feedback</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter your feedback here..."
                    required
                />
                <button type="submit" className='Feedback_submit_button'>Submit</button>
            </form>
        </div>
    );
};

export default StudentFeedback;
