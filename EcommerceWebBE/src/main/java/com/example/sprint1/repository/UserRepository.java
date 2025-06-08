
package com.premiumcorner.premiumcorner.repository;

import com.premiumcorner.premiumcorner.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}