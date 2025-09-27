package com.Pharmacy_Management_System.Raj_Pharmacy.service;

import com.Pharmacy_Management_System.Raj_Pharmacy.model.Order;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class OrderService {

    List<Order> orders = new ArrayList<>(Arrays.asList(
            new Order(101,"Penadol",100),
            new Order(102,"Asprine",1600),
            new Order(103,"Digene",1200)));

    public List<Order> getOrders(){
        return orders;
    }

    public Order getOrderById(int OrderId) {
        for(int i = 0; i < orders.size(); i++){
            if(orders.get(i).getOrderId() == OrderId){
                return orders.get(i);
            }
        }
        return null;
    }

    public void addOrder(Order order){
        orders.add(order);
    }

    public void updateOrder(Order order){
        int index = 0;
        for(int i = 0; i < orders.size(); i++){
            if(orders.get(i).getOrderId() == order.getOrderId())
                index = i;
        }
        orders.set(index, order);
    }
}