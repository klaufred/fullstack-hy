import React from 'react'

const Kurssi = ({ kurssi }) => {
    return (
      <div>
        <Otsikko nimi={kurssi.nimi} />
        <Sisalto kurssi={kurssi} />
        <Yhteensa kurssi={kurssi}/>
      </div>
    )
  }
  
  const Otsikko = ({nimi}) => {
      return (
        <div>
          <h1>{nimi}</h1>
        </div>
      )
    }
  
    const Sisalto = ({kurssi}) => {
      return (
          <div>
            {kurssi.osat.map(osa => <Osa key={osa.id}  osa={osa} />)}
          </div>
        )
    }
  
    const Osa = ({osa}) => {
      return (
        <div>
          <p>{osa.nimi} {osa.tehtavia}</p>
        </div>
      )
    }
  
    const Yhteensa = ({kurssi}) => {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
  
      return (
          <div>
            <p>Yhteensä {kurssi.osat.map(osa => osa.tehtavia).reduce(reducer)}</p>
          </div>
        )
    }

    export default Kurssi