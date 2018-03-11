import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationChange } from './../reducers/notificationReducer'
import { notificationClear } from './../reducers/notificationReducer'
import { connect } from 'react-redux'


class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => 
                this.props.anecdoteVote(anecdote) &&
                this.props.notificationChange(`you votes '${anecdote.content}'`) 
                &&
                  setTimeout(() => {
                    this.props.notificationClear()
                  }, 5000)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
    anecdotes: state.anecdotes
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { anecdoteVote, notificationChange, notificationClear }
)(AnecdoteList)

export default ConnectedAnecdoteList
