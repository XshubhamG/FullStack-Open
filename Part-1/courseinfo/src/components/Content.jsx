import Part from './Part'

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((el, index) => (
        <Part key={index} name={el.name} exercise={el.exercises} />
      ))}
    </div>
  )
}

export default Content
