// import React, { useState, useEffect } from 'react'

// const ManageMenuItems = () => {
//     const [menuItems, setMenuItems] = useState([])
//     const [selectedItem, setSelectedItem] = useState(null)
//     const [itemName, setItemName] = useState('')
//     const [description, setDescription] = useState('')
//     const [priceInCents, setPriceInCents] = useState('')
//     const [availability, setAvailability] = useState(false)
//     const [responseMessage, setResponseMessage] = useState('')

//     useEffect(() => {
//         fetchMenuItems();
//     }, []);

//     const fetchMenuItems = () => {
//         fetch('http://localhost/e_eat/fetch_latest_menu.php')
//             .then(response => response.json())
//             .then(data => {
//                 if (data.status === 'success') {
//                     setMenuItems(Object.keys(data.data));
//                 } else {
//                     console.error('Failed to fetch menu items');
//                 }
//             })
//             .catch(error => console.error('Error fetching menu items:', error))
//     };

//     const handleSelectItem = (e) => {
//         const itemName = e.target.value
//         setSelectedItem(itemName)
 
//         const itemDetails = menuItems.find(item => item === itemName)
//         setItemName(itemName)
//         setDescription(itemDetails.description)
//         setPriceInCents(itemDetails.price_in_cents)
//         setAvailability(itemDetails.availability === 1)
//     };

//     const handleUpdate = (e) => {
//         e.preventDefault();
 
//         fetch('http://localhost/e_eat/update_menu_item.php', {
//             method: 'POST',
//             body: JSON.stringify({
//                 item_name: selectedItem,
//                 new_item_name: itemName,
//                 description,
//                 price_in_cents: priceInCents,
//                 availability: availability ? 1 : 0,
//             }),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })
//             .then(response => response.json())
//             .then(data => {
//                 setResponseMessage(data.message);
//                 fetchMenuItems();
//                 setTimeout(() => {
//                     setResponseMessage('')
//                 }, 3000)
//                 setTimeout(() => {
//                     window.location.reload(true)
//                 }, 3000)
//             })
//             .catch(error => {
//                 setResponseMessage('Error: ' + error.message)
//                 setTimeout(() => {
//                     setResponseMessage('')
//                 }, 3000)
//             })
//     };

//     const handleDelete = () => { 
//         fetch('http://localhost/e_eat/delete_menu_item.php', {
//             method: 'POST',
//             body: JSON.stringify({
//                 item_name: selectedItem,
//             }),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })
//             .then(response => response.json())
//             .then(data => {
//                 setResponseMessage(data.message)
//                 setSelectedItem(null)
//                 setItemName('')
//                 setDescription('')
//                 setPriceInCents('')
//                 setAvailability(false)
//                 fetchMenuItems()
//                 setTimeout(() => {
//                     setResponseMessage('')
//                 }, 3000)
//                 setTimeout(() => {
//                     window.location.reload(true)
//                 }, 3000)
//             })
//             .catch(error => {
//                 setResponseMessage('Error: ' + error.message)
//                 setTimeout(() => {
//                     setResponseMessage('')
//                 }, 3000)
//             })
//     };


//     const response_container_styles = {
//         backgroundImage: "url('images/green_tick.svg')",
//         backgroundSize: "auto 70%",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "10px center"
//     }

//     return (
//         <div className="manage_menu_items">
//             <h2>Manage Menu Items</h2>
//             <div>
//                 <label htmlFor="menuItemsDropdown">Select Menu Item:</label>
//                 <select id="menuItemsDropdown" value={selectedItem || ''} onChange={handleSelectItem}>
//                     <option value="" disabled>Select an item</option>
//                     {menuItems.map((item) => (
//                         <option key={item} value={item}>
//                             {item}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {selectedItem && (
//                 <form onSubmit={handleUpdate}>
//                     <div>
//                         <label htmlFor="itemName">Item Name:</label>
//                         <input
//                             type="text"
//                             id="itemName"
//                             value={itemName}
//                             onChange={(e) => setItemName(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="description">Description:</label>
//                         <input
//                             type="text"
//                             id="description"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="priceInCents">Price (in ZIG):</label>
//                         <input
//                             type="number"
//                             id="priceInCents"
//                             value={priceInCents}
//                             onChange={(e) => setPriceInCents(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="availability_container">
//                         <label htmlFor="availability">Availability:</label>
//                         <input
//                             type="checkbox"
//                             id="availability"
//                             checked={availability}
//                             onChange={(e) => setAvailability(e.target.checked)}
//                         />
//                     </div>
//                     <div className="update_delete_options_container">
//                         <button type="submit">Update Menu Item</button>
//                         <button type="button" onClick={handleDelete}>
//                             Delete Menu Item
//                         </button> 
//                     </div>
//                 </form>
//             )}
//             {responseMessage && <p className="response_container" style={response_container_styles}>{responseMessage}</p>}
//         </div>
//     );
// };

// export default ManageMenuItems;

import React, { useState, useEffect } from 'react'

const ManageMenuItems = () => {
    const [menuItems, setMenuItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [itemName, setItemName] = useState('')
    const [description, setDescription] = useState('')
    const [priceInCents, setPriceInCents] = useState('')
    const [cookTime, setCookTime] = useState('') // New state for cook time
    const [availability, setAvailability] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = () => {
        fetch('http://localhost/e_eat/fetch_entire_menu.php')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    setMenuItems(Object.keys(data.data));
                } else {
                    console.error('Failed to fetch menu items');
                }
            })
            .catch(error => console.error('Error fetching menu items:', error))
    };

    const handleSelectItem = (e) => {
        const itemName = e.target.value
        setSelectedItem(itemName)
 
        const itemDetails = menuItems.find(item => item === itemName)
        setItemName(itemName)
        setDescription(itemDetails.description)
        setPriceInCents(itemDetails.price_in_cents)
        setCookTime(itemDetails.cook_time)  
        setAvailability(itemDetails.availability === 1)
    };

    const handleUpdate = (e) => {
        e.preventDefault();
 
        fetch('http://localhost/e_eat/update_menu_item.php', {
            method: 'POST',
            body: JSON.stringify({
                item_name: selectedItem,
                new_item_name: itemName,
                description,
                price_in_cents: priceInCents,
                cook_time: cookTime,  
                availability: availability ? 1 : 0,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setResponseMessage(data.message);
                fetchMenuItems();
                setTimeout(() => {
                    setResponseMessage('')
                }, 3000)
                setTimeout(() => {
                    window.location.reload(true)
                }, 3000)
            })
            .catch(error => {
                setResponseMessage('Error: ' + error.message)
                setTimeout(() => {
                    setResponseMessage('')
                }, 3000)
            })
    };

    const handleDelete = () => { 
        fetch('http://localhost/e_eat/delete_menu_item.php', {
            method: 'POST',
            body: JSON.stringify({
                item_name: selectedItem,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setResponseMessage(data.message)
                setSelectedItem(null)
                setItemName('')
                setDescription('')
                setPriceInCents('')
                setCookTime('')  
                setAvailability(false)
                fetchMenuItems()
                setTimeout(() => {
                    setResponseMessage('')
                }, 3000)
                setTimeout(() => {
                    window.location.reload(true)
                }, 3000)
            })
            .catch(error => {
                setResponseMessage('Error: ' + error.message)
                setTimeout(() => {
                    setResponseMessage('')
                }, 3000)
            })
    };


    const response_container_styles = {
        backgroundImage: "url('images/green_tick.svg')",
        backgroundSize: "auto 70%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "10px center"
    }

    return (
        <div className="manage_menu_items">
            <div>
                <label htmlFor="menuItemsDropdown">Select Menu Item:</label>
                <select id="menuItemsDropdown" value={selectedItem || ''} onChange={handleSelectItem}>
                    <option value="" disabled>Select an item</option>
                    {menuItems.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            {selectedItem && (
                <form onSubmit={handleUpdate}>
                    <div>
                        <label htmlFor="itemName">Item Name:</label>
                        <input
                            type="text"
                            id="itemName"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            placeholder='Enter item name'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Enter description'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="priceInCents">Price (in ZIG):</label>
                        <input
                            type="number"
                            id="priceInCents"
                            value={priceInCents}
                            onChange={(e) => setPriceInCents(e.target.value)}
                            placeholder='Enter price'
                            min={0}
                            required
                        />
                    </div>
                    {/* <div>
                        <label htmlFor="cook_time">Cook Time (in minutes):</label>
                        <input
                            type="number"
                            id="cook_time"
                            value={cookTime}
                            onChange={(e) => setCookTime(e.target.value)}
                            placeholder='Enter cook time' 
                        />
                    </div> */}
                    <div className="availability_container">
                        <label htmlFor="availability">Availability:</label>
                        <input
                            type="checkbox"
                            id="availability"
                            checked={availability}
                            onChange={(e) => setAvailability(e.target.checked)}
                        />
                    </div>
                    <div className="update_delete_options_container">
                        <button type="submit">Update Menu Item</button>
                        <button type="button" onClick={handleDelete}>
                            Delete Menu Item
                        </button> 
                    </div>
                </form>
            )}
            {responseMessage && <p className="response_container" style={response_container_styles}>{responseMessage}</p>}
        </div>
    );
};

export default ManageMenuItems;
