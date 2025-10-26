package com.Pharmacy_Management_System.Raj_Pharmacy.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "medicines")
@Data
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String batchNo;

    @Column(nullable = false)
    private Integer stock;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private LocalDate expiryDate;

    @Column(nullable = false)
    private Long supplierId;

    @Column(nullable = false)
    private Boolean deleted = false;

    @Column(nullable = true, length = 2000)
    private String description;

    @Column(nullable = true, length = 2000)
    private String dosageInstructions;

    @Column(nullable = true, length = 2000)
    private String sideEffects;

    // Image for the medicine
    @Column(nullable = true, length = 1000)
    private String imageUrl;
}
