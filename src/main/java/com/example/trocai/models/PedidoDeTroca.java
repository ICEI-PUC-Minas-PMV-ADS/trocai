package com.example.trocai.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Document(collection="trocas")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PedidoDeTroca {
    @Transient
    public static final String SEQUENCE_NAME = "pedido_sequence";


    @Id
    private int id;

    @DBRef(lazy=true)
    private Funcionario fromFuncionario;

    @DBRef(lazy=true)
    private Funcionario toFuncionario;
    private LocalDate dia;
    private Turno turno;

    private Status status;


    public PedidoDeTroca(Funcionario fromFuncionario, Funcionario toFuncionario, LocalDate dia, Turno turno) {
        this.fromFuncionario = fromFuncionario;
        this.toFuncionario = toFuncionario;
        this.dia = dia;
        this.turno = turno;

    }

}
