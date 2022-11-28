package com.example.trocai.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class TokenDTO implements Serializable {

    private static final long serialVersionUID = 5848598930639358295L;

    private FuncionarioDTO user;
    private String token;

    public TokenDTO(FuncionarioDTO user, String token) {
        this.user = user;
        this.token = token;
    }
}
