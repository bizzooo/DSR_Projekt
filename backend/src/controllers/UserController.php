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
    public function register($data) {
        return $this->userModel->register($data);
    }

    public function login($data) {
        return $this->userModel->login($data['email'], $data['password']);
    }
}
?>