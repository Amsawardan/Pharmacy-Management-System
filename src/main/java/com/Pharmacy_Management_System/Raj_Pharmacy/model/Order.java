package com.Pharmacy_Management_System.Raj_Pharmacy.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    private String orderName;
    private int orderVal;
    private int orderQuantity;

    @Column(name = "address")
    private String address;

    @Column(name = "contact_number")
    private String contactNumber;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<OrderItem> items;

    public Order() {}

    public Order(int orderId, String orderName, int orderVal, int orderQuantity, List<OrderItem> items) {
        this.orderId = orderId;
        this.orderName = orderName;
        this.orderVal = orderVal;
        this.orderQuantity = orderQuantity;
        this.setItems(items);
    }

    public Order(int orderId, String orderName, int orderVal, int orderQuantity, List<OrderItem> items, String address, String contactNumber) {
        this.orderId = orderId;
        this.orderName = orderName;
        this.orderVal = orderVal;
        this.orderQuantity = orderQuantity;
        this.setItems(items);
        this.address = address;
        this.contactNumber = contactNumber;
    }

    // Getters and Setters
    public int getOrderId() { return orderId; }
    public void setOrderId(int orderId) { this.orderId = orderId; }

    public String getOrderName() { return orderName; }
    public void setOrderName(String orderName) { this.orderName = orderName; }

    public int getOrderVal() { return orderVal; }
    public void setOrderVal(int orderVal) { this.orderVal = orderVal; }

    public int getOrderQuantity() { return orderQuantity; }
    public void setOrderQuantity(int orderQuantity) { this.orderQuantity = orderQuantity; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) {
        this.items = items;
        if (items != null) {
            for (OrderItem item : items) {
                item.setOrder(this);
            }
        }
    }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
}