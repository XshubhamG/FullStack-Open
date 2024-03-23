import Course from "./components/Course";
import { courses } from "./data";
const App = () => {
  return (
    <main>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </main>
  );
};

export default App;
