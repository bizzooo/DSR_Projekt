<?php
class WorkoutLog {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM Workout_log");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM Workout_log WHERE idWorkout_log = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->pdo->prepare("INSERT INTO Workout_log (Users_id, Workouts_id, date_of_workout) VALUES (?, ?, ?)");
        return $stmt->execute([$data['Users_id'], $data['Workouts_id'], $data['date_of_workout']]);
    }

    public function update($id, $data) {
        $stmt = $this->pdo->prepare("UPDATE Workout_log SET Users_id = ?, Workouts_id = ?, date_of_workout = ? WHERE idWorkout_log = ?");
        return $stmt->execute([$data['Users_id'], $data['Workouts_id'], $data['date_of_workout'], $id]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM Workout_log WHERE idWorkout_log = ?");
        return $stmt->execute([$id]);
    }
}
?>