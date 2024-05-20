package com.ktsocial.ktchat.services;

import com.ktsocial.ktchat.dtos.AddMessageDto;
import com.ktsocial.ktchat.dtos.GetMessageDto;
import com.ktsocial.ktchat.entities.Message;

import java.util.List;

public interface MessageService {
    List<GetMessageDto> getMessagesBySenderIdAndReceiverId(Long senderId, Long receiverId);

    GetMessageDto addMessage(AddMessageDto addMessageDto);
}
