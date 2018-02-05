import React from 'react'

const Person = ({person, poista}) => {
  return (
    <li>{person.name} {person.number} <button onClick={poista}>poista</button></li>
  )
}

export default Person