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
} elseif ($route === 'get_calorie_logs' && $method === 'GET') {
    // New route for fetching calorie logs by userId
    $userId = $_GET['userId'] ?? null;

    if ($userId) {
        $stmt = $pdo->prepare("SELECT date_of_log, calorie_intake FROM Calorie_log WHERE Users_id = :userId");
        $stmt->execute(['userId' => $userId]);
        $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($logs);
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'User ID is required']);
    }
} elseif ($route === 'create_food' && $method === 'POST') {
    $controller = new FoodsController($pdo);
    $data = json_decode(file_get_contents('php://input'), true);
    if ($controller->addFood($data)) {
        echo json_encode(['message' => 'Food created successfully']);
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Failed to create food']);
    }
} elseif ($route === 'add_food_to_log' && $method === 'POST') {
    $controller = new CalorieLogsController($pdo);
    $data = json_decode(file_get_contents('php://input'), true);
    if ($controller->addFoodToLog($data)) {
        echo json_encode(['message' => 'Food added to log successfully']);
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Failed to add food to log']);
    }
} elseif ($route === 'get_detailed_logs' && $method === 'GET') {
    $controller = new CalorieLogsController($pdo);
    $userId = $_GET['userId'] ?? null;

    if ($userId) {
        $logs = $controller->getDetailedLogs($userId);
        echo json_encode($logs);
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'User ID is required']);
    }
}


if ($route === 'register' && $method === 'POST') {
    $controller = new UsersController($pdo);
    $data = json_decode(file_get_contents('php://input'), true);
    if ($controller->register($data)) {
        echo json_encode(['message' => 'Registration successful']);

        // Create calorie log for the new user
        $userId = $pdo->lastInsertId(); // Get the ID of the newly registered user
        $today = date('Y-m-d');
        $stmt = $pdo->prepare("INSERT INTO Calorie_log (Users_id, date_of_log) VALUES (:userId, :today)");
        $stmt->execute(['userId' => $userId, 'today' => $today]);
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Registration failed']);
    }
} if ($route === 'login' && $method === 'POST') {
    $controller = new UsersController($pdo);
    $data = json_decode(file_get_contents('php://input'), true);
    $user = $controller->login($data);

    if ($user) {
        echo json_encode(['message' => 'Login successful', 'user' => $user]);

        // Ensure calorie log exists for today
        $today = date('Y-m-d');
        $userId = $user['id']; // Extract user ID from the logged-in user

        // Insert a calorie log if it doesn't exist for today
        $stmt = $pdo->prepare("
            INSERT INTO Calorie_log (Users_id, date_of_log)
            SELECT :userId, :today
            WHERE NOT EXISTS (
                SELECT 1 FROM Calorie_log WHERE Users_id = :userIdCheck AND date_of_log = :todayCheck
            )
        ");
        $stmt->execute([
            'userId' => $userId,
            'today' => $today,
            'userIdCheck' => $userId,
            'todayCheck' => $today,
        ]);

    } else {
        http_response_code(401);
        echo json_encode(['message' => 'Invalid email or password']);
    }

    error_log("Executing query: INSERT INTO Calorie_log...");
    error_log(print_r(['userId' => $userId, 'today' => $today, 'userIdCheck' => $userId, 'todayCheck' => $today], true));
}
?>