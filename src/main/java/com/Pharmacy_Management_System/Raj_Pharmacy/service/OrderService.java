package com.Pharmacy_Management_System.Raj_Pharmacy.service;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.Order;
import com.Pharmacy_Management_System.Raj_Pharmacy.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    /*List<Order> orders = new ArrayList<>(Arrays.asList(
            new Order(101,"Penadol",100),
            new Order(102,"Asprine",1600),
            new Order(103,"Digene",1200)));
     */

    public List<Order> getOrders(){
        return orderRepository.findAll();
    }

    public Order getOrderById(int OrderId) {
        return orderRepository.findById(OrderId).orElse(new Order());
    }

    public void addOrder(Order order){
        orderRepository.save(order);
    }

    public void updateOrder(Order order){
        orderRepository.save(order);
    }

    public void deleteOrder(int orderId) {
        orderRepository.deleteById(orderId);
    }
}