package com.Pharmacy_Management_System.Raj_Pharmacy.controller;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.Order;
import com.Pharmacy_Management_System.Raj_Pharmacy.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {

    @Autowired
    OrderService orderservice;

    @GetMapping("/orders")
    public List<Order> getOrders() {
        return orderservice.getOrders();
    }

    @GetMapping("/orders/{orderId}")
    public Order getOrderById(@PathVariable int orderId) {
        return orderservice.getOrderById(orderId);
    }

    @PostMapping("/orders")
    public void addOrder(@RequestBody Order order){
        orderservice.addOrder( order);
    }
}