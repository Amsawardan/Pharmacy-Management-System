package com.Pharmacy_Management_System.Raj_Pharmacy.service;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.User;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserService {
    List<User> users;

    public UserService() {
        users = new ArrayList<>(Arrays.asList(
                new User(001, "Nadhir", "nadhir1@gmail.com", "1234","Malabe east,Malbe"),
                new User(002, "Amsan", "amsan2@gmail.com", "5678", "Malabe north,Malabe")));

    }

    public List<User> getUser() {
        return users;
    }

    public User getUserById(int id) {
        return users.stream()
                .filter(i -> i.getId() == id)
                .findFirst().get();
    }

    public void addUser(User user){
        users.add(user);
    }
}
