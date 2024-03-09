import { useState } from 'react'
import { anecdotes } from './data'

function App() {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  // gotoNext function
  const gotoNext = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  // upVote function
  const upVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  // anecdotes with maximum votes
  const maxVote = () => {
    let max = 0
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] === Math.max(...votes) && Math.max(...votes) !== 0) {
        max = i
      }
    }
    return max
  }

  return (
    <main>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <button onClick={upVote}>vote</button>
        <button onClick={gotoNext}>Next</button>
      </div>
      <div>
        <h2>Anecdote with most Votes</h2>
        <p>{anecdotes[maxVote()]}</p>
      </div>
    </main>
  )
}

export default App
