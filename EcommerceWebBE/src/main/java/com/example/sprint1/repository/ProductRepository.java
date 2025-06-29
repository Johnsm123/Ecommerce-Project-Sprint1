
package com.premiumcorner.premiumcorner.repository;

import com.premiumcorner.premiumcorner.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
    Page<Product> findByFeaturedTrue(Pageable pageable);
}
