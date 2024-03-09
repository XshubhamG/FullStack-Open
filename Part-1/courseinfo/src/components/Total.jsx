const Total = ({ parts }) => {
  const [exercises1, exercises2, exercises3] = parts.map(
    (part) => part.exercises,
  )
  return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
}

export default Total
