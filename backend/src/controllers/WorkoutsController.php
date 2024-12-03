<?php
require_once __DIR__ . '/../models/Workout.php';

class WorkoutsController {
    private $workoutModel;

    public function __construct($pdo) {
        $this->workoutModel = new Workout($pdo);
    }

    public function getWorkouts() {
        return $this->workoutModel->getAll();
    }

    public function getWorkout($id) {
        return $this->workoutModel->getById($id);
    }

    public function addWorkout($data) {
        return $this->workoutModel->create($data);
    }

    public function updateWorkout($id, $data) {
        return $this->workoutModel->update($id, $data);
    }

    public function deleteWorkout($id) {
        return $this->workoutModel->delete($id);
    }
}
?>