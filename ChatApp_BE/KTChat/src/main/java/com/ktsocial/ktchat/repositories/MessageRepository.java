package com.ktsocial.ktchat.repositories;

import com.ktsocial.ktchat.dtos.GetMessageDto;
import com.ktsocial.ktchat.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("select new com.ktsocial.ktchat.dtos." +
            "GetMessageDto(m.messageId, m.sender.userId, m.receiver.userId, m.messageContent, m.time) " +
            "from Message m where " +
            "m.sender.userId in (:senderId, :receiverId) and " +
            "m.receiver.userId in (:senderId, :receiverId) order by m.time desc")
    List<GetMessageDto> findBySenderIdAndReceiverIdOrderByTimeDesc(Long senderId, Long receiverId);
}
