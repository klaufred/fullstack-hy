import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )
const HighestVoted = (allVotes, anecs) => {
    let luku = 0
    const kopio = allVotes.allVotes
    console.log(allVotes.anecs)
    for (var i = 0; i < allVotes.allVotes.length; i++) {
        console.log(kopio[i])
        if (luku < kopio[i]) {
            luku = kopio[i]
        }
      }

      let suurin = Array.from(allVotes.allVotes).indexOf(luku)

      if (suurin === -1) {
        suurin = 0
      }
      console.log(suurin, luku)

    return (
        <div>
            <p> Suurin määrä: {luku} </p>
            <p> {allVotes.anecs[suurin]} </p>
        </div>
      )
  }
  
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0, 0, 0, 0, 0, 0]
    }
  }
     next = () => {
        const number = Math.floor(Math.random() * 5)
        this.setState({
         selected: number,
        })
     }
    vote = (state) => {
        return () => { 
            const kopio = this.state.votes
            kopio[state] += 1
            this.setState({
                votes: kopio
            }) 
        }
        
    }

  render() {
    return (
      <div>
        <p> {this.props.anecdotes[this.state.selected]} </p>
        <p> Ääniä : {this.state.votes[this.state.selected]} </p>
        <Button
                handleClick={this.next}
                text="next"
            />
        <Button
                handleClick={this.vote(this.state.selected)}
                text="vote"
            />

         <p> Suurimman äänimäärän saanut :  </p>
         < HighestVoted 
            allVotes={this.state.votes}
            anecs={this.props.anecdotes} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)