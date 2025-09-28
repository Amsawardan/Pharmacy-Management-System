package com.Pharmacy_Management_System.Raj_Pharmacy.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name = "orders")
public class Order {

    @Id
    private int orderId;
    private String orderName;
    private int orderVal;
    private int orderQuantity;

    public Order() {
    }

    public Order(int orderId, String orderName, int orderVal, int orderQuantity) {
        this.orderId = orderId;
        this.orderName = orderName;
        this.orderVal = orderVal;
        this.orderQuantity = orderQuantity;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public String getOrderName() {
        return orderName;
    }

    public void setOrderName(String orderName) {
        this.orderName = orderName;
    }

    public int getOrderVal() {
        return orderVal;
    }

    public void setOrderVal(int orderVal) {
        this.orderVal = orderVal;
    }

    public int getOrderQuantity() {
        return orderQuantity;
    }

    public void setOrderQuantity(int orderQuantity) {
        this.orderQuantity = orderQuantity;
    }
}