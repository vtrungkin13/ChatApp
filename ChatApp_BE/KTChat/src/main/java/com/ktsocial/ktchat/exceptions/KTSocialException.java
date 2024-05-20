package com.ktsocial.ktchat.exceptions;

import lombok.NoArgsConstructor;

import java.io.Serial;

@NoArgsConstructor
public class KTSocialException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public KTSocialException(String message) {
        super(message);
    }
}
