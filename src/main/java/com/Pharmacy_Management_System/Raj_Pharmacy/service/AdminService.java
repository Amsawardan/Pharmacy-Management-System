package com.Pharmacy_Management_System.Raj_Pharmacy.service;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.Admin;
import com.Pharmacy_Management_System.Raj_Pharmacy.model.Role;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    private List<Admin> admins = new ArrayList<>();

    // Constructor with some sample data (optional)
    public AdminService() {
        admins.add(new Admin(1, "John Doe", "admin1", "password123", Role.ADMIN));
        admins.add(new Admin(2, "Jane Smith", "manager1", "managerPass", Role.MANAGER));
    }

    // Get all admins
    public List<Admin> getAllAdmins() {
        return admins;
    }

    // Get admin by ID
    public Admin getAdminById(int staffID) {
        return admins.stream()
                .filter(admin -> admin.getStaffID() == staffID)
                .findFirst()
                .orElse(null);
    }

    // Add a new admin
    public void addAdmin(Admin admin) {
        admins.add(admin);
    }

    // Update admin
    public void updateAdmin(int staffID, Admin updatedAdmin) {
        for (int i = 0; i < admins.size(); i++) {
            Admin existing = admins.get(i);
            if (existing.getStaffID() == staffID) {
                admins.set(i, updatedAdmin);
                return;
            }
        }
    }

    // Delete admin
    public void deleteAdmin(int staffID) {
        admins.removeIf(admin -> admin.getStaffID() == staffID);
    }
}

