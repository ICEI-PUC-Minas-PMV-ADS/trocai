package com.example.trocai.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class FuncionarioDTO  implements Serializable {

    private static final long serialVersionUID = -6384916793805723369L;


    private Long id;

    private String nome;
    private String email;
    private String senha;

    public FuncionarioDTO() {
    }

    public FuncionarioDTO(String email, String senha) {
        this.email = email;
        this.senha = senha;
    }

    public FuncionarioDTO(Long id, String nome, String email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }
}
