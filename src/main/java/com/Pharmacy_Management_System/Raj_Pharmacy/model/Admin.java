package com.Pharmacy_Management_System.Raj_Pharmacy.model;

import com.Pharmacy_Management_System.Raj_Pharmacy.enums.Role;
import jakarta.persistence.*;  // for JPA annotations
import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name = "admins")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID
    private Integer staffID;

    @Column(nullable = false)
    private String fullName;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)  // Store enum as String (e.g., "ADMIN")
    @Column(nullable = false)
    private Role role;

    public Admin() {}

    public Admin(int staffID, String fullName, String username, String password, Role role) {
        this.staffID = staffID;
        this.fullName = fullName;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public int getStaffID() {
        return staffID;
    }

    public void setStaffID(int staffID) {
        this.staffID = staffID;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "staffID=" + staffID +
                ", fullName='" + fullName + '\'' +
                ", username='" + username + '\'' +
                ", role=" + role +
                '}';
    }
}
