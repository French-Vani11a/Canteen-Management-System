import React, { useState, useEffect } from 'react';
import { currencyFormatter } from '../utils/utility_functions';

const TopupStudentBalanceInAdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [topupAmount, setTopupAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
 
    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost/e_eat/fetch_students.php', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                setStudents(response);
                console.log(response)
            } else {
                console.error('Failed to fetch students:', xhr.statusText);
            }
        };
        xhr.send();
    };

    const searchStudentByRegistrationNumber = () => {
        const student = students.find(student => student.student_registration_number === searchTerm);
        if (student) {
            setSelectedStudent(student);
        } else {
            setErrorMessage('Student not found!');
            setSelectedStudent(null); 
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        }
    };

    const handleTopup = (e) => {
        e.preventDefault()
        if (topupAmount === 0) {
            setErrorMessage('Enter valid amount');
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
            return;
        }
        if (topupAmount > parseInt(selectedStudent.student_overall_balance)/ 100) {
            setErrorMessage('Insufficient balance');
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
            return;
        }
        if (!selectedStudent || !topupAmount) {
            setErrorMessage('Please ensure a student is selected and a top-up amount is entered.');
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost/e_eat/topup_balance.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    setSuccessMessage('Balance successfully topped up!');
                    setSelectedStudent(null);
                    setTopupAmount('');
                    setSearchTerm('');
                    setTimeout(() => {
                        setSuccessMessage('')
                        // fetchStudents();
                    }, 3000)
                } else {
                    setErrorMessage('Top up failed!');
                    setTimeout(() => {
                        setErrorMessage('')
                    }, 3000)
                }
            } else {
                console.error('Failed to top up balance:', xhr.statusText);
            }
        };

        const params = `registration_number=${encodeURIComponent(selectedStudent.student_registration_number)}&topup_amount=${encodeURIComponent(topupAmount)}`;
        xhr.send(params);
    };

    
    const error_styles = {
        backgroundImage: "url('images/denied_red.svg')",
        backgroundSize: "auto 70%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "10px center",
    };

    const success_styles = {
      backgroundImage: "url('images/green_tick.svg')",
      backgroundSize: "auto 70%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "10px center"
    };
  

    return (
        <div className="topupDashboard">
            <div className="input_and_button_container">
                <input 
                    type="text" 
                    id="searchField" 
                    value={searchTerm}
                    onChange={ (e) => {
                        setSearchTerm(e.target.value)
                    }
                    }
                    placeholder="Enter Registration Number" 
                />
                <button onClick={searchStudentByRegistrationNumber} className='search_for_sudent'>Search</button>
            </div>
             
            {selectedStudent && (
                <div id="studentDetails">
                    <p>Name:&nbsp;<span id="studentName">{selectedStudent.first_name} {selectedStudent.last_name}</span></p>
                    <p>Registration Number:&nbsp;<span id="studentRegNumber">{selectedStudent.student_registration_number}</span></p>
                    <p>Current Canteen Balance:&nbsp;<span id="studentBalance">ZIG{currencyFormatter(parseInt(selectedStudent.student_balance) / 100)}</span></p>
                    <p>Overall Student Balance from Student Database:&nbsp;<span id="overallBalance">ZIG{currencyFormatter(parseInt(selectedStudent.student_overall_balance) / 100)}</span></p>
                </div> 
            )}

            {selectedStudent && (
                <div className='input_and_button_container'>
                    <input 
                        type="number" 
                        id="topupAmount" 
                        value={topupAmount}
                        onChange={(e) => setTopupAmount(e.target.value)}
                        placeholder="Enter Top-Up Amount" 
                        min={0}
                    />
                    <button onClick={(e) => handleTopup(e)}>Top Up Canteen Balance</button> 
                    <span className={`success ${successMessage.length === 0 ? ' displayed_none' : ''}`} style={success_styles}>{successMessage}</span>
                    <span className={`error ${errorMessage.length === 0 ? ' displayed_none' : ''}`} style={error_styles}>{errorMessage}</span>
                </div>
            )}
        </div>
    );
};

export default TopupStudentBalanceInAdminDashboard;
