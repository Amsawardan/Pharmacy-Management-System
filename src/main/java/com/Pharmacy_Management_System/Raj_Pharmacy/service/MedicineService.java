package com.Pharmacy_Management_System.Raj_Pharmacy.service;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.Medicine;
import com.Pharmacy_Management_System.Raj_Pharmacy.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    // Add new medicine
    public Medicine addMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    // Get all medicines
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    // Get medicine by ID
    public Optional<Medicine> getMedicineById(Long id) {
        return medicineRepository.findById(id);
    }

    // Update medicine
    public Medicine updateMedicine(Long id, Medicine medicine) {
        if (medicineRepository.existsById(id)) {
            medicine.setId(id);
            return medicineRepository.save(medicine);
        }
        return null;
    }

    // Delete medicine
    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }

    // Get low stock medicines
    public List<Medicine> getLowStockMedicines() {
        return medicineRepository.findLowStockMedicines();
    }

    // Get expired medicines
    public List<Medicine> getExpiredMedicines() {
        return medicineRepository.findExpiredMedicines(LocalDate.now());
    }

    // Get medicines expiring soon (within 30 days)
    public List<Medicine> getMedicinesExpiringSoon() {
        LocalDate currentDate = LocalDate.now();
        LocalDate futureDate = currentDate.plusDays(30);
        return medicineRepository.findMedicinesExpiringSoon(currentDate, futureDate);
    }

    // Search medicines by name
    public List<Medicine> searchByName(String searchTerm) {
        return medicineRepository.searchByName(searchTerm);
    }

    // Get medicines by category
    public List<Medicine> getMedicinesByCategory(String category) {
        return medicineRepository.findByCategory(category);
    }

    // Get medicines by manufacturer
    public List<Medicine> getMedicinesByManufacturer(String manufacturer) {
        return medicineRepository.findByManufacturer(manufacturer);
    }

    // Get medicines by price range
    public List<Medicine> getMedicinesByPriceRange(Double minPrice, Double maxPrice) {
        return medicineRepository.findByPriceRange(minPrice, maxPrice);
    }
}