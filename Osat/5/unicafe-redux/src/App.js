import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const palautteita = store.getState().good + store.getState().ok + store.getState().bad

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }
  const keskiarvo = () => {
    const sum = store.getState().good - store.getState().bad
    return (palautteita === 0 ? 0 : sum / palautteita).toFixed(1)
  }

  const pos = () =>
    (palautteita === 0 ? 0 : 100 * store.getState().good / palautteita).toFixed(1)

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo()}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{pos()}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
     store.dispatch({ type: nappi})
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)