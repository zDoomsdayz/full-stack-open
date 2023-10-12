const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ parts }) => (
  <p>
    {parts.name} {parts.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part, i) => (
      <Part parts={part} key={"id" + i} />
    ))}
  </>
);

const Total = ({ parts }) => {
  let total = parts.reduce((s, p) => (s += p.exercises), 0);
  return <p>total of {total} exercises</p>;
};

const Course = ({ course }) => (
  <div>
    <Header course="Web development curriculum" />
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;
