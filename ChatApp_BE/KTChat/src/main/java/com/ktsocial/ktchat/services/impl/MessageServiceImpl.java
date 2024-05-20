package com.ktsocial.ktchat.services.impl;

import com.ktsocial.ktchat.dtos.AddMessageDto;
import com.ktsocial.ktchat.dtos.GetMessageDto;
import com.ktsocial.ktchat.entities.Message;
import com.ktsocial.ktchat.entities.User;
import com.ktsocial.ktchat.repositories.MessageRepository;
import com.ktsocial.ktchat.repositories.UserRepository;
import com.ktsocial.ktchat.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<GetMessageDto> getMessagesBySenderIdAndReceiverId(Long senderId, Long receiverId) {
        return messageRepository.findBySenderIdAndReceiverIdOrderByTimeDesc(senderId, receiverId);
    }

    @Override
    public GetMessageDto addMessage(AddMessageDto addMessageDto) {
        Message message = new Message();
        User sender = userRepository.findByUserId(addMessageDto.senderId);
        User receiver = userRepository.findByUserId(addMessageDto.receiverId);

        message.setSender(sender);
        message.setReceiver(receiver);
        message.setMessageContent(addMessageDto.messageContent);
        message.setTime(new Timestamp(new Date().getTime()));
        Message newMessage = messageRepository.save(message);
        return new GetMessageDto(newMessage.getMessageId(),
                newMessage.getSender().getUserId(), newMessage.getReceiver().getUserId(),
                newMessage.getMessageContent(), newMessage.getTime());
    }
}
