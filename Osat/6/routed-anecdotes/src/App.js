import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import { ListGroupItem } from 'react-bootstrap'
import { Media } from 'react-bootstrap'
import { Alert } from 'react-bootstrap'
import { Well } from 'react-bootstrap'
import { Popover } from 'react-bootstrap'
import Pic from './pic.jpg'

const AnecdoteList = ({ anecdotes, notification, style }) => (
  <div className="container">
    <h2>Anecdotes</h2>
    <Alert bsStyle="success">
      {notification}
      </Alert>
      <ListGroup>
        {anecdotes.map(anecdote => 
        <ListGroupItem key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>)}
      </ListGroup> 
  </div>
)

const Anecdote = ({anecdote}) => {
  return(
  <div>
    <h2>{anecdote.content}</h2>
    <Well>Has {anecdote.votes} votes</Well>
  </div>
)}

const About = () => (
  <div className="container">
  <Media>
  <Media.right>
      <img width={64} height={64} src={Pic} alt="thumbnail" />
    </Media.right>
    <Media.Body>
      <Media.Heading>About anecdote app</Media.Heading>
      <p>According to Wikipedia:</p>

      <p>
      An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."
      </p>
      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>

    </Media.Body>
  </Media>
  </div>
)

const Footer = () => (
  <div>
    <Popover
    id="popover-basic"
    placement="left"
    positionRight={100}
    positionTop={600}
    title="Test"
  >
  Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </Popover></div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.setState({ notification: 'new anecdote has been made!' })  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

   style = {
    border: '1px solid powderblue',
    padding: 10,
    borderWidth: 1,
    color: 'blue'
  }

  menu = {
    color: 'red',
    display: 'inline-block',
    backgroundColor: "#00B1E1"
  }

  render() {
    return (
      <div className="container">
        <h1>Software anecdotes</h1>
        <Router>
          <div>
            <div style={this.menu}>
              <Link to="/">anecdotes</Link> &nbsp;
              <Link to="/create">create new</Link> &nbsp;
              <Link to="/about">about</Link> &nbsp;
            </div>
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} notification={this.state.notification} style={this.style} />} />
            <Route path="/create" render={({history}) => <CreateNew addNew={this.addNew} history={history}/>} />
            <Route path="/about" render={() => <About />} />
            <Route exact path="/anecdotes/:id" render={({match}) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
