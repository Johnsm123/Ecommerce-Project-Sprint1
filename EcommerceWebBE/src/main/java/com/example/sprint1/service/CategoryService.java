
        package com.premiumcorner.premiumcorner.service;

import com.premiumcorner.premiumcorner.model.Category;
import com.premiumcorner.premiumcorner.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }
}
