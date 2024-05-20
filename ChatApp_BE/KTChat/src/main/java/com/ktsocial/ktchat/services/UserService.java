package com.ktsocial.ktchat.services;

import com.ktsocial.ktchat.dtos.AddUserDto;
import com.ktsocial.ktchat.dtos.LoginDto;
import com.ktsocial.ktchat.entities.User;

import java.util.List;

public interface UserService {
    User getUserById(Long id);

    User getUserByUsername(String username);

    List<User> getAllUsersExceptCurrentUser(Long currentUserId);

    User addUser(AddUserDto addUserDto);

    User login(LoginDto loginDto);
}
