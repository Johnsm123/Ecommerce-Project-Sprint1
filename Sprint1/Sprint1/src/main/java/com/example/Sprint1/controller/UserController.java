
package com.example.Sprint1.controller;

import com.example.Sprint1.model.User;
import com.example.Sprint1.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        return ResponseEntity.ok(user);
    }
}
