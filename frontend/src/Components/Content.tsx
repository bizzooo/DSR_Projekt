import CalorieCalculator from './CalorieCalculator';
import { RegistrationForm } from './RegistrationForm';
import UsersList from './UsersList';

function Content() {
  return (
    <div className="flex h-screen flex-row justify-center bg-gym-pattern bg-center">
      <div className="flex w-64 justify-center bg-opacity-80 bg-slate-200">
        <CalorieCalculator />
      </div>
      <div className="flex w-4/12 justify-center bg-slate-200 bg-opacity-80">
        <div>
          <UsersList />
        </div>
      </div>
      <div className="flex w-64 justify-center bg-slate-200 bg-opacity-80">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default Content;
