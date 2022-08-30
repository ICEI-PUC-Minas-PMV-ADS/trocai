package com.example.trocai.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
public class Funcionario {


    @Id
    private String id;
    private String nome;
    private String sobreNome;
    private String nomeCompleto;
    private Turno turnoPrincipal;
    private Cargo cargo;
    @Indexed(unique=true)
    private String email;
    private String telefone;
    private boolean isManager;
    private EscalaMensal horario;
    private List<PedidosDeTroca> pedidosDeTroca;

    public Funcionario(String nome, String sobreNome, String nomeCompleto, Turno turnoPrincipal, Cargo cargo, String email, String telefone, boolean isManager, EscalaMensal horario, List<PedidosDeTroca> pedidosDeTroca) {
        this.nome = nome;
        this.sobreNome = sobreNome;
        this.nomeCompleto = nomeCompleto;
        this.turnoPrincipal = turnoPrincipal;
        this.cargo = cargo;
        this.email = email;
        this.telefone = telefone;
        this.isManager = isManager;
        this.horario = horario;
        this.pedidosDeTroca = pedidosDeTroca;
    }
}
