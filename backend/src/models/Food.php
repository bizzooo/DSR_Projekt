<?php
class Food {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM Foods");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM Foods WHERE idFoods = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->pdo->prepare("INSERT INTO Foods (name, calories, protein, carbs, fats) VALUES (?, ?, ?, ?, ?)");
        return $stmt->execute([$data['name'], $data['calories'], $data['protein'], $data['carbs'], $data['fats']]);
    }

    public function update($id, $data) {
        $stmt = $this->pdo->prepare("UPDATE Foods SET name = ?, calories = ?, protein = ?, carbs = ?, fats = ? WHERE idFoods = ?");
        return $stmt->execute([$data['name'], $data['calories'], $data['protein'], $data['carbs'], $data['fats'], $id]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM Foods WHERE idFoods = ?");
        return $stmt->execute([$id]);
    }
}
?>
