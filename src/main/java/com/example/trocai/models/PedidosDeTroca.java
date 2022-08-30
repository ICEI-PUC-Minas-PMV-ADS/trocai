package com.example.trocai.models;

import lombok.Data;

@Data
public class PedidosDeTroca {
    Funcionario fromFuncionario;
    Funcionario toFuncionario;
    int dia;
    int mes;
    Turno turno;

}
