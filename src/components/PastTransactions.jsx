import React, { useEffect, useState } from 'react';
import { fetchPastTransactions } from '../utils/utility_functions'; 

const PastTransactions = () => {
    const [groupedTransactions, setGroupedTransactions] = useState([]);
    const [totalQuantities, setTotalQuantities] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchPastTransactions((err, data) => {
            if (err) {
                setError(err);
            } else {
                const grouped = {};
                Object.keys(data).forEach(userName => {
                    const userOrders = data[userName].orders;
                    Object.keys(userOrders).forEach(orderId => {
                        const items = userOrders[orderId].items_purchased;
                        items.forEach(item => {
                            const orderNumber = orderId;
                            if (!grouped[orderNumber]) {
                                grouped[orderNumber] = [];
                            }
                            grouped[orderNumber].push({
                                ...item,
                                userName,
                                ordered_at: userOrders[orderId].ordered_at,
                            });
                        });
                    });
                });

                const sortedOrderNumbers = Object.keys(grouped).sort((a, b) => b - a);

                const sortedGroupedTransactions = sortedOrderNumbers.map(orderNumber => ({
                    orderNumber,
                    orders: grouped[orderNumber],
                }));

                setGroupedTransactions(sortedGroupedTransactions);
            }
            setLoading(false);
        });
    }, []);

    const filterByDate = (transactions) => {
        return transactions.filter(({ orders }) => {
            return orders.some(order => {
                const orderDate = new Date(order.ordered_at);
                const start = startDate ? new Date(startDate) : null;
                const end = endDate ? new Date(endDate) : null;

                if (start && end) {
                    return orderDate >= start && orderDate <= end;
                } else if (start) {
                    return orderDate >= start;
                } else if (end) {
                    return orderDate <= end;
                }
                return true;
            });
        });
    };

    const filterBySearchQuery = (transactions) => {
        return transactions.filter(({ orders }) => {
            return orders.some(order => {
                return order.userName.toLowerCase().includes(searchQuery.toLowerCase());
            });
        });
    };

    const calculateTotalQuantities = (transactions) => {
        const quantities = {};
        transactions.forEach(({ orders }) => {
            orders.forEach(item => {
                if (!quantities[item.item_name]) {
                    quantities[item.item_name] = 0;
                }
                quantities[item.item_name] += parseInt(item.quantity);
            });
        });
        return quantities;
    };

    const filteredTransactions = filterByDate(groupedTransactions);
    const searchFilteredTransactions = filterBySearchQuery(filteredTransactions);
    const dynamicTotalQuantities = calculateTotalQuantities(searchFilteredTransactions);

    const clearFilters = () => {
        setStartDate('');
        setEndDate('');
        setSearchQuery('');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='past_transactions'>
            <h2>Orders</h2>
            <div className='date_range_inputs_container'>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Start Date"
                    className='date_input'
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="End Date"
                    className='date_input'
                />
            </div>
            <button
                onClick={clearFilters}
                className='clear_button'
            >
                Clear
            </button>
            <div className='total_quantities'>
                <h3>Total Quantities Per Item</h3>
                {Object.keys(dynamicTotalQuantities).length > 0 ? (
                    <ul>
                        {Object.keys(dynamicTotalQuantities).map(itemName => (
                            <li key={itemName}>
                                <p><strong>Item:&nbsp;</strong> {itemName}</p>
                                <p><strong>Total Quantity:&nbsp;</strong> {dynamicTotalQuantities[itemName]}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No quantities available.</p>
                )}
            </div>
            <input
                className='search_by_student_reg'
                type="text"
                placeholder="Type to search by Student Registration Number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <h3>Here are the orders:</h3>
            {searchFilteredTransactions.length > 0 ? (
                searchFilteredTransactions.map(({ orderNumber, orders }) => (
                    <div key={orderNumber} className='orders_per_order_number'>
                        <h3>Order Number: {orderNumber}</h3>
                        <ul className='main_ul'>
                            {orders.map((order, index) => (
                                <li key={index}>
                                    <p><strong>User:&nbsp;</strong> {order.userName}</p>
                                    <p><strong>Item:&nbsp;</strong> {order.item_name}</p>
                                    <p><strong>Quantity:&nbsp;</strong> {order.quantity}</p>
                                    <p><strong>Amount Spent:&nbsp;</strong> ZIG${order.amount_spent / 100}</p>
                                    <p><strong>Date Ordered:&nbsp;</strong> {new Date(order.ordered_at).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No orders found for the selected criteria.</p>
            )}
        </div>
    );
};

export default PastTransactions;
