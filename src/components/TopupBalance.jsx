import React, { useState } from 'react'

const TopupBalance = ({userName}) => { 
    const [topupAmount, setTopupAmount] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [message, setMessage] = useState('')
    const [newBalance, setNewBalance] = useState(null)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    const [paynowTransactionUrl, setPaynowTransactionUrl] = useState('') 

    const handleTopup = () => {
        if ( 
            topupAmount === '' ||
            isNaN(topupAmount) ||
            topupAmount <= 0 ||
            phoneNumber === ''
        ) {
            setMessage("Please provide a top-up amount and phone number.")
            setTimeout(() => {
                setMessage('')
            }, 2000)
            return;
        }
        setIsProcessingPayment(true)
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost/e_eat/topup_process.php", true)
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText)
                if (response.status === 'success') {
                    setIsProcessingPayment(false)
                    const pollurl = "https://www.paynow.co.zw/Transaction/TransactionView/" + response.pollurl.slice(48)
                    setNewBalance(response.new_balance)
                    setPaynowTransactionUrl(pollurl)
                    setMessage("Top-up successful!")

                    const new_user_details = JSON.parse(localStorage.getItem("userDetails"));
                    new_user_details['student_balance'] = response.new_balance
                    localStorage.setItem("userDetails", JSON.stringify(new_user_details))
                    setTimeout(() => {
                        window.location.reload(true)
                    }, 3000)
                } else {
                    setIsProcessingPayment(false)
                    setMessage(response.message)
                    setTimeout(() => {
                        setMessage('')
                    }, 2000)
                }
            } else if (xhr.readyState === 4) {
                setIsProcessingPayment(false)
                setMessage("An error occurred while processing your request.")
                setTimeout(() => {
                    setMessage('')
                }, 2000)
            }
        };

        const params = `user_name=${encodeURIComponent(userName)}&topup_amount=${encodeURIComponent(topupAmount)}&phone_number=${encodeURIComponent(phoneNumber)}`
        xhr.send(params);
    };

    const loading_styles = {
        backgroundImage: "url('images/loading.gif')",
        backgroundSize: "auto 70%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "10px center",
        paddingLeft: "50px"
    }
 
    return (
        <div className='topup_balance_container'>
            <h3>Top-Up Balance</h3> 
            <div>
                <label>Top-Up Amount:</label>
                <input 
                    type="number" 
                    value={topupAmount} 
                    onChange={(e) => setTopupAmount(e.target.value)} 
                    placeholder='Enter Topup Amount'
                    min={0}
                />
            </div>
            <div>
                <label>Phone Number:</label>
                <input 
                    type="text" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    placeholder='Enter Phone Number'
                />
            </div>
            <button onClick={handleTopup} className='top_up_button'>Top-Up</button>
            <div className={`loading ${isProcessingPayment ? "" : " displayed_none"}`} style={loading_styles} >Transaction is processing. Please wait</div>
            {message && <p>{message}</p>}
            {message === 'Top-up successful!' && <p>View your PayNow transaction&nbsp;<a href={paynowTransactionUrl} target="_blank" rel="noreferrer" >here</a></p>}
            {/* {newBalance !== null && <p>New Balance: {newBalance}</p>} */}
        </div>
    );
};

export default TopupBalance;
