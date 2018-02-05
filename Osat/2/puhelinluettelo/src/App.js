import React from 'react';
import Person from './components/Person';
import axios from 'axios'
import personService from './services/persons'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="info">
      {message}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {          
      persons: [],
      newName: '',
      newNro: '',
      filter: '',
      info: ''
    }
  }

  componentDidMount() {
    personService
    .getAll()
    .then(response => {
      this.setState({persons: response.data})
    })
  }

  addNew = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNro
    }
    
    const persons = this.state.persons.concat(personObject)
    const name = this.state.newName
    const nro = this.state.newNro
    var exists =0
    this.state.persons.forEach(function(element) {
        element.name.localeCompare(name)?
        console.log(element.name, name, exists)
        : exists =1
      });
      if (exists===0) {
      personService
        .create(personObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNro: '',
            info: 'lisäys onnistui'
          })
          setTimeout(() => {
            this.setState({info: null})
          }, 5000)


        })
      } else {
        const person = this.state.persons.find(p => p.name === this.state.newName)
        const id = person.id
        const changedPerson = { ...person, number: this.state.newNro }
        console.log(person, changedPerson, id)

        personService
        .update(id, changedPerson)
        .then(changedPerson => {
          const persons = this.state.persons(p => p.id !== id)
          this.setState({
            persons: persons.concat(changedPerson),
            newName: '',
            newNro: '',
            info: 'muunto onnistui'
          })
          setTimeout(() => {
            this.setState({info: null})
          }, 5000)
        })
        .catch(info => {
          this.setState({
            info: `muistiinpano on jo poistettu palvelimelta`,
          })
          setTimeout(() => {
            this.setState({info: null})
          }, 5000)
        })
      } 
        
}

handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
}

handleNroChange = (event) => {
    this.setState({ newNro: event.target.value })
}

handleFilter = (event) => {
    this.setState({ filter: event.target.value })
}

poista = (id) => {
  return () => {
    const url = `http://localhost:3001/persons/${id}`
    const persons = this.state.persons
    persons.splice(id-1, 1);

    axios
      .delete(url)
      .then(response => {
          this.setState({
            persons: persons,
            newName: '',
            newNro: '',
            filter: '',
            info: 'poisto onnistui'
          })
          setTimeout(() => {
            this.setState({info: null})
          }, 5000)
      })
  }
}

  render() {
    const fil = this.state.persons.filter(person => person.name.includes(this.state.filter))

    return (
      <div>
        <h2> Rajaus </h2>
        <Notification message={this.state.info}/>
          <div>
            <input 
                value={this.state.filter}
                onChange={this.handleFilter}
                />
          </div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addNew.bind(this)}>
          <div>
            nimi: 
            <input 
                value={this.state.newName}
                onChange={this.handleNameChange}
                />
            numero:
            <input
                value={this.state.newNro}
                onChange={this.handleNroChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
            {fil.map(person => 
            <Person 
              key={person.name}
              person={person}
              poista={this.poista(person.id)} />)}
        </ul>
      </div>
    )
  }
}

export default App