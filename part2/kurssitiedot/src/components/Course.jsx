const Header = ({ course }) => {
  const { name } = course;
  return <h2>{name}</h2>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce(function (sum, part) {
    return sum + part.exercises;
  }, 0);
  return <h3>Total of exercises {total}</h3>;
};

const Course = ({ course }) => {
  const { parts } = course;
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default Course;
