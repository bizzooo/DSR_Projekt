<?php
class CalorieLog {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM Calorie_log");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM Calorie_log WHERE idCalorie_log = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->pdo->prepare("INSERT INTO Calorie_log (Users_id, Foods_idFoods, calorie_intake, date_of_log) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$data['Users_id'], $data['Foods_idFoods'], $data['calorie_intake'], $data['date_of_log']]);
    }

    public function addFoodToLog($userId, $foodId, $currentDate) {
        // Step 1: Check if a calorie log exists for the user and current day
        $checkStmt = $this->pdo->prepare("SELECT idCalorie_log FROM Calorie_log WHERE Users_id = ? AND date_of_log = ?");
        $checkStmt->execute([$userId, $currentDate]);
        $log = $checkStmt->fetch(PDO::FETCH_ASSOC);
    
        if (!$log) {
            // If no log exists, create one
            $createLogStmt = $this->pdo->prepare("INSERT INTO Calorie_log (Users_id, date_of_log, calorie_intake) VALUES (?, ?, 0)");
            $createLogStmt->execute([$userId, $currentDate]);
            $logId = $this->pdo->lastInsertId();
        } else {
            $logId = $log['idCalorie_log'];
        }
    
        // Step 2: Insert the food into the junction table
        $insertFoodStmt = $this->pdo->prepare("
            INSERT INTO CalorieLog_Foods (CalorieLog_id, Foods_id)
            VALUES (?, ?)
        ");
        $insertFoodStmt->execute([$logId, $foodId]);
    
        // Step 3: Recalculate total calories for this log
        $totalCaloriesStmt = $this->pdo->prepare("
            SELECT SUM(F.calories) AS total_calories
            FROM CalorieLog_Foods CLF
            JOIN Foods F ON CLF.Foods_id = F.idFoods
            WHERE CLF.CalorieLog_id = ?
        ");
        $totalCaloriesStmt->execute([$logId]);
        $result = $totalCaloriesStmt->fetch(PDO::FETCH_ASSOC);
    
        $totalCalories = $result['total_calories'] ?? 0;
    
        // Step 4: Update the calorie intake in the Calorie_log table
        $updateLogStmt = $this->pdo->prepare("UPDATE Calorie_log SET calorie_intake = ? WHERE idCalorie_log = ?");
        return $updateLogStmt->execute([$totalCalories, $logId]);
    }

    public function getLogsByUserId($userId) {
        $query = "SELECT date_of_log, calorie_intake FROM calorie_logs WHERE user_id = :userId";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getDetailedLogsByUserId($userId) {
        $stmt = $this->pdo->prepare("
            SELECT CL.idCalorie_log, CL.date_of_log, CL.calorie_intake
            FROM Calorie_log CL
            WHERE CL.Users_id = ?
            ORDER BY CL.date_of_log DESC
        ");
        $stmt->execute([$userId]);
        $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        foreach ($logs as &$log) {
            $logId = $log['idCalorie_log'];
    
            $foodsStmt = $this->pdo->prepare("
                SELECT F.idFoods, F.name, F.calories, F.protein, F.carbs, F.fats
                FROM CalorieLog_Foods CLF
                JOIN Foods F ON CLF.Foods_id = F.idFoods
                WHERE CLF.CalorieLog_id = ?
            ");
            $foodsStmt->execute([$logId]);
            $foods = $foodsStmt->fetchAll(PDO::FETCH_ASSOC);
    
            // Ensure `foods` is always an array, even if empty
            $log['foods'] = $foods ?: [];
            $log['total_proteins'] = array_sum(array_column($foods, 'protein'));
            $log['total_carbs'] = array_sum(array_column($foods, 'carbs'));
            $log['total_fats'] = array_sum(array_column($foods, 'fats'));
        }
    
        return $logs;
    }

    public function update($id, $data) {
        $stmt = $this->pdo->prepare("UPDATE Calorie_log SET Users_id = ?, Foods_idFoods = ?, calorie_intake = ?, date_of_log = ? WHERE idCalorie_log = ?");
        return $stmt->execute([$data['Users_id'], $data['Foods_idFoods'], $data['calorie_intake'], $data['date_of_log'], $id]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM Calorie_log WHERE idCalorie_log = ?");
        return $stmt->execute([$id]);
    }
}
?>