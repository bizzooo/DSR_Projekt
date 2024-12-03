import { div } from 'motion/react-client';
import { useState } from 'react';

function CalorieCalculator() {
     const [weight, setWeight] = useState('');
     const [height, setHeight] = useState('');
     const [sex, setSex] = useState('');
     const [age, setAge] = useState('');
     const [activityLevel, setActivityLevel] = useState('sedentary');
     const [calories, setCalories] = useState<number | null>(null);

     const calculateCalories = () => {
          const weightNum = parseFloat(weight);
          const heightNum = parseFloat(height);
          const ageNum = parseInt(age);
      
          if (isNaN(weightNum) || isNaN(heightNum) || isNaN(ageNum) || !sex || !activityLevel) {
            alert('Please fill in all fields correctly.');
            return;
          }
      
          let bmr: number;
          if (sex === 'male') {
            bmr = 88.362 + (13.397 * weightNum) + (4.799 * heightNum) - (5.677 * ageNum);
          } else {
            bmr = 447.593 + (9.247 * weightNum) + (3.098 * heightNum) - (4.330 * ageNum);
          }
      
          let activityMultiplier: number;
          switch (activityLevel) {
            case 'sedentary':
              activityMultiplier = 1.2;
              break;
            case 'light':
              activityMultiplier = 1.375;
              break;
            case 'moderate':
              activityMultiplier = 1.55;
              break;
            case 'active':
              activityMultiplier = 1.725;
              break;
            case 'very-active':
              activityMultiplier = 1.9;
              break;
            default:
              activityMultiplier = 1;
          }
      
          const totalCalories = bmr * activityMultiplier;
          setCalories(totalCalories);
        };

  return (
    <div className="m-2 mt-2 flex w-full flex-col opacity-100 bg-slate-100 p-2 rounded-xl border-2 border-slate-300 mb-auto">
      <h1>Calorie Calculator</h1>
      <div className='flex mt-2 flex-col border-b-2 border-slate-300 pb-3'>
        <label htmlFor="weight" className='mb-1'>Weight</label>
        <input className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder='Weight'
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          />
      </div>
      <div className='flex flex-col mt-2 border-b-2 border-slate-300 pb-3'>
        <label htmlFor="height" className='mb-1'>Height</label>
        <input
          className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          type="text" 
          placeholder='Height' 
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          />
      </div>
      <div className="flex flex-col mt-2 border-b-2 border-slate-300 pb-3">
        <label htmlFor="sex" className='mb-1'>Gender</label>
        <div className="flex flex-col ">
          <div className='flex flex-row'>
               <h1 className='mr-6'>Male</h1>
               <input
              type="radio"
              name='sex'
              value="male"
              checked={sex === 'male'}
              onChange={(e) => setSex(e.target.value)}
            />
          </div>
          <div className='flex flex-row'>
               <h1 className='mr-2'>Female</h1>
               <input
              type="radio"
              name='sex'
              value="female"
              checked={sex === 'female'}
              onChange={(e) => setSex(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col mt-2 border-b-2 border-slate-300 pb-3'>
        <label htmlFor="age" className='mb-1'>Age</label>
        <input 
        className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="text" 
        placeholder="Age" 
        value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div className='flex flex-col mt-2 border-b-2 border-slate-300 pb-3'>
      <label className='mb-1'>Activity level</label>
      <select
          className='shadow border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
        >
        <option value="sedentary">Sedentary</option>
        <option value="light">Light</option>
        <option value="moderate">Moderate</option>
        <option value="active">Active</option>
        <option value="very-active">Very Active</option>
      </select>
      </div>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={calculateCalories}
      >
        Calculate
      </button>
      {calories !== null && (
        <div className="mt-4 p-2 bg-yellow-500 text-white rounded-lg mb-1">
          <h2>Estimated Daily Calories: {calories.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}

export default CalorieCalculator;
