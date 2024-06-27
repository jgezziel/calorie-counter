type CalorieDisplayProps = {
  calories: number;
  category: string;
};
const CalorieDisplay = ({ calories, category }: CalorieDisplayProps) => {
  return (
    <>
      <p className="text-5xl font-extrabold text-white text-center leading-7">
        {calories}
        <br />
        <span className="font-medium text-xl text-purple-300">{category}</span>
      </p>
    </>
  );
};

export default CalorieDisplay;
