
package com.premiumcorner.premiumcorner.controller;

import com.premiumcorner.premiumcorner.model.Product;
import com.premiumcorner.premiumcorner.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(ProductController.class)
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Test
    @WithMockUser
    public void testGetAllProducts() throws Exception {
        Product product = new Product();
        product.setId(1L);
        product.setName("Smartphone");
        product.setPrice(699.00);
        Page<Product> page = new PageImpl<>(Collections.singletonList(product), PageRequest.of(0, 10), 1);

        when(productService.getAllProducts(PageRequest.of(0, 10))).thenReturn(page);

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].name").value("Smartphone"));
    }
}
