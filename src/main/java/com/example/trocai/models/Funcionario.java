package com.example.trocai.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude={"escalaMensal", "id", "senha"})
public class Funcionario {

    @Transient
    public static final String SEQUENCE_NAME = "funcionario_sequence";

    @Id
    private int id;
    private String nome;
    private String sobreNome;
    private String nomeCompleto;
    private Turno turnoPrincipal;
    private Cargo cargo;
    @Indexed(sparse=true)
    private String email;
    private String senha;
    private String telefone;
    private boolean isGestor;
    private EscalaMensal escalaMensal;

    @DBRef(lazy=true)
    @JsonIgnore
    private List<PedidoDeTroca> pedidosDeTroca;


    public Funcionario(String nome, String sobreNome, Turno turnoPrincipal, Cargo cargo, String email, String senha, String telefone,
                       EscalaMensal escalaMensal ) {
        this.nome = nome;
        this.sobreNome = sobreNome;
        this.nomeCompleto = nome + " " + sobreNome;
        this.turnoPrincipal = turnoPrincipal;
        this.cargo = cargo;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.escalaMensal = escalaMensal;
        this.pedidosDeTroca = new ArrayList<>();

    }

    public void addPedidoDeTroca(PedidoDeTroca pedido){
        if(!this.pedidosDeTroca.contains(pedido)){
            this.pedidosDeTroca.add(pedido);
        }
    }

}
