<?php
require_once __DIR__ . '/../models/Food.php';

class FoodsController {
    private $foodModel;

    public function __construct($pdo) {
        $this->foodModel = new Food($pdo);
    }

    public function getFoods() {
        return $this->foodModel->getAll();
    }

    public function getFood($id) {
        return $this->foodModel->getById($id);
    }

    public function addFood($data) {
        return $this->foodModel->create($data);
    }

    public function updateFood($id, $data) {
        return $this->foodModel->update($id, $data);
    }

    public function deleteFood($id) {
        return $this->foodModel->delete($id);
    }
}
?>