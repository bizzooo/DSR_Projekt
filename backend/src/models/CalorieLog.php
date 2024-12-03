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