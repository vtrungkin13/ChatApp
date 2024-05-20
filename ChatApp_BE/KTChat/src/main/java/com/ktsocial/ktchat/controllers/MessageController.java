package com.ktsocial.ktchat.controllers;

import com.ktsocial.ktchat.dtos.AddMessageDto;
import com.ktsocial.ktchat.dtos.GetMessageDto;
import com.ktsocial.ktchat.entities.Message;
import com.ktsocial.ktchat.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/get-messages/{senderId}/{receiverId}")
    public ResponseEntity<List<GetMessageDto>> getMessages(@PathVariable Long senderId, @PathVariable Long receiverId) {
        List<GetMessageDto> receivedMessages = messageService.getMessagesBySenderIdAndReceiverId(senderId, receiverId);
        return new ResponseEntity<>(receivedMessages, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<GetMessageDto> addMessage(@RequestBody AddMessageDto addMessageDto) {
        GetMessageDto message = messageService.addMessage(addMessageDto);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }
}
