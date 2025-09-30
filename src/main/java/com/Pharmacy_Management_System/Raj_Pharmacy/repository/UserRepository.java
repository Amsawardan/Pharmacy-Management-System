package com.Pharmacy_Management_System.Raj_Pharmacy.repository;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
