import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

interface CalorieLog {
  date_of_log: string;
  calorie_intake: number | null;
  total_proteins: number;
  total_carbs: number;
  total_fats: number;
  foods: Food[]; // Always an array
}

interface Food {
  idFoods: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export const UserProfile = (): JSX.Element => {
  const { name } = useParams<{ name: string }>(); // Get username from route
  const [logs, setLogs] = useState<CalorieLog[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [newFood, setNewFood] = useState({ name: '', calories: 0, protein: 0, carbs: 0, fats: 0 });
  const [selectedFood, setSelectedFood] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCalorieLogs = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:8000/index.php?route=get_detailed_logs&userId=${userId}`);
      setLogs(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching calorie logs:', err);
      setError(true);
      setLoading(false);
    }
  };

  const fetchFoods = async () => {
    try {
      const response = await axios.get('http://localhost:8000/index.php?route=foods');
      setFoods(response.data);
    } catch (err) {
      console.error('Error fetching foods:', err);
    }
  };

  const createFood = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Ensure default values are 0 for protein, carbs, and fats
      const payload = {
        ...newFood,
        protein: newFood.protein || 0,
        carbs: newFood.carbs || 0,
        fats: newFood.fats || 0,
      };
      await axios.post('http://localhost:8000/index.php?route=create_food', payload);
      alert('Food created successfully');
      fetchFoods(); // Refresh the food list
    } catch (err) {
      console.error('Error creating food:', err);
    }
  };

  const addFoodToLog = async () => {
    if (selectedFood) {
      try {
        const userId = JSON.parse(sessionStorage.getItem('user') || '{}').id;
        await axios.post('http://localhost:8000/index.php?route=add_food_to_log', {
          Users_id: userId,
          Foods_id: selectedFood,
        });
        alert('Food added to today\'s log');
        fetchCalorieLogs(userId); // Refresh logs to reflect updated totals and foods
      } catch (err) {
        console.error('Error adding food to log:', err);
      }
    } else {
      alert('Please select a food to add');
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (storedUser && storedUser.id) {
      fetchCalorieLogs(storedUser.id);
      fetchFoods();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-gym-pattern bg-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Welcome, {name}!</h1>

        {loading ? (
          <div>Loading logs...</div>
        ) : error ? (
          <div>Error loading logs. Please try again later.</div>
        ) : logs.length > 0 ? (
          <div className="w-full max-w-4xl">
            {logs.map((log, index) => (
              <div key={index} className="mb-8 bg-white p-4 shadow rounded">
                <h2 className="font-bold">Date: {log.date_of_log}</h2>
                <p>Calorie Intake: {log.calorie_intake || 0} kcal</p>
                <p>Proteins: {log.total_proteins}g | Carbs: {log.total_carbs}g | Fats: {log.total_fats}g</p>
                <h3 className="mt-2 font-semibold">Foods:</h3>
                <ul>
                  {(log.foods || []).map((food, idx) => (
                    <li key={idx}>
                      {food.name} - {food.calories} kcal ({food.protein}g Protein, {food.carbs}g Carbs, {food.fats}g Fats)
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div>No calorie logs available.</div>
        )}

        <form className="w-full max-w-md mt-8" onSubmit={createFood}>
          <h3 className="font-bold mb-2 text-white">Create a New Food</h3>
          <input
            type="text"
            placeholder="Food Name"
            value={newFood.name}
            onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
            className="border rounded p-2 mb-2 w-full"
            required
          />
          <h4 className="font-bold mb-2 text-white">Calories</h4>
          <input
            type="number"
            placeholder="Calories"
            value={newFood.calories}
            onChange={(e) => setNewFood({ ...newFood, calories: +e.target.value })}
            className="border rounded p-2 mb-2 w-full"
            required
          />
          <h4 className="font-bold mb-2 text-white">Protein</h4>
          <input
            type="number"
            placeholder="Proteins"
            value={newFood.protein}
            onChange={(e) => setNewFood({ ...newFood, protein: +e.target.value })}
            className="border rounded p-2 mb-2 w-full"
          />
          <h4 className="font-bold mb-2 text-white">Carbs</h4>
          <input
            type="number"
            placeholder="Carbs"
            value={newFood.carbs}
            onChange={(e) => setNewFood({ ...newFood, carbs: +e.target.value })}
            className="border rounded p-2 mb-2 w-full"
          />
          <h4 className="font-bold mb-2 text-white">Fats</h4>
          <input
            type="number"
            placeholder="Fats"
            value={newFood.fats}
            onChange={(e) => setNewFood({ ...newFood, fats: +e.target.value })}
            className="border rounded p-2 mb-4 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Add Food
          </button>
        </form>

        <h3 className="text-lg font-bold mt-8 text-white">Available Foods</h3>
        <ul className="mt-4">
          {foods.map((food) => (
            <li key={food.idFoods} className="mb-2 text-white">
              {food.name} - {food.calories} kcal ({food.protein}g Protein, {food.carbs}g Carbs, {food.fats}g Fats)
              <button
                onClick={() => setSelectedFood(food.idFoods)}
                className="ml-2 bg-green-500 text-white p-1 rounded"
              >
                Select
              </button>
            </li>
          ))}
        </ul>

        <button onClick={addFoodToLog} className="bg-yellow-500 text-white p-2 mt-4 rounded">
          Add Selected Food to Today's Log
        </button>
      </div>
    </>
  );
};
