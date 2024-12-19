<?php
require_once __DIR__ . '/../models/CalorieLog.php';

class CalorieLogsController {
    private $calorieLogModel;

    public function __construct($pdo) {
        $this->calorieLogModel = new CalorieLog($pdo);
    }

    public function getLogs() {
        return $this->calorieLogModel->getAll();
    }

    public function getLog($id) {
        return $this->calorieLogModel->getById($id);
    }

    public function getCalorieLogs($userId) {
        try {
            $calorieLog = new CalorieLog();
            $logs = $calorieLog->getLogsByUserId($userId);
            echo json_encode($logs);
        } catch (Exception $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function getDetailedLogs($userId) {
        return $this->calorieLogModel->getDetailedLogsByUserId($userId);
    }

    public function addFoodToLog($data) {
        $stmt = $this->calorieLogModel->addFoodToLog($data['Users_id'], $data['Foods_id'], date('Y-m-d'));
        return $stmt;
    }

    public function addLog($data) {
        return $this->calorieLogModel->create($data);
    }

    public function updateLog($id, $data) {
        return $this->calorieLogModel->update($id, $data);
    }

    public function deleteLog($id) {
        return $this->calorieLogModel->delete($id);
    }
}
?>