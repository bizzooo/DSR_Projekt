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
        $stmt = $this->pdo->prepare("INSERT INTO Users (name, email, age, height, weight, password) VALUES (?, ?, ?, ?, ?)");
        return $stmt->execute([$data['name'], $data['email'], $data['age'], $data['height'], $data['weight'], $data['password']]);
    }

    public function update($id, $data) {
        $stmt = $this->pdo->prepare("UPDATE Users SET name = ?, email = ?, age = ?, height = ?, weight = ? WHERE id = ?");
        return $stmt->execute([$data['name'], $data['email'], $data['age'], $data['height'], $data['weight'], $data['password'], $id]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM Users WHERE id = ?");
        return $stmt->execute([$id]);
    }
    
    // Register a new user
    public function register($data) {
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT); // Hash the password
        $stmt = $this->pdo->prepare("INSERT INTO Users (name, email, password, age, height, weight) VALUES (?, ?, ?, ?, ?, ?)");
        return $stmt->execute([$data['name'], $data['email'], $hashedPassword, $data['age'], $data['height'], $data['weight']]);
    }

    // Verify login credentials
    public function login($email, $password) {
        $stmt = $this->pdo->prepare("SELECT * FROM Users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            unset($user['password']); // Remove password from user data
            return $user; // Return user data
        }
        return false; // Invalid credentials
    }
}
?>