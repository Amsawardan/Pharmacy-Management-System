package com.Pharmacy_Management_System.Raj_Pharmacy.controller;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.Medicine;
import com.Pharmacy_Management_System.Raj_Pharmacy.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:8082")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @PostMapping("/add")                                                  //create
    public ResponseEntity<?> addMedicine(@RequestBody Medicine medicine) {
        try {
            Medicine saved = medicineService.addMedicine(medicine);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    @GetMapping("/list")                                                 //reade full list
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        return ResponseEntity.ok(medicineService.getAllMedicines());
    }

    @GetMapping("/low-stock")                                            //reade low_stock
    public ResponseEntity<List<Medicine>> getLowStockMedicines() {
        return ResponseEntity.ok(medicineService.getLowStockMedicines());
    }

    @GetMapping("/expired")                                               //reade expired
    public ResponseEntity<List<Medicine>> getExpiredMedicines() {
        return ResponseEntity.ok(medicineService.getExpiredMedicines());
    }

    // New endpoint to fetch medicine details by id
    @GetMapping("/{id}")                                                 //reade medicine by ID
    public ResponseEntity<Medicine> getMedicineById(@PathVariable Long id) {
        Optional<Medicine> medicine = medicineService.getMedicineById(id);
        if (medicine.isPresent()) {
            return ResponseEntity.ok(medicine.get());
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @PutMapping("/update/{id}")                                           //update
    public ResponseEntity<Medicine> updateMedicine(@PathVariable Long id, @RequestBody Medicine medicine) {
        return ResponseEntity.ok(medicineService.updateMedicine(id, medicine));
    }

    @DeleteMapping("/delete/{id}")                                       //delete
    public ResponseEntity<String> deleteMedicine(@PathVariable Long id) {
        medicineService.deleteMedicine(id);
        return ResponseEntity.ok("Medicine deleted successfully");
    }
}
