<?php
require_once __DIR__ . '/../models/WorkoutLog.php';

class WorkoutLogsController {
    private $workoutLogModel;

    public function __construct($pdo) {
        $this->workoutLogModel = new WorkoutLog($pdo);
    }

    public function getLogs() {
        return $this->workoutLogModel->getAll();
    }

    public function getLog($id) {
        return $this->workoutLogModel->getById($id);
    }

    public function addLog($data) {
        return $this->workoutLogModel->create($data);
    }

    public function updateLog($id, $data) {
        return $this->workoutLogModel->update($id, $data);
    }

    public function deleteLog($id) {
        return $this->workoutLogModel->delete($id);
    }
}
?>