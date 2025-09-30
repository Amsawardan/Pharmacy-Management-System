package com.Pharmacy_Management_System.Raj_Pharmacy.repository;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    List<Medicine> findByStockLessThanAndDeletedFalse(int stock);

    @Query("SELECT m FROM Medicine m WHERE m.expiryDate < :currentDate AND m.deleted = false")
    List<Medicine> findExpiredMedicines(LocalDate currentDate);

    List<Medicine> findByDeletedFalse();

    // <<< Add this method here >>>
    Medicine findByBatchNo(String batchNo);
}

