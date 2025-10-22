package com.Pharmacy_Management_System.Raj_Pharmacy.repository;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    // Find medicines by category
    List<Medicine> findByCategory(String category);

    // Find medicines by manufacturer
    List<Medicine> findByManufacturer(String manufacturer);

    // Find low stock medicines (quantity <= minStockLevel)
    @Query("SELECT m FROM Medicine m WHERE m.quantity <= m.minStockLevel")
    List<Medicine> findLowStockMedicines();

    // Find expired medicines
    @Query("SELECT m FROM Medicine m WHERE m.expiryDate < :currentDate")
    List<Medicine> findExpiredMedicines(@Param("currentDate") LocalDate currentDate);

    // Find medicines expiring soon (within next 30 days)
    @Query("SELECT m FROM Medicine m WHERE m.expiryDate BETWEEN :currentDate AND :futureDate")
    List<Medicine> findMedicinesExpiringSoon(@Param("currentDate") LocalDate currentDate, 
                                           @Param("futureDate") LocalDate futureDate);

    // Search medicines by name
    @Query("SELECT m FROM Medicine m WHERE LOWER(m.name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Medicine> searchByName(@Param("searchTerm") String searchTerm);

    // Find medicines by price range
    @Query("SELECT m FROM Medicine m WHERE m.price BETWEEN :minPrice AND :maxPrice")
    List<Medicine> findByPriceRange(@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice);
}