import React from 'react';
import axios from 'axios'

const Fill = ({maat}) => {
  console.log(maat)
  if (maat.length > 10) {
    return(
    <div>
      <p>too many matches, specify another filter</p>
    </div>
    )
  } else if (maat.length < 10 && maat.length > 1) {
    return(
    <div >
      <ul>
        {maat.map(country => <Maa key={country.name} maa={country} />)}
      </ul>
    </div>
    )
  } else if (maat.length === 1) {
    return (
      <div>
        <p>Name : {maat[0].name} </p>
        <p>Flag : {maat[0].flag} </p>
        <p>Population: {maat[0].population} </p>
      </div>
    )
  } else {
    return (
      <div>
        <p></p>
      </div>
    )
  }
}

const Maa = ({maa}) => {
  return (
      <div>
        <p>{maa.name}</p>
      </div>
    )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {          
      maat: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ maat: response.data })
      })
  }

handleFilter = (event) => {
    this.setState({ filter: event.target.value })
}

  render() {

    const fil = this.state.maat.filter(maa => maa.name.includes(this.state.filter))

    return (
      <div>
        <h2> Find countries </h2>
          <div>
            <input 
                value={this.state.filter}
                onChange={this.handleFilter}
                />
          </div>
        <h2>Maat</h2>
          <Fill maat={fil}/>
      </div>
    )
  }
}

export default App