package com.Pharmacy_Management_System.Raj_Pharmacy.service;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.Admin;
import com.Pharmacy_Management_System.Raj_Pharmacy.repository.AdminRepository;
import com.Pharmacy_Management_System.Raj_Pharmacy.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Get all admin members
    public List<Admin> getAllAdmin() {
        return adminRepository.findAll();
    }

    // Get admin by ID
    public Admin getAdminById(Integer staffID) {
        return adminRepository.findById(staffID).orElse(null);
    }

    // Get admin by username
    public Admin getAdminByUsername(String username) {
        return adminRepository.findByUsername(username).orElse(null);
    }

    // Get admin by email
    public Admin getAdminByEmail(String email) {
        return adminRepository.findByEmail(email).orElse(null);
    }

    // Add new admin member
    public Admin addAdmin(Admin admin) {
        // Set join date to current time if not provided
        if (admin.getJoinDate() == null) {
            admin.setJoinDate(LocalDateTime.now());
        }
        
        // Set last active to current time
        admin.setLastActive(LocalDateTime.now());
        
        return adminRepository.save(admin);
    }

    // Update admin member
    public Admin updateAdmin(Integer staffID, Admin updatedAdmin) {
        Optional<Admin> existingAdminOpt = adminRepository.findById(staffID);
        if (existingAdminOpt.isPresent()) {
            Admin existingAdmin = existingAdminOpt.get();
            
            // Update only the fields that are provided
            if (updatedAdmin.getFullName() != null) {
                existingAdmin.setFullName(updatedAdmin.getFullName());
            }
            if (updatedAdmin.getEmail() != null) {
                existingAdmin.setEmail(updatedAdmin.getEmail());
            }
            if (updatedAdmin.getPhone() != null) {
                existingAdmin.setPhone(updatedAdmin.getPhone());
            }
            if (updatedAdmin.getDepartment() != null) {
                existingAdmin.setDepartment(updatedAdmin.getDepartment());
            }
            if (updatedAdmin.getRole() != null) {
                existingAdmin.setRole(updatedAdmin.getRole());
            }
            if (updatedAdmin.getUsername() != null) {
                existingAdmin.setUsername(updatedAdmin.getUsername());
            }
            if (updatedAdmin.getPassword() != null && !updatedAdmin.getPassword().isEmpty()) {
                existingAdmin.setPassword(updatedAdmin.getPassword());
            }
            
            // Update last active time
            existingAdmin.setLastActive(LocalDateTime.now());
            
            return adminRepository.save(existingAdmin);
        }
        return null;
    }

    // Delete admin member
    public void deleteAdmin(Integer staffID) {
        adminRepository.deleteById(staffID);
    }

    // Search admin by term
    public List<Admin> searchAdmin(String searchTerm) {
        return adminRepository.searchAdmin(searchTerm);
    }

    // Get admin by department
    public List<Admin> getAdminByDepartment(String department) {
        return adminRepository.findByDepartment(department);
    }

    // Get admin by role
    public List<Admin> getAdminByRole(Role role) {
        return adminRepository.findByRole(role);
    }

    // Update admin last active time
    public Admin updateLastActive(Integer staffID) {
        Admin admin = getAdminById(staffID);
        if (admin != null) {
            admin.setLastActive(LocalDateTime.now());
            return adminRepository.save(admin);
        }
        return null;
    }

    // Get admin statistics
    public AdminStatistics getAdminStatistics() {
        long totalAdmin = adminRepository.count();
        
        return new AdminStatistics(totalAdmin);
    }

    // Inner class for statistics
    public static class AdminStatistics {
        private final long total;

        public AdminStatistics(long total) {
            this.total = total;
        }

        public long getTotal() { return total; }
    }
}

