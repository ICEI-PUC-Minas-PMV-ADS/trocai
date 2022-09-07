package com.example.trocai.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Month;
import java.time.MonthDay;
import java.time.Year;

@Data
@Document
@AllArgsConstructor
public class PedidoDeTroca {
    @Id
    private String id;
    private Funcionario fromFuncionario;
    private Funcionario toFuncionario;
    private MonthDay dia;

    private Month mes;

    private Year ano;
    private Turno turno;



    public PedidoDeTroca(Funcionario fromFuncionario, Funcionario toFuncionario, MonthDay dia, Turno turno) {
        this.fromFuncionario = fromFuncionario;
        this.toFuncionario = toFuncionario;
        this.dia = dia;
        this.turno = turno;
    }
}
