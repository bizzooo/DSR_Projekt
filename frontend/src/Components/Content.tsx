import CalorieCalculator from './CalorieCalculator';
import UsersList from './UsersList';

function Content() {
  return (
    <div className="flex h-screen flex-row justify-center bg-gym-pattern bg-center">
      <div className="flex w-64 justify-center bg-opacity-80 bg-slate-200 hover:bg-opacity-100 transform duration-300">
        <CalorieCalculator />
      </div>
      <div className="flex w-4/12 justify-center bg-slate-200 bg-opacity-80 hover:bg-opacity-100 transform duration-300">
        <div>
          <UsersList />
        </div>
      </div>
      <div className="flex w-64 justify-center bg-slate-200 bg-opacity-80 hover:bg-opacity-100 transform duration-300">
        <h1>Content</h1>
      </div>
    </div>
  );
}

export default Content;
