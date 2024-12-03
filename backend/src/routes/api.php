<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../controllers/UserController.php';
require_once __DIR__ . '/../controllers/FoodsController.php';
require_once __DIR__ . '/../controllers/WorkoutsController.php';
require_once __DIR__ . '/../controllers/CalorieLogsController.php';
require_once __DIR__ . '/../controllers/WorkoutLogsController.php';


$method = $_SERVER['REQUEST_METHOD'];
$route = $_GET['route'] ?? null;

if ($route === 'users') {
    $controller = new UsersController($pdo);
    if ($method === 'GET') {
        echo json_encode($controller->getUsers());
    }
} elseif ($route === 'foods') {
    $controller = new FoodsController($pdo);
    if ($method === 'GET') {
        echo json_encode($controller->getFoods());
    }
} elseif ($route === 'calorie_logs') {
     $controller = new CalorieLogsController($pdo);
     if ($method === 'GET') {
         echo json_encode($controller->getLogs());
     } 
} elseif ($route === 'workouts') {
     $controller = new WorkoutsController($pdo);
     if ($method === 'GET') {
         echo json_encode($controller->getWorkouts());
     }
} elseif ($route === 'workout_logs') {
     $controller = new WorkoutLogsController($pdo);
     if ($method === 'GET') {
         echo json_encode($controller->getLogs());
     }
 }
// Add similar conditions for Workouts, CalorieLogs, WorkoutLogs
?>