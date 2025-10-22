package com.Pharmacy_Management_System.Raj_Pharmacy.controller;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.Admin;
import com.Pharmacy_Management_System.Raj_Pharmacy.service.AdminService;
import com.Pharmacy_Management_System.Raj_Pharmacy.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:8081")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Get all staff members
    @GetMapping("/all")
    public ResponseEntity<List<Admin>> getAllAdmin() {
        return ResponseEntity.ok(adminService.getAllAdmin());
    }

    // Get staff by ID
    @GetMapping("/{staffID}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Integer staffID) {
        Admin staff = adminService.getAdminById(staffID);
        if (staff != null) {
            return ResponseEntity.ok(staff);
        }
        return ResponseEntity.notFound().build();
    }

    // Get staff by username
    @GetMapping("/username/{username}")
    public ResponseEntity<Admin> getAdminByUsername(@PathVariable String username) {
        Admin staff = adminService.getAdminByUsername(username);
        if (staff != null) {
            return ResponseEntity.ok(staff);
        }
        return ResponseEntity.notFound().build();
    }

    // Add new staff member
    @PostMapping("/add")
    public ResponseEntity<?> addAdmin(@RequestBody Admin staff) {
        try {
            Admin savedAdmin = adminService.addAdmin(staff);
            return ResponseEntity.ok(savedAdmin);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding staff: " + e.getMessage());
        }
    }

    // Update staff member
    @PutMapping("/update/{staffID}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable Integer staffID, @RequestBody Admin updatedAdmin) {
        Admin staff = adminService.updateAdmin(staffID, updatedAdmin);
        if (staff != null) {
            return ResponseEntity.ok(staff);
        }
        return ResponseEntity.notFound().build();
    }

    // Delete staff member
    @DeleteMapping("/delete/{staffID}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Integer staffID) {
        adminService.deleteAdmin(staffID);
        return ResponseEntity.ok("Admin member deleted successfully!");
    }

    // Search staff
    @GetMapping("/search")
    public ResponseEntity<List<Admin>> searchAdmin(@RequestParam String searchTerm) {
        List<Admin> staff = adminService.searchAdmin(searchTerm);
        return ResponseEntity.ok(staff);
    }

    // Get staff by department
    @GetMapping("/department/{department}")
    public ResponseEntity<List<Admin>> getAdminByDepartment(@PathVariable String department) {
        List<Admin> staff = adminService.getAdminByDepartment(department);
        return ResponseEntity.ok(staff);
    }


    // Get staff by role
    @GetMapping("/role/{role}")
    public ResponseEntity<List<Admin>> getAdminByRole(@PathVariable Role role) {
        List<Admin> staff = adminService.getAdminByRole(role);
        return ResponseEntity.ok(staff);
    }


    // Update staff last active time
    @PutMapping("/active/{staffID}")
    public ResponseEntity<Admin> updateLastActive(@PathVariable Integer staffID) {
        Admin staff = adminService.updateLastActive(staffID);
        if (staff != null) {
            return ResponseEntity.ok(staff);
        }
        return ResponseEntity.notFound().build();
    }

    // Get staff statistics
    @GetMapping("/statistics")
    public ResponseEntity<AdminService.AdminStatistics> getAdminStatistics() {
        AdminService.AdminStatistics statistics = adminService.getAdminStatistics();
        return ResponseEntity.ok(statistics);
    }

    // Test endpoint
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Admin API is working!");
    }
}
