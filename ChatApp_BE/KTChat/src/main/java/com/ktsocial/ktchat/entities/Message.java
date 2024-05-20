package com.ktsocial.ktchat.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id", nullable = false)
    private Long messageId;

    @Column(name = "message_content", length = 3000, nullable = false)
    private String messageContent;

    @Column(name = "attachment")
    private String attachment;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "time")
    @CreationTimestamp
    private Timestamp time;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "sender", referencedColumnName = "user_id", nullable = false)
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "receiver", referencedColumnName = "user_id", nullable = false)
    private User receiver;

}
