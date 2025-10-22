                                                     //load some random data for data blase

package com.Pharmacy_Management_System.Raj_Pharmacy.service;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.Medicine;
import com.Pharmacy_Management_System.Raj_Pharmacy.repository.MedicineRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Optional;

@Component
public class DataLoader implements CommandLineRunner {

    private final MedicineRepository medicineRepository;

    public DataLoader(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Data initialization disabled - starting with empty medicine table
        // Uncomment the lines below if you want to load sample medicine data
        /*
        addOrUpdateMedicine("Ibuprofen", "Painkiller", "IB1234", 200, 5.75, 2, 15L,
                "Used for pain relief and inflammation reduction.",
                "Take 200-400 mg every 4-6 hours as needed. Do not exceed 1200 mg per day.",
                "Possible side effects: stomach pain, nausea, dizziness.");

        addOrUpdateMedicine("Amoxicillin", "Antibiotic", "AM5678", 150, 12.00, 3, 20L,
                "Used to treat bacterial infections.",
                "Take 250-500 mg every 8 hours. Follow full course prescribed by doctor.",
                "Possible side effects: diarrhea, allergic reactions, rash.");

        addOrUpdateMedicine("Aspirin", "Blood Thinner", "AS9101", 100, 8.50, 1, 12L,
                "Used to reduce pain, fever, or inflammation; also prevents blood clots.",
                "Take 75-325 mg daily as directed by doctor.",
                "Possible side effects: stomach upset, bleeding risk.");

        addOrUpdateMedicine("Panadol", "Painkiller", "PA1122", 250, 3.00, 4, 18L,
                "Used to reduce fever and relieve mild to moderate pain.",
                "Take 500 mg every 4-6 hours. Do not exceed 4 grams per day.",
                "Possible side effects: allergic reactions, rash.");

        addOrUpdateMedicine("Paracetamol", "Painkiller", "PA3344", 300, 2.50, 3, 25L,
                "Used to reduce fever and relieve mild to moderate pain.",
                "Take 500 mg every 4-6 hours as needed. Do not exceed 4 grams per day.",
                "Side effects may include allergic reactions such as rash, itching, or swelling.");

        System.out.println("Mock medicines added/updated.");
        */
    }

    private void addOrUpdateMedicine(String name, String category, String batchNo,
                                     int stock, double price, int expiryYears, Long supplierId,
                                     String description, String dosage, String sideEffects) {

        // Check if medicine already exists using batchNo
        Optional<Medicine> existingMed = medicineRepository.findAll().stream()
                .filter(m -> batchNo.equals(m.getBatchNo()))
                .findFirst();

        Medicine med;
        if (existingMed.isPresent()) {
            med = existingMed.get();
            System.out.println("Updating medicine with batch " + batchNo);
        } else {
            med = new Medicine();
            System.out.println("Creating medicine with batch " + batchNo);
        }

        med.setName(name);
        med.setCategory(category);
        med.setBatchNo(batchNo);
        med.setQuantity(stock);
        med.setPrice(price);
        med.setExpiryDate(LocalDate.now().plusYears(expiryYears));
        med.setDescription(description);
        med.setManufacturer("Generic Manufacturer");
        med.setMinStockLevel(50); // Set a default minimum stock level

        medicineRepository.save(med);
    }
}
