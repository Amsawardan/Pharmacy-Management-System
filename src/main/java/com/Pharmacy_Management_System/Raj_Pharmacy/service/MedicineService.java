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

    public Medicine addMedicine(Medicine medicine) {
        medicine.setDeleted(false);
        return medicineRepository.save(medicine);
    }

    public Medicine updateMedicine(Long id, Medicine medicineDetails) {
        Optional<Medicine> optionalMedicine = medicineRepository.findById(id);
        if (optionalMedicine.isPresent()) {
            Medicine medicine = optionalMedicine.get();
            medicine.setName(medicineDetails.getName());
            medicine.setBatchNo(medicineDetails.getBatchNo());
            medicine.setStock(medicineDetails.getStock());
            medicine.setPrice(medicineDetails.getPrice());
            medicine.setExpiryDate(medicineDetails.getExpiryDate());
            medicine.setSupplierId(medicineDetails.getSupplierId());
            medicine.setDescription(medicineDetails.getDescription());  // Handle description update
            return medicineRepository.save(medicine);
        }
        throw new RuntimeException("Medicine not found with id " + id);
    }

    public void deleteMedicine(Long id) {
        Optional<Medicine> optionalMedicine = medicineRepository.findById(id);
        if (optionalMedicine.isPresent()) {
            Medicine medicine = optionalMedicine.get();
            medicine.setDeleted(true);
            medicineRepository.save(medicine);
        } else {
            throw new RuntimeException("Medicine not found with id " + id);
        }
    }

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findByDeletedFalse();
    }

    public List<Medicine> getLowStockMedicines() {
        return medicineRepository.findByStockLessThanAndDeletedFalse(5);
    }

    // Modified this method to pass LocalDate.now() to findExpiredMedicines
    public List<Medicine> getExpiredMedicines() {
        return medicineRepository.findExpiredMedicines(LocalDate.now()); // Pass the current date as argument
    }

    // New method to get medicine by id
    public Optional<Medicine> getMedicineById(Long id) {
        return medicineRepository.findById(id);
    }
}
