package com.Pharmacy_Management_System.Raj_Pharmacy.service;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.User;
import com.Pharmacy_Management_System.Raj_Pharmacy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<User> getUser() {
        return userRepository.findAll();
    }

    public User getUserById(int id) {
    return userRepository.findById(id).orElse(new User());
    }

    public void addUser(User user){
    userRepository.save(user);
    }

    public  void updateUser(User user) {
        userRepository.save(user);
    }
}
