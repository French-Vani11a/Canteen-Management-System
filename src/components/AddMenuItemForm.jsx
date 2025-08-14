// import React, { useState } from 'react'

// const AddMenuItemForm = () => {
//     const [itemName, setItemName] = useState('')
//     const [description, setDescription] = useState('')
//     const [priceInCents, setPriceInCents] = useState('')
//     const [availability, setAvailability] = useState(false)
//     const [responseMessage, setResponseMessage] = useState('')

//     const handleSubmit = (e) => {
//         e.preventDefault()
 
//         const formData = new FormData()
//         formData.append('item_name', itemName)
//         formData.append('description', description)
//         formData.append('price_in_cents', priceInCents)
//         formData.append('availability', availability ? 1 : 0)
 
//         fetch('http://localhost/e_eat/add_menu_item.php', {
//             method: 'POST',
//             body: formData,
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.status === 'success') {
//                 setResponseMessage(data.message)
//                 setItemName('')
//                 setDescription('')
//                 setPriceInCents('')
//                 setAvailability(false)
//                 setTimeout(() => {
//                     setResponseMessage()
//                 }, 3000)
//                 setTimeout(() => {
//                     window.location.reload(true)
//                 }, 3000)
//             } else {
//                 setResponseMessage(data.message)
//                 setTimeout(() => {
//                     setResponseMessage()
//                 }, 3000)
//             }
//         })
//         .catch(error => {
//             setResponseMessage('Error: ' + error.message)
//             setTimeout(() => {
//                 setResponseMessage()
//             }, 3000)
//         })
//     }

//     const response_container_styles = {
//         backgroundImage: "url('images/green_tick.svg')",
//         backgroundSize: "auto 70%",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "10px center"
//     }

//     return (
//         <div className="add_item_menu">
//             <h2>Add New Menu Item</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="item_name">Item Name:</label>
//                     <input 
//                         type="text" 
//                         id="item_name" 
//                         value={itemName} 
//                         onChange={(e) => setItemName(e.target.value)} 
//                         required 
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="description">Description:</label>
//                     <input 
//                         type="text" 
//                         id="description" 
//                         value={description} 
//                         onChange={(e) => setDescription(e.target.value)} 
//                         required 
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="price_in_cents">Price (in ZIG):</label>
//                     <input 
//                         type="number" 
//                         id="price_in_cents" 
//                         value={priceInCents} 
//                         onChange={(e) => setPriceInCents(e.target.value)} 
//                         required 
//                         min={0}
//                     />
//                 </div>
//                 <div className='availability_container'>
//                     <label htmlFor="availability">Availability:</label>
//                     <input 
//                         type="checkbox" 
//                         id="availability" 
//                         checked={availability} 
//                         onChange={(e) => setAvailability(e.target.checked)} 
//                         required
//                     />
//                 </div>
//                 <button type="submit">Add Menu Item</button>
//             </form>
//             {responseMessage && <p className="response_container" style={response_container_styles}>{responseMessage}</p>}
//         </div>
//     );
// };

// export default AddMenuItemForm;

import React, { useState } from 'react';

const AddMenuItemForm = () => {
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [priceInCents, setPriceInCents] = useState('');
    const [cookTime, setCookTime] = useState('');  // Added cookTime state
    const [availability, setAvailability] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('item_name', itemName);
        formData.append('description', description);
        formData.append('price_in_cents', priceInCents);
        formData.append('cook_time', cookTime);  // Include cookTime
        formData.append('availability', availability ? 1 : 0);

        fetch('http://localhost/e_eat/add_menu_item.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                setResponseMessage(data.message);
                setItemName('');
                setDescription('');
                setPriceInCents('');
                setCookTime('');  // Clear cookTime
                setAvailability(false);
                setTimeout(() => {
                    setResponseMessage('');
                }, 3000);
                setTimeout(() => {
                    window.location.reload(true);
                }, 3000);
            } else {
                setResponseMessage(data.message);
                setTimeout(() => {
                    setResponseMessage('');
                }, 3000);
            }
        })
        .catch(error => {
            setResponseMessage('Error: ' + error.message);
            setTimeout(() => {
                setResponseMessage('');
            }, 3000);
        });
    };

    const response_container_styles = {
        backgroundImage: "url('images/green_tick.svg')",
        backgroundSize: "auto 70%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "10px center"
    };

    return (
        <div className="add_item_menu">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="item_name">Item Name:</label>
                    <input 
                        type="text" 
                        id="item_name" 
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
                    <label htmlFor="price_in_cents">Price (in ZIG):</label>
                    <input 
                        type="number" 
                        id="price_in_cents" 
                        value={priceInCents} 
                        onChange={(e) => setPriceInCents(e.target.value)} 
                        placeholder='Enter price'
                        required 
                        min={0}
                    />
                </div>
                <div>
                    <label htmlFor="cook_time">Cook Time (in minutes):</label>
                    <input 
                        type="number" 
                        id="cook_time" 
                        value={cookTime} 
                        onChange={(e) => setCookTime(e.target.value)} 
                        placeholder='Enter cook time' 
                        min={0}
                    />
                </div>
                <div className="availability_container">
                    <label htmlFor="availability">Availability:</label>
                    <input 
                        type="checkbox" 
                        id="availability" 
                        checked={availability} 
                        onChange={(e) => setAvailability(e.target.checked)} 
                    />
                </div>
                <button type="submit">Add Menu Item</button>
            </form>
            {responseMessage && <p className="response_container" style={response_container_styles}>{responseMessage}</p>}
        </div>
    );
};

export default AddMenuItemForm;
