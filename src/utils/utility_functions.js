const displayFullYearDynamically = () => {
    const full_year = new Date().getFullYear()
    return full_year
}

const currencyFormatter = (amount, language= 'en-US', currency = 'USD') => {
    return new Intl.NumberFormat(language,{ style: 'currency', currency: currency }).format(amount)
}

const recordTransaction = (cartItems, amount_in_cents, user_name, transaction_verification_url) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/e_eat/record_transaction.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.status === "success") {
                    //console.log("Transaction recorded successfully:", response.message);
                } else {
                    console.error("Error recording transaction:", response.message);
                }
            } else {
                console.error("AJAX request failed with status", xhr.status);
            }
        }
    };

    const cartItemsJSON = encodeURIComponent(JSON.stringify(cartItems));
    const data = `amount_in_cents=${amount_in_cents}&user_name=${user_name}&transaction_verification_url=${encodeURIComponent(transaction_verification_url)}&cart_items=${cartItemsJSON}`;
    xhr.send(data);
};
 
const fetchOrders = (user_name) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost/e_eat/fetch_orders.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response.status === "success") {
                            resolve(response);
                        } else {
                            reject(new Error(response.message));
                        }
                    } catch (e) {
                        reject(new Error("Failed to parse JSON response"));
                    }
                } else {
                    reject(new Error(`AJAX request failed with status ${xhr.status}`));
                }
            }
        };

        const data = `user_name=${user_name}`;
        xhr.send(data);
    });
};

function fetchPastTransactions(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/e_eat/fetch_all_past_orders.php', true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            //console.log("All orders", response)
            if (response.status === 'success') {
                callback(null, response.data);
            } else {
                callback(response.message, null);
            }
        } else {
            callback('Error fetching data', null);
        }
    };
    xhr.onerror = function () {
        callback('Network error', null);
    };
    xhr.send();
}




export {displayFullYearDynamically, currencyFormatter, recordTransaction, fetchOrders, fetchPastTransactions}