package com.Pharmacy_Management_System.Raj_Pharmacy.model;

import org.springframework.stereotype.Component;

@Component
public class Order {

    private int orderId;
    private String orderName;
    private int orderVal;

    public Order() {
    }

    public Order(int orderId, String orderName, int orderVal) {
        this.orderId = orderId;
        this.orderName = orderName;
        this.orderVal = orderVal;
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
}