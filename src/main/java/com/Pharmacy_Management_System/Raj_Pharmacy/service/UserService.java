package com.Pharmacy_Management_System.Raj_Pharmacy.service;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.User;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserService {
    List<User>users;

    public UserService() {
        users = Arrays.asList(
                new User(001, "Nadhir", "nadhir1@gmail.com", "1234"),
                 new User(002, "Amsan", "amsan2@gmail.com", "5678"));
    }

    public List<User> getUser(){
        return  users;
    }
}
