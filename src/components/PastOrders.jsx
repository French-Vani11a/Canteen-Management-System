import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../utils/utility_functions';

const PastOrders = ({ user_name, isDisplayed, handleDisplay }) => {
    const [groupedOrders, setGroupedOrders] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await fetchOrders(user_name);
                setTotalSpent(response.total_amount_spent / 100);
                setLoading(false);

                const orders = response.items_purchased;
 
                const grouped = orders.reduce((acc, order) => {
                    const { order_number } = order;
                    if (!acc[order_number]) {
                        acc[order_number] = [];
                    }
                    acc[order_number].push(order);
                    return acc;
                }, {});
 
                const sortedOrderNumbers = Object.keys(grouped).sort((a, b) => b - a);
 
                const sortedGroupedOrders = sortedOrderNumbers.map(orderNumber => ({
                    orderNumber,
                    orders: grouped[orderNumber]
                }));

                setGroupedOrders(sortedGroupedOrders);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        if (user_name) {
            getOrders();
        } else {
            setLoading(false);
        }
    }, [user_name]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={`past_orders ${isDisplayed}`}>
            <button
                className="hidePastOrders"
                onClick={(e) => {
                    e.preventDefault();
                    handleDisplay("displayed_none");
                }}
            >
                +
            </button>
            <h2>Past Orders</h2>
            <p className="total_amount_spent">Total Amount Spent: ZIG${totalSpent}</p>
            <div className="grouped_order">
                {groupedOrders.length > 0 ? (
                    groupedOrders.map(({ orderNumber, orders }) => (
                        <div key={orderNumber} className="grouped_order__each_order">
                            <h3>Order Number: {orderNumber}</h3>
                            <ul className="grouped_order_ul">
                                {orders.map((order, index) => (
                                    <li key={index}>
                                        <p><strong>Item:&nbsp;</strong> {order.item_name}</p>
                                        <p><strong>Quantity:&nbsp;</strong> {order.quantity}</p>
                                        <p><strong>Amount Spent:&nbsp;</strong> ZIG${order.amount_spent / 100}</p>
                                        <p><strong>Date Purchased:&nbsp;</strong> {new Date(order.ordered_at).toLocaleString()}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No past orders found.</p>
                )}
            </div>
        </div>
    );
};

export default PastOrders;
