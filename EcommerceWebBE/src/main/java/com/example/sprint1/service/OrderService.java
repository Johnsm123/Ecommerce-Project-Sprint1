
        package com.premiumcorner.premiumcorner.service;

import com.premiumcorner.premiumcorner.model.Order;
import com.premiumcorner.premiumcorner.repository.OrderRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}
