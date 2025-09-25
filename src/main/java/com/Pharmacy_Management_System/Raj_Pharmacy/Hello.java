package com.Pharmacy_Management_System.Raj_Pharmacy;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Hello {

    @GetMapping("/")
    String Hello() {
        return "Hello!!!";
    }
}
