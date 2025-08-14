import { useEffect, useState } from "react";
import { currencyFormatter } from "../utils/utility_functions";
import ButtonToAddItemToCart from "./ButtonToAddItemToCart";
import Item from "./Item";

const LatestMenu = ({ show_add_to_cart_button }) => {
    const [latestMenu, setLatestMenu] = useState(null);

    function fetchLatestMenu() {
        let xhr = new XMLHttpRequest();
        
        xhr.open('GET', 'http://localhost/e_eat/fetch_latest_menu.php', true);
        
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) { 
                let response = JSON.parse(xhr.responseText);
                //console.log(response)
                if (response.status === 'success') { 
                    let menuData = response.data;
                    setLatestMenu(menuData);
                    //console.log(menuData);
                } else {
                    console.error('Error: ' + response.message);
                }
            } else {
                console.error('Request failed. Status: ' + xhr.status);
            }
        };
        
        xhr.onerror = function() {
            console.error('Request failed');
        }
        
        xhr.send();
    }
    
    useEffect(() => {
        fetchLatestMenu();
    }, []);

    return (
        <div className="latest_menu">
            { 
                latestMenu ? (
                    Object.keys(latestMenu).map((item_description) => (
                        <Item 
                            key={item_description} 
                            cost={latestMenu[item_description].price_in_cents} 
                            description={item_description} 
                            show_add_to_cart_button={show_add_to_cart_button} 
                            cook_time={latestMenu[item_description].cook_time}
                        />
                    ))
                ) : (
                    <p>Loading menu...</p>  
                )
            }
        </div>
    );
};

export default LatestMenu;


