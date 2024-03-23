import { useEffect, useState } from 'react'
import Note from './components/Note'
import noteServices from './services/notes'
import Notification from './components/Notification'

const App = () => {
  const [points, setPoints] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened')

  useEffect(() => {
    noteServices.getAll().then((intialNotes) => {
      setPoints(intialNotes)
    })
  }, [])

  function addNote(event) {
    event.preventDefault()
    const newObj = {
      content: newNote,
      important: Math.random() > 0.5,
      id: `${points.length + 1}`,
    }

    noteServices.create(newObj).then((note) => {
      setPoints(points.concat(note))
      setNewNote('')
    })
  }

  const toggleImportanceOf = (id) => {
    const note = points.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteServices
      .update(id, changedNote)
      .then((updatedNote) => {
        setPoints(points.map((note) => (note.id !== id ? note : updatedNote)))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`,
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPoints(points.filter((n) => n.id !== id))
      })
  }

  const notesToShow = showAll
    ? points
    : points.filter((note) => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((item) => {
          return (
            <Note
              key={item.id}
              note={item}
              toggleImportance={() => toggleImportanceOf(item.id)}
            />
          )
        })}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button>save</button>
      </form>

      <Footer />
    </div>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2024
      </em>
    </div>
  )
}

export default App
