package com.ktsocial.ktchat.services.impl;

import com.ktsocial.ktchat.dtos.AddUserDto;
import com.ktsocial.ktchat.dtos.LoginDto;
import com.ktsocial.ktchat.entities.User;
import com.ktsocial.ktchat.exceptions.KTSocialException;
import com.ktsocial.ktchat.repositories.UserRepository;
import com.ktsocial.ktchat.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public User getUserById(Long id) {
        return userRepository.findByUserId(id);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<User> getAllUsersExceptCurrentUser(Long currentUserId) {
        return userRepository.findAllByUserIdIsNot(currentUserId);
    }

    @Override
    public User addUser(AddUserDto addUserDto) {
        String username = addUserDto.username;
        String email = addUserDto.email;
        if (userRepository.existsByUsername(username)) {
            throw new KTSocialException("Username is existed!");
        }
        if (userRepository.existsByEmail(email)) {
            throw new KTSocialException("Email is existed!");
        }
//        User user = modelMapper.map(addUserDto, User.class);
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setName(addUserDto.name);
        user.setPassword(addUserDto.password);
        return userRepository.save(user);
    }

    @Override
    public User login(LoginDto loginDto) {
        String username = loginDto.username;
        String password = loginDto.password;
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new KTSocialException("User is not existed!");
        }
        if (!user.getPassword().equals(password)) {
            throw new KTSocialException("Password is not correct!");
        }
        return user;
    }
}
