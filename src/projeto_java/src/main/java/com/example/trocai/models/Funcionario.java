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
    @Indexed(sparse=true)
    private String email;
    private String telefone;
    private boolean isGestor;
    private EscalaMensal escalaMensal;
    private List<PedidoDeTroca> pedidosDeTroca;

    public Funcionario(String nome, String sobreNome, Turno turnoPrincipal, Cargo cargo, String email, String telefone,
                       EscalaMensal escalaMensal ) {
        this.nome = nome;
        this.sobreNome = sobreNome;
        this.nomeCompleto = nome + " " + sobreNome;
        this.turnoPrincipal = turnoPrincipal;
        this.cargo = cargo;
        this.email = email;
        this.telefone = telefone;
        this.escalaMensal = escalaMensal;

    }
}
