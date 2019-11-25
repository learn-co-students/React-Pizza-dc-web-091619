import React from "react"

const Pizza = (props) => {
  return(
    <tr>
      <td>{props.pizzaObj.topping}</td>
      <td>{props.pizzaObj.size}</td>
      <td>{props.pizzaObj.vegetarian ? "Yes" : "Nope"}</td>
      <td><button onClick={()=>props.addPizzaToForm(props.pizzaObj)} type="button" className="btn btn-primary">Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
