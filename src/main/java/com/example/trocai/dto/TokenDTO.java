package com.example.trocai.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class TokenDTO implements Serializable {

    private static final long serialVersionUID = 5848598930639358295L;

    private String username;
    private String token;

    public TokenDTO(String username, String token) {
        this.username = username;
        this.token = token;
    }
}
