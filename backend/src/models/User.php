<?php
class User {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM Users");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM Users WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->pdo->prepare("INSERT INTO Users (name, email, age, height, weight) VALUES (?, ?, ?, ?, ?)");
        return $stmt->execute([$data['name'], $data['email'], $data['age'], $data['height'], $data['weight']]);
    }

    public function update($id, $data) {
        $stmt = $this->pdo->prepare("UPDATE Users SET name = ?, email = ?, age = ?, height = ?, weight = ? WHERE id = ?");
        return $stmt->execute([$data['name'], $data['email'], $data['age'], $data['height'], $data['weight'], $id]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM Users WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
?>