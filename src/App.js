import React, { Component, Fragment } from 'react';
import Header from './components/Header'  
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    editPizza: {}
  }

  componentDidMount() {
    fetch("http://localhost:3000/pizzas")
    .then(res => res.json())
    .then(pizzaArray => this.setState({pizzas: pizzaArray}))
  }

  editClicked = (pizzaObj) => {
    this.setState({editPizza: pizzaObj})
  }
  
  editPizzaChange = (e) => {
    const k = e.target.name
    const val = e.target.value
    if (k === "vegetarian") {
      this.setState({editPizza: {...this.state.editPizza, vegetarian: true}})
    } else if (k === "nonvegetarian") {
      this.setState({editPizza: {...this.state.editPizza, vegetarian: false}})
    } else {
      this.setState({editPizza: {...this.state.editPizza, [k]: val}})
    }
  }

  formSubmitted = (e) => {
    fetch(`http://localhost:3000/pizzas/${this.state.editPizza.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state.editPizza)
    })
    .then(res => res.json())
    .then(editedPizza => {
      let newPizzaArr = this.state.pizzas.filter(p => p.id !== editedPizza.id)
      newPizzaArr.push(editedPizza)
      newPizzaArr.sort((a,b) => a.id > b.id ? 1 : -1)
      this.setState({pizzas: newPizzaArr})
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm editPizza={this.state.editPizza} formSubmitted={this.formSubmitted} editPizzaChange={this.editPizzaChange} />
        <PizzaList pizzas={this.state.pizzas} editClicked={this.editClicked} />
      </Fragment>
    );
  }
}

export default App;
