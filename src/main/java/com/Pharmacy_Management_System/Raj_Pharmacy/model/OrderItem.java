package com.Pharmacy_Management_System.Raj_Pharmacy.model;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String medicineName;
    private int price;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    public OrderItem() {}

    public OrderItem(String medicineName, int price, int quantity) {
        this.medicineName = medicineName;
        this.price = price;
        this.quantity = quantity;
    }

    // Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getMedicineName() { return medicineName; }
    public void setMedicineName(String medicineName) { this.medicineName = medicineName; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
}