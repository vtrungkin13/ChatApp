package com.ktsocial.ktchat.controllers;

import com.ktsocial.ktchat.dtos.GetMessageDto;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public GetMessageDto sendMessage(GetMessageDto message) {
        return message;
    }
}
