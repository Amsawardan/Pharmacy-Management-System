package com.Pharmacy_Management_System.Raj_Pharmacy.controller;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.Admin;
import com.Pharmacy_Management_System.Raj_Pharmacy.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin") // All endpoints will start with /admin
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // ✅ Get all admins
    @GetMapping("/all")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        return ResponseEntity.ok(adminService.getAllAdmins());
    }

    // ✅ Get admin by ID
    @GetMapping("/{staffID}")
    public ResponseEntity<Admin> getAdminById(@PathVariable int staffID) {
        Admin admin = adminService.getAdminById(staffID);
        if (admin != null) {
            return ResponseEntity.ok(admin);
        }
        return ResponseEntity.notFound().build();
    }

    // ✅ Add new admin
    @PostMapping("/add")
    public ResponseEntity<Admin> addAdmin(@RequestBody Admin admin) {
        Admin savedAdmin = adminService.addAdmin(admin);
        return ResponseEntity.ok(savedAdmin);
    }

    // ✅ Update admin
    @PutMapping("/update/{staffID}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable int staffID, @RequestBody Admin updatedAdmin) {
        Admin admin = adminService.updateAdmin(staffID, updatedAdmin);
        if (admin != null) {
            return ResponseEntity.ok(admin);
        }
        return ResponseEntity.notFound().build();
    }

    // ✅ Delete admin
    @DeleteMapping("/delete/{staffID}")
    public ResponseEntity<String> deleteAdmin(@PathVariable int staffID) {
        adminService.deleteAdmin(staffID);
        return ResponseEntity.ok("Admin deleted successfully!");
    }
}
