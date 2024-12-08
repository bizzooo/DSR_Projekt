import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import CalorieCalculator from './CalorieCalculator';

export const UserProfile = (): JSX.Element => {
  const { name } = useParams<{ name: string }>(); // Get username from route

  return (
    <>
      <Navbar />
      <div className="flex h-screen flex-row justify-center bg-gym-pattern bg-center">
        <div className="flex w-64 justify-center bg-opacity-80 bg-slate-200">
          <CalorieCalculator />
        </div>
        <div className="flex w-4/12 justify-center bg-slate-200 bg-opacity-80">
          <div>
            <h1>Welcome, {name}!</h1> {/* Display Username */}
          </div>
        </div>
        <div className="flex w-64 justify-center bg-slate-200 bg-opacity-80"></div>
      </div>
    </>
  );
};