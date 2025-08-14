import { useContext, useState, useEffect } from "react"; 
import { AuthContext } from "../auth/AuthProvider";
import { currencyFormatter, recordTransaction } from "../utils/utility_functions";

const Checkout = ({ isCheckoutDisplayed, setIsCheckoutDisplayed }) => {
  const { cartInfo, setCartInfo, loggedInUserDetails, setLoggedInUserDetails, orderNumber, setOrderNumber } = useContext(AuthContext);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("images/paynow_blue.svg");
  const [isUsingStudentBalance, setIsUsingStudentBalance] = useState(true);
  const [isPayNowTransactionLoading, setIsPayNowTransactionLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [newStudentBalance, setNewStudentBalance] = useState(loggedInUserDetails.student_balance);
  const [averageCookTime, setAverageCookTime] = useState(null);

  useEffect(() => {
    if (cartInfo.cartItems && Object.keys(cartInfo.cartItems).length > 0) {
      const cookTimes = Object.values(cartInfo.cartItems).map(item => item.cook_time).filter(time => time != null);
      const maxCookTime = Math.max(...cookTimes);
      if (cookTimes.length > 0) {
        setAverageCookTime(maxCookTime);
        // document.querySelector(".cook_time_container")?.classList.remove("displayed_none");
      }
    } else {
      setAverageCookTime(null);
      // document.querySelector(".cook_time_container")?.classList.add("displayed_none");
    }
  }, [cartInfo.cartItems]);

  function togglePaymentOption(e) { 
    if(e.target.classList.contains("selected_payment_option")) {
      return;
    }
    document.querySelectorAll(".checkout_options_btn").forEach(btn => {
      btn.classList.remove("selected_payment_option"); 
    });

    if(!e.target.classList.contains("selected_payment_option")) {
      e.target.classList.add("selected_payment_option");

      if(e.target.classList.contains("student_balance")) {
        setIsUsingStudentBalance(true);
        setBackgroundImageUrl("images/paynow_blue.svg");
        document.querySelector(".enter_phone_number_container #phone_number").value = "";
        document.querySelector(".enter_phone_number_container").classList.add("displayed_none");  
      } else { 
        setIsUsingStudentBalance(false);
        setBackgroundImageUrl("images/paynow_white.svg");
        document.querySelector(".student_balance").classList.remove("selected_payment_option");  
        document.querySelector(".enter_phone_number_container").classList.remove("displayed_none");  
      }
    }
  }

  function updateStudentBalance(userName, newBalance) {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost/e_eat/update_student_balance.php';
    const params = `user_name=${encodeURIComponent(userName)}&new_student_balance=${encodeURIComponent(newBalance)}`;

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.status === "success") {
          //console.log("Balance updated successfully."); 
        } else {
          console.error("Error:", response.message);
        }
      }
    };

    xhr.send(params);
  }

  function fetchOrderNumber(userName) {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost/e_eat/fetch_order_number.php';
    const params = `user_name=${encodeURIComponent(userName)}`;

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.status === "success") {
          //console.log("Order number fetched successfully:", response.order_number);
          setOrderNumber(response.order_number); 
        } else {
          console.error("Error:", response.message);
        }
      }
    };

    xhr.send(params);
  }

  function checkoutUsingStudentBalance() {
    const new_state = { ...loggedInUserDetails };
    const new_student_balance = Number(parseInt(loggedInUserDetails.student_balance - cartInfo.totalAmount));
    new_state['student_balance'] = new_student_balance;
    setNewStudentBalance(new_student_balance);
    setLoggedInUserDetails(new_state);
    recordTransaction(cartInfo.cartItems, cartInfo.totalAmount, loggedInUserDetails.user_name);

    fetchOrderNumber(loggedInUserDetails.user_name);

    document.querySelector(".complete_payment_using_student_balance").classList.toggle("displayed_none");
    document.querySelector(".success_order_number").classList.remove("displayed_none");

    const new_user_details = JSON.parse(localStorage.getItem("userDetails"));
    new_user_details['student_balance'] = new_student_balance;
    localStorage.setItem("userDetails", JSON.stringify(new_user_details));

    const user_name = JSON.parse(localStorage.getItem("userDetails")).user_name;

    document.querySelector(".cook_time_container")?.classList.remove("displayed_none");

    setNewStudentBalance(new_student_balance);
    updateStudentBalance(user_name, new_student_balance);
    setTimeout(() => {
      window.location.reload(true);
    }, 3000);
  }

  function checkoutUsingPaynow() {
    let formData = new FormData(document.querySelector("#complete_payment_using_paynow_form"));
    let xhr = new XMLHttpRequest();
    setIsPayNowTransactionLoading(true);

    xhr.open('POST', 'http://localhost/e_eat/process_payment.php', true);
    xhr.onload = function() {
      const response_json = JSON.parse(this.responseText);
      //console.log(this.responseText);

      if (response_json.status === "Ok") {
        setIsPayNowTransactionLoading(false);
        const pollurl = "https://www.paynow.co.zw/Transaction/TransactionView/" + response_json.pollurl.slice(48);
        recordTransaction(cartInfo.cartItems, cartInfo.totalAmount, loggedInUserDetails.user_name, pollurl);
        fetchOrderNumber(loggedInUserDetails.user_name);
        setSuccessMsg(pollurl);
        document.querySelector(".success_paynow").classList.remove("displayed_none");
        document.querySelector(".success_order_number").classList.remove("displayed_none");
        document.querySelector(".cook_time_container")?.classList.remove("displayed_none");
        setTimeout(() => {
          window.location.reload(true);
        }, 3000);
      } else {
        setIsPayNowTransactionLoading(false);
        setErrorMsg("Transaction could not be processed. Insufficient funds");
        document.querySelector(".error_paynow").classList.remove("displayed_none");
      }
    };

    xhr.send(formData);
  }

  function updateStudentBalanceInDB() {
    let formData = new FormData(document.querySelector("#update_student_balance_form"));
    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost/e_eat/update_student_balance.php', true);
    xhr.onload = function() { 
      //console.log(this.responseText); 
    }; 
    xhr.send(formData);
  }

  const paynow_option_styles = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "200px auto",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  };

  const error_styles = {
    backgroundImage: "url('images/denied_red.svg')",
    backgroundSize: "auto 70%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "10px center"
  };

  const success_styles = {
    backgroundImage: "url('images/green_tick.svg')",
    backgroundSize: "auto 70%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "10px center"
  };

  const loading_styles = {
    backgroundImage: "url('images/loading.gif')",
    backgroundSize: "auto 70%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "10px center"
  };

  const cook_time_styles = {
    backgroundImage: "url('images/clock.svg')",
    backgroundSize: "auto 70%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "10px center"
  };

  return (
    <div className="checkout">
      {/* <Nav /> */}
      <form id="update_student_balance_form" >
        <input type="hidden" name="user_name" value={loggedInUserDetails.user_name} />
        <input type="hidden" name="new_student_balance" value={newStudentBalance} />
      </form>
      <div className="checkout_container">
        <h1>Checkout</h1>
        <button
          className="hideCheckout"
          onClick={(e) => {
            e.preventDefault(); 
            setIsCheckoutDisplayed(false);
            setErrorMsg("");
            setSuccessMsg("");
            document.querySelector(".error_paynow")?.classList.add("displayed_none");
          }}
        >
          +
        </button>
      </div> 
      {cartInfo['totalItems'] === 0 ?
        <div className="no_items_to_checkout">No items to checkout</div>
        :
        <>
          <div className="items_to_checkout">
            <div className="cart_item" id="heading">
              <span className="name">Item</span>
              <span className="item_count">Quantity</span>
              <span className="total_cost_of_item_count">Cost</span>
              <button className="remove_product_from_cart"></button>
            </div>
            {Object.keys(cartInfo['cartItems']).map(key => (
              <div key={key} id={`item__${key}`} className="cart_item">
                <span className="name">{cartInfo['cartItems'][key]?.description[0].toUpperCase() + cartInfo['cartItems'][key]?.description.slice(1)}&nbsp;</span>
                <input type="number" className="item_count" data_item_key={key} placeholder={cartInfo['cartItems'][key]?.item_count} data_value={0} min={1} disabled />
                <span className="total_cost_of_item_count">ZIG{currencyFormatter(parseInt(cartInfo['cartItems'][key]?.total_cost_of_item_count) / 100)}</span>
                <button className="remove_product_from_cart"
                  onClick={() => { 
                    const new_state = { ...cartInfo };
                    new_state['totalItems'] = Number(new_state['totalItems']) - cartInfo['cartItems'][key].item_count;
                    new_state['totalAmount'] = Number(new_state['totalAmount']) - (parseInt(cartInfo['cartItems'][key].total_cost_of_item_count));

                    if (cartInfo.cartItems && Object.keys(cartInfo.cartItems).length > 0) {
                      const cookTimes = Object.values(cartInfo.cartItems).map(item => item.cook_time).filter(time => time != null);
                      const maxCookTime = Math.max(...cookTimes);
                      if (cookTimes.length > 0) {
                        setAverageCookTime(maxCookTime); 
                      }
                    } else {
                      setAverageCookTime(null); 
                    }

                    const new_cart_items = Object.keys(new_state['cartItems'])
                      .filter(item_key => item_key !== key)
                      .reduce((obj, item_key) => {
                        obj[item_key] = cartInfo['cartItems'][item_key];
                        return obj;
                      }, {});

                    new_state['cartItems'] = new_cart_items;
                    setCartInfo(new_state); 
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#ffffff">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                  </svg>
                </button>
              </div>
            ))}
            <div className="cart_item" id="grand_total">
              <span className="grand_total__title">Grand total</span> 
              <span className="grand_total__amount">ZIG{ currencyFormatter(cartInfo['totalAmount'] / 100) }</span> 
            </div>
          </div>
          <h3>Select payment option</h3>
          <div className="checkout_options">
            <button className="checkout_options_btn student_balance selected_payment_option"
              onClick={(e) => {
                e.preventDefault();
                togglePaymentOption(e);
              }}
            >
              STUDENT BALANCE
            </button>
            <button className="checkout_options_btn paynow"
              onClick={(e) => {
                e.preventDefault();
                togglePaymentOption(e);
              }}
              style={paynow_option_styles}
            >
            </button>
          </div>
          <div className="enter_phone_number_container paynow displayed_none" >
            <span>Enter your phone number in the format: 0771111111</span>
            <input type="text" name="phone_number" id="phone_number" placeholder="0771111111" value={phoneNumber} maxLength={10}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
          <div className={`loading ${isPayNowTransactionLoading ? "" : " displayed_none"}`} style={loading_styles}>Transaction is processing. Please wait</div>
          <div className="checkout_button_container">
            <button className="checkout_button"
              onClick={(e) => {
                e.preventDefault();
                if (isUsingStudentBalance) {
                  document.querySelector(".complete_payment_using_student_balance").classList.toggle("displayed_none");
                } else {
                  checkoutUsingPaynow();
                }
              }}
            >Complete payment</button>
          </div> 
          <span className="success_paynow displayed_none" style={success_styles}>Success. You may verify your transaction&nbsp;<a href={successMsg} target="_blank" rel="noreferrer">here</a></span>
          <span className="success success_order_number displayed_none" style={success_styles}>Thank you for your purchase. Your order number is {orderNumber}</span>
          <span className="cook_time_container displayed_none" style={cook_time_styles}>Your order will be ready for collection after 12:30pm</span>
          <span className="error error_paynow displayed_none" style={error_styles}>{errorMsg}</span>
          <div className="complete_payment_using_student_balance displayed_none">
            <h3>Are you sure you want to deduct ZIG{currencyFormatter(cartInfo.totalAmount / 100)} from your student balance?</h3>
            <form className="complete_payment_using_paynow_form displayed_none" id="complete_payment_using_paynow_form">
              <input type="hidden" name="total_amount" value={cartInfo.totalAmount} />
              <input type="hidden" name="total_items" value={cartInfo.totalItems} />
              <input type="hidden" name="phone_number" value={phoneNumber} />
            </form>
            <div className="complete_payment_using_student_balance_options">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (cartInfo.totalAmount > parseInt(loggedInUserDetails.student_balance)) { 
                    document.querySelector(".complete_payment_using_student_balance .error").classList.remove("displayed_none");
                    return;
                  }
                  updateStudentBalanceInDB();
                  checkoutUsingStudentBalance(); 
                }}
              >Yes</button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(".complete_payment_using_student_balance").classList.toggle("displayed_none");
                  document.querySelector(".complete_payment_using_student_balance .error").classList.add("displayed_none");
                }}
              >No</button>
            </div>
            <span className="error displayed_none" style={error_styles}>Sorry, you have an insufficient balance</span>
          </div>
        </>
      } 
    </div>
  );
};

export default Checkout;

