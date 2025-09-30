package com.Pharmacy_Management_System.Raj_Pharmacy.controller;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.Admin;
import com.Pharmacy_Management_System.Raj_Pharmacy.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin") // All endpoints will start with /admin
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Get all admins
    @GetMapping("/all")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    // Get admin by ID
    @GetMapping("/{staffID}")
    public Admin getAdminById(@PathVariable int staffID) {
        return adminService.getAdminById(staffID);
    }

    // Add new admin
    @PostMapping("/add")
    public String addAdmin(@RequestBody Admin admin) {
        adminService.addAdmin(admin);
        return "Admin added successfully!";
    }

    // Update admin
    @PutMapping("/update/{staffID}")
    public String updateAdmin(@PathVariable int staffID, @RequestBody Admin updatedAdmin) {
        adminService.updateAdmin(staffID, updatedAdmin);
        return "Admin updated successfully!";
    }

    // Delete admin
    @DeleteMapping("/delete/{staffID}")
    public String deleteAdmin(@PathVariable int staffID) {
        adminService.deleteAdmin(staffID);
        return "Admin deleted successfully!";
    }
}
