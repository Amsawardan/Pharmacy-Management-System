package com.Pharmacy_Management_System.Raj_Pharmacy.controller;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.User;
import com.Pharmacy_Management_System.Raj_Pharmacy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserService service;

    @GetMapping(value = "/User")
    public List<User> getUsers(){
        return service.getUser();
    }

    @GetMapping("User/{id}")
    public User getUserById(@PathVariable int id){
        return service.getUserById(id);
    }

    @PostMapping("/User")
    public void adduser(@RequestBody User user){
        System.out.println(user);
        service.addUser(user);
    }
}
