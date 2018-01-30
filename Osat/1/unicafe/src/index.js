import React from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({ hyva, neutraali, huono }) => {
    if (hyva !== 0 || huono !== 0 || neutraali !== 0) {
       return (
        <table>
            <tbody>
                <tr>
                    <td>Hyvä</td>
                    <td>< Statistic text="Hyvä" value={hyva} /></td>
                </tr>
                <tr>
                    <td>Neutraali</td>
                    <td>< Statistic text="Neutraali" value={neutraali}/></td>
                </tr>
                <tr>
                    <td>Huono</td>
                    <td>< Statistic text="Huono" value={huono}/></td>
                </tr> 
                <tr>
                    <td>Keskiarvo</td>
                    <td>< Statistic text="Keskiarvo" value={(hyva - huono) / 10}/></td>
                </tr>
                <tr>
                    <td>Positiivisia</td>
                    <td>< Statistic text="Positiivisia" value={(hyva / (hyva + huono + neutraali)) * 100 }/></td>
                </tr>
            </tbody>
        </table>
      ) 
    }
    return (
        <div>
         <p>Yhtään palautetta ei ole annettu</p>
        </div>
      )
    
  }

  const Statistic = ({ text, value }) => {
    return (
        <div>
          <p>  {value}</p>
        </div>
      )
  }

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0
      }
    }

    klikHyva = () => {
        this.setState({
            hyva: this.state.hyva + 1,
        })
      }
    
    klikNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali + 1,
        })
    }

    klikHuono = () => {
        this.setState({
            huono: this.state.huono + 1,
        })
    }

    asetaArvoon = ({name, value}) => {
        return () => {
          this.setState({ name: this.state[value] })
        }
      }
  
    render() {
      return (
        <div>
          <div>
            <p>Anna palautetta</p>
            <Button
                handleClick={this.klikHyva}
                text="hyvä"
            />
            <Button
                handleClick={this.klikNeutraali}
                text="neutraali"
            />
            <Button
                handleClick={this.klikHuono}
                text="huono"
            />
            <p>Statistiikka</p>
            < Statistics 
                hyva={this.state.hyva} 
                huono={this.state.huono} 
                neutraali={this.state.neutraali} />
          </div>
        </div>
      )
    }
  }

ReactDOM.render(<App />, document.getElementById('root'));
