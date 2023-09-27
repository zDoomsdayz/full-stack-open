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
  let total = 0;
  for (let i = 0; i < parts.length; i++) {
    total += parts[i].exercises;
  }
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
