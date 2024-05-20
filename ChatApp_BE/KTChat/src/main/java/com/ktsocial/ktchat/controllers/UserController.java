package com.ktsocial.ktchat.controllers;

import com.ktsocial.ktchat.dtos.AddUserDto;
import com.ktsocial.ktchat.dtos.LoginDto;
import com.ktsocial.ktchat.entities.User;
import com.ktsocial.ktchat.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{currentUserId}")
    public ResponseEntity<List<User>> getAllUsers(@PathVariable Long currentUserId) {
        List<User> users = userService.getAllUsersExceptCurrentUser(currentUserId);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/get-user/{userId}")
    public ResponseEntity<User> getUser(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody AddUserDto addUserDto) {
        User user = userService.addUser(addUserDto);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginDto loginDto) {
        User user = userService.login(loginDto);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
