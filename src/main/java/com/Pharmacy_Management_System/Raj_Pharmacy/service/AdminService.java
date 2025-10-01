package com.Pharmacy_Management_System.Raj_Pharmacy.service;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.Admin;
import com.Pharmacy_Management_System.Raj_Pharmacy.repository.AdminRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AdminService {

    private AdminRepository adminRepository;

    // Get all admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Get admin by ID
    public Admin getAdminById(int staffID) {
        return adminRepository.findById(staffID).orElse(null);
    }

    // Add a new admin
    public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    // Update admin
    public Admin updateAdmin(int staffID, Admin updatedAdmin) {
        if (adminRepository.existsById(staffID)) {
            updatedAdmin.setStaffID(staffID);
            return adminRepository.save(updatedAdmin);
        }
        return null; // or throw exception
    }

    // Delete admin
    public void deleteAdmin(int staffID) {
        adminRepository.deleteById(staffID);
    }
}


