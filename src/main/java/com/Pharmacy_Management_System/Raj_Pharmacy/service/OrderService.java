package com.Pharmacy_Management_System.Raj_Pharmacy.service;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.Order;
import com.Pharmacy_Management_System.Raj_Pharmacy.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(int orderId) {
        return orderRepository.findById(orderId).orElse(new Order());
    }

    public void addOrder(Order order) {
        orderRepository.save(order);
    }

    public void updateOrder(Order order) {
        orderRepository.save(order);
    }

    public void deleteOrder(int orderId) {
        orderRepository.deleteById(orderId);
    }
}