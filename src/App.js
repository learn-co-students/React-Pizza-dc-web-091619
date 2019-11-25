import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'


class App extends Component {

  state = {
  currentPizzas: [],
  selectedPizza:{topping:"",size:"Small",vegetarian:false}
  }

  changeValue = (e) => {
    let newVal = e.target.value
    if (e.target.name === "topping") {
    this.setState((preValue)=>{
    return {selectedPizza:{...preValue.selectedPizza,topping:newVal}}})
    }
    if (e.target.name === "size") {
      this.setState((preValue)=>{
        return {selectedPizza:{...preValue.selectedPizza,size:newVal}}})
    }
    if (e.target.name === "vegetarian") {
      if (newVal === "Vegetarian") {
        newVal = true;
      } else { 
        newVal = false;
      }
      this.setState((preValue)=>{
        return {selectedPizza:{...preValue.selectedPizza,vegetarian:newVal}}})
    }
  }

  submitForm = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/pizzas/${this.state.selectedPizza.id}`,{
      method:"PATCH",
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify(this.state.selectedPizza)
    }).then(res=>res.json())
    .then(this.updatePizzaOnDom)
  }

  updatePizzaOnDom = (pizza) => {
    let newPizzas = [...this.state.currentPizzas]
    newPizzas[pizza.id-1] = pizza
    this.setState({currentPizzas:newPizzas})
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/pizzas')
      .then(res=>res.json())
      .then(this.addPizzasToState)
  }

  addPizzasToState = (currentPizzas) => {
    let selectedPizza = currentPizzas[0]
    this.setState({currentPizzas,selectedPizza})
  }

  addPizzaToForm = (selectedPizza) => {
    this.setState({selectedPizza})
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm submitForm={this.submitForm} changeValue={this.changeValue} topping={this.state.selectedPizza &&this.state.selectedPizza.topping} size={this.state.selectedPizza && this.state.selectedPizza.size} vegetarian={this.state.selectedPizza && this.state.selectedPizza.vegetarian}/>
        <PizzaList addPizzaToForm={this.addPizzaToForm} currentPizzas={this.state.currentPizzas}/>
      </Fragment>
    );
  }
}

export default App;
