import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
      <div>
        <p>{props.kurssi}</p>
      </div>
    )
  }

  const Sisalto = (props) => {
    /*
    osa 1.3
    return (
      <div>
        <Osa tehtava={props.tehtavia1} osa={props.osa1}  />
        <Osa tehtava={props.tehtavia2}  osa={props.osa2} />
        <Osa tehtava={props.tehtavia3} osa={props.osa3}  />
      </div>
    )
    */
    return (
        <div>
          <Osa tehtava={props.osat[0].nimi} osa={props.osat[0].tehtavia}  />
          <Osa tehtava={props.osat[1].nimi} osa={props.osat[1].tehtavia}  />
          <Osa tehtava={props.osat[2].nimi} osa={props.osat[2].tehtavia}  />
        </div>
      )
  }

  const Osa = (props) => {
    return (
      <div>
        <p>{props.tehtava} ja {props.osa}</p>
      </div>
    )
  }

  const Yhteensa = (props) => {
    /*
    return (
      <div>
        <p>Yhteensä { props.tehtavia1  +  props.tehtavia2 + props.tehtavia3 } </p>
      </div>
    )
    */
    return (
        <div>
          <p>Yhteensä { props.osat[0].tehtava  +  props.osat[1].tehtava + props.osat[2].tehtava } </p>
        </div>
      )
  }

const App = () => {
    /*
    osa1.3
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    }
    const osa2 = {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    }
    const osa3 = {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osa1={osa1.nimi} osa2={osa2.nimi} osa3={osa3.nimi} tehtavia1={osa1.tehtavia} tehtavia2={osa2.tehtavia} tehtavia3={osa3.tehtavia}/>
      <Yhteensa tehtavia1={osa1.tehtavia} tehtavia2={osa2.tehtavia} tehtavia3={osa3.tehtavia} />
    </div>
  )

  */
  /*
  osa 1.4
  const kurssi = 'Half Stack -sovelluskehitys'
  const osat = [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  ]

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osat={osat} />
      <Yhteensa osat={osat} />
    </div>
  )
  */
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)