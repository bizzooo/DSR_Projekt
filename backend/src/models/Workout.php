<?php
class Workout {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM Workouts");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM Workouts WHERE idWorkouts = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->pdo->prepare("INSERT INTO Workouts (name, calories_per_hour, type, duration, description) VALUES (?, ?, ?, ?, ?)");
        return $stmt->execute([$data['name'], $data['calories_per_hour'], $data['type'], $data['duration'], $data['description']]);
    }

    public function update($id, $data) {
        $stmt = $this->pdo->prepare("UPDATE Workouts SET name = ?, calories_per_hour = ?, type = ?, duration = ?, description = ? WHERE idWorkouts = ?");
        return $stmt->execute([$data['name'], $data['calories_per_hour'], $data['type'], $data['duration'], $data['description'], $id]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM Workouts WHERE idWorkouts = ?");
        return $stmt->execute([$id]);
    }
}
?>