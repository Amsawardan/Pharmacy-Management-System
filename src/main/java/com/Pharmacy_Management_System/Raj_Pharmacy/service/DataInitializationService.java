package com.Pharmacy_Management_System.Raj_Pharmacy.service;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.Admin;
import com.Pharmacy_Management_System.Raj_Pharmacy.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
public class

DataInitializationService implements CommandLineRunner {

    @Autowired
    private AdminService adminService;

    @Override
    public void run(String... args) throws Exception {
        // Data initialization disabled - starting with empty staff table
        // Uncomment the lines below if you want to load sample data
        /*
        if (adminService.getAllAdmin().isEmpty()) {
            initializeSampleAdminData();
        }
        */
    }

    private void initializeSampleAdminData() {
        // Sample staff data matching the frontend UI
        List<Admin> sampleAdmin = Arrays.asList(
            new Admin(
                "Dr. Nimal Fernando",
                "nimal.fernando",
                "password123",
                Role.STAFF,
                "nimal.fernando@medistore.com",
                "077-123-4567",
                "Pharmacy",
                LocalDateTime.of(2020, 3, 15, 0, 0),
                LocalDateTime.of(2024, 9, 24, 9, 30)
            ),
            new Admin(
                "Kamani Rajapaksa",
                "kamani.rajapaksa",
                "password123",
                Role.STAFF,
                "kamani.rajapaksa@medistore.com",
                "077-234-5678",
                "Pharmacy",
                LocalDateTime.of(2021, 7, 20, 0, 0),
                LocalDateTime.of(2024, 9, 24, 8, 45)
            ),
            new Admin(
                "Ruwan Silva",
                "ruwan.silva",
                "password123",
                Role.STAFF,
                "ruwan.silva@medistore.com",
                "077-345-6789",
                "Pharmacy",
                LocalDateTime.of(2022, 1, 10, 0, 0),
                LocalDateTime.of(2024, 9, 24, 10, 15)
            ),
            new Admin(
                "Sita Wickramasinghe",
                "sita.wickramasinghe",
                "password123",
                Role.MANAGER,
                "sita.wickramasinghe@osro.lk",
                "077-456-7890",
                "Operations",
                LocalDateTime.of(2019, 11, 5, 0, 0),
                LocalDateTime.of(2024, 9, 23, 17, 30)
            ),
            new Admin(
                "Priyantha Perera",
                "priyantha.perera",
                "password123",
                Role.STAFF,
                "priyantha.perera@osro.lk",
                "077-567-8901",
                "Sales",
                LocalDateTime.of(2023, 4, 12, 0, 0),
                LocalDateTime.of(2024, 9, 24, 11, 0)
            )
        );

        // Save all sample staff
        for (Admin staff : sampleAdmin) {
            adminService.addAdmin(staff);
        }

        System.out.println("Sample staff data initialized successfully!");
    }
}
