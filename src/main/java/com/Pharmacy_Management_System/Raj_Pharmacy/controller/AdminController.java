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
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // ✅ DTO class for login request
    public static class AdminLoginRequest {
        public String email;
        public String password;
    }

    // ✅ LOGIN endpoint (only one admin allowed)
    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody AdminLoginRequest loginRequest) {
        String adminEmail = "amsan12@gmail.com";
        String adminPassword = "amsan11";

        // Check credentials
        if (!adminEmail.equals(loginRequest.email) || !adminPassword.equals(loginRequest.password)) {
            return ResponseEntity.status(403).body("Access denied: Invalid admin credentials");
        }

        // Return dummy Admin object
        Admin admin = new Admin();
        admin.setEmail(adminEmail);
        admin.setFullName("System Admin");
        admin.setUsername("admin");
        admin.setRole(Role.ADMIN);
        admin.setDepartment("Management");
        admin.setPhone("N/A");

        return ResponseEntity.ok(admin);
    }

    // ----------------- Existing endpoints below ------------------

    @GetMapping("/all")
    public ResponseEntity<List<Admin>> getAllAdmin() {
        return ResponseEntity.ok(adminService.getAllAdmin());
    }

    @GetMapping("/{staffID}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Integer staffID) {
        Admin staff = adminService.getAdminById(staffID);
        if (staff != null) {
            return ResponseEntity.ok(staff);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<Admin> getAdminByUsername(@PathVariable String username) {
        Admin staff = adminService.getAdminByUsername(username);
        if (staff != null) {
            return ResponseEntity.ok(staff);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addAdmin(@RequestBody Admin staff) {
        try {
            Admin savedAdmin = adminService.addAdmin(staff);
            return ResponseEntity.ok(savedAdmin);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding staff: " + e.getMessage());
        }
    }

    @PutMapping("/update/{staffID}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable Integer staffID, @RequestBody Admin updatedAdmin) {
        Admin staff = adminService.updateAdmin(staffID, updatedAdmin);
        if (staff != null) {
            return ResponseEntity.ok(staff);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{staffID}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Integer staffID) {
        adminService.deleteAdmin(staffID);
        return ResponseEntity.ok("Admin member deleted successfully!");
    }

    @GetMapping("/search")
    public ResponseEntity<List<Admin>> searchAdmin(@RequestParam String searchTerm) {
        List<Admin> staff = adminService.searchAdmin(searchTerm);
        return ResponseEntity.ok(staff);
    }

    @GetMapping("/department/{department}")
    public ResponseEntity<List<Admin>> getAdminByDepartment(@PathVariable String department) {
        List<Admin> staff = adminService.getAdminByDepartment(department);
        return ResponseEntity.ok(staff);
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<Admin>> getAdminByRole(@PathVariable Role role) {
        List<Admin> staff = adminService.getAdminByRole(role);
        return ResponseEntity.ok(staff);
    }

    @PutMapping("/active/{staffID}")
    public ResponseEntity<Admin> updateLastActive(@PathVariable Integer staffID) {
        Admin staff = adminService.updateLastActive(staffID);
        if (staff != null) {
            return ResponseEntity.ok(staff);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/statistics")
    public ResponseEntity<AdminService.AdminStatistics> getAdminStatistics() {
        AdminService.AdminStatistics statistics = adminService.getAdminStatistics();
        return ResponseEntity.ok(statistics);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Admin API is working!");
    }
}
