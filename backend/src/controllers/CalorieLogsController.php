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