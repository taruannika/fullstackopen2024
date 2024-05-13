const Header = ({ course }) => {
  const { name } = course;
  return <h1>{name}</h1>;
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

const Course = ({ course }) => {
  const { parts } = course;
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
    </div>
  );
};

export default Course;
