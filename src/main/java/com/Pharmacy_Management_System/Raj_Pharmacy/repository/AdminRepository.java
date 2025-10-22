package com.Pharmacy_Management_System.Raj_Pharmacy.repository;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.Admin;
import com.Pharmacy_Management_System.Raj_Pharmacy.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

    // Find admin by username
    Optional<Admin> findByUsername(String username);

    // Find admin by email
    Optional<Admin> findByEmail(String email);

    // Find admin by role
    List<Admin> findByRole(Role role);

    // Find admin by department
    List<Admin> findByDepartment(String department);

    // Search admin by name, role, or department
    @Query("SELECT a FROM Admin a WHERE " +
           "LOWER(a.fullName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(a.role) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(a.department) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "CAST(a.staffID AS string) LIKE CONCAT('%', :searchTerm, '%')")
    List<Admin> searchAdmin(@Param("searchTerm") String searchTerm);

    // Count admin by department
    long countByDepartment(String department);
}

