package com.example.trocai.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
@AllArgsConstructor
public class Funcionario {


    @Id
    private String id;
    private String nome;
    private String sobreNome;
    private String nomeCompleto;
    private Turno turnoPrincipal;
    private Cargo cargo;

    private String email;
    private String telefone;
    private boolean isGestor;
    private EscalaMensalTrabalhador escalaMensalTrabalhador;
    private List<PedidoDeTroca> pedidoDeTroca;

    public Funcionario(String nome, String sobreNome, Turno turnoPrincipal, Cargo cargo, String email, String telefone) {
        this.nome = nome;
        this.sobreNome = sobreNome;
        this.nomeCompleto = nome + " " + sobreNome;
        this.turnoPrincipal = turnoPrincipal;
        this.cargo = cargo;
        this.email = email;
        this.telefone = telefone;

    }
}
