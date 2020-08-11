import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  state={
    pizzas: [],
    topping: "Pizza Topping",
    size: "Small",
    vegetarian: null,
    pizzaID: null
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(resp => resp.json())
    .then(resp => this.setState({pizzas: resp}))
  }

  editPizza = (pizza) => {
    let veggie = pizza.vegetarian === true ? "Vegetarian" : "Not Vegetarian" 
    this.setState({
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: veggie,
      pizzaID: pizza.id
    })
  }

  handleSubmit = (pizza) => {
    let configObj = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        topping: this.state.topping,
        size: this.state.size,
        vegetarian: this.state.vegetarian === "Vegetarian" ? true : false,
        id: pizza
      })
    }
    fetch(`http://localhost:3000/pizzas/${pizza}`, configObj)
    .then(resp => resp.json())
    .then(resp => this.updatePizzaList(resp))
  }

  updatePizzaList = (resp) => {
    fetch('http://localhost:3000/pizzas')
    .then(resp => resp.json())
    .then(resp => this.setState({pizzas: resp}))
  }

  handleChange = (event) => {
    let daKey;
    switch (event.target.name) {
      case "topping":
        daKey = event.target.name
        break;
      case "size":
        daKey = event.target.name;
        break
      case "vegetarian":
        daKey = event.target.name;
        break;
    }
    this.setState({
      [daKey]: event.target.value
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm topping={this.state.topping} handleChange={this.handleChange} size={this.state.size} vegetarian={this.state.vegetarian} pizzaID={this.state.pizzaID} handleSubmit={this.handleSubmit} />
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza} pizzaID={this.state.pizzaID} />
      </Fragment>
    );
  }
}

export default App;
