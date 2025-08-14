import { useContext, useState } from "react"
import { AuthContext } from "../auth/AuthProvider"
import { v4 as uuid } from 'uuid'
import { currencyFormatter } from '../utils/utility_functions'

const Item = ({cost, description, show_add_to_cart_button, cook_time}) => { 
  const {cartInfo, setCartInfo} = useContext(AuthContext)
  const [itemTotalError, setItemTotalError] = useState(false)

  return (
    <div key={description} className="product"> 
      <span className="cook_time displayed_none">{cook_time && `${cook_time + " minutes"}`}</span>
      <span className="description">{description}</span>
      <span className="cost">ZIG{currencyFormatter(cost / 100)}</span> 
    {show_add_to_cart_button && 
    <input type="number" className={`change_quantity${itemTotalError ? ' red_color' : ''}`}  name={description} id={description} placeholder="0" min={0}
        onChange={() => setItemTotalError(false)}/> 
        }
        {show_add_to_cart_button &&
      <button className="add_to_cart"
        onClick={(e) => { 
          if(Number(e.target.parentElement.querySelector("input[type='number']").value) === 0 || isNaN(e.target.parentElement.querySelector("input[type='number']").value)) {
            setItemTotalError(true)
            setTimeout(() => setItemTotalError(false), 2000)
            return
          }

          const new_state = {...cartInfo}
          const product_id = uuid()
          const total_item_cost = parseInt(e.target.parentElement.querySelector("input[type='number']").value) * parseInt(cost)

          new_state['totalAmount'] = parseInt(new_state['totalAmount']) + total_item_cost
          
          new_state['totalItems'] += parseInt(e.target.parentElement.querySelector("input[type='number']").value)

          new_state['cartItems'][product_id] = {
            item_name: description,
            description: description,
            cost_per_item_in_cents: parseInt(cost),
            item_count: parseInt(e.target.parentElement.querySelector("input[type='number']").value),
            total_cost_of_item_count: total_item_cost,
            cook_time: cook_time
          }

          setCartInfo(new_state)
          e.target.parentElement.querySelector("input[type='number']").setAttribute('value', '0') 
          // //console.log(new_state)

        }}
      >Add to cart</button> 
    }
    </div>
  )
}

export default Item