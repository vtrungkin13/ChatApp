package com.ktsocial.ktchat.dtos;

import lombok.AllArgsConstructor;

import java.sql.Timestamp;

@AllArgsConstructor
public class GetMessageDto {
    public Long messageId;
    public Long senderId;
    public Long receiverId;
    public String messageContent;
    public Timestamp time;
}
