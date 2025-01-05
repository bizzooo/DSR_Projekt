import CalorieCalculator from './CalorieCalculator';

function Content() {
  return (
    <div className="flex h-screen flex-row justify-center bg-gym-pattern bg-center">
      <div className="flex w-64 justify-center bg-opacity-80 bg-slate-200">
        <CalorieCalculator />
      </div>
      <div className="flex w-4/12 justify-center bg-slate-200 bg-opacity-80">
      <div className='mt-2'>
        <h2 className="text-lg font-bold mb-4">Tips for Healthy Eating</h2>
          <ul className="list-disc list-inside">
            <li>Drink plenty of water throughout the day.</li>
            <li>Incorporate fruits and vegetables into every meal.</li>
            <li>Choose whole grains over refined grains.</li>
            <li>Limit processed and high-sugar foods.</li>
            <li>Practice mindful eating and avoid overeating.</li>
          </ul>
        </div>
      </div>
      <div className="flex w-64 justify-center bg-slate-200 bg-opacity-80">
        <div className='mt-2'>
          <h2 className="text-lg font-bold mb-4">Why is Calorie Tracking Important?</h2>
            <ul className="list-disc list-inside">
              <li>
                <strong>Awareness:</strong> Helps you understand your eating habits and make informed decisions.
              </li>
              <li>
                <strong>Weight Management:</strong> Tracks calories consumed vs. calories burned to support weight loss, maintenance, or gain.
              </li>
              <li>
                <strong>Nutritional Balance:</strong> Ensures you're getting the right mix of macronutrients (proteins, carbs, fats).
              </li>
              <li>
                <strong>Improved Health:</strong> Helps prevent overeating and related conditions like obesity or diabetes.
              </li>
              <li>
                <strong>Goal Tracking:</strong> Keeps you aligned with your fitness or health objectives.
              </li>
            </ul>
        </div>
      </div>
    </div>
  );
}

export default Content;
