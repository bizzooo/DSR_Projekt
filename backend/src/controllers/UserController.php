<?php
require_once __DIR__ . '/../models/User.php';

class UsersController {
    private $userModel;

    public function __construct($pdo) {
        $this->userModel = new User($pdo);
    }

    public function getUsers() {
        return $this->userModel->getAll();
    }

    public function getUser($id) {
        return $this->userModel->getById($id);
    }
}
?>