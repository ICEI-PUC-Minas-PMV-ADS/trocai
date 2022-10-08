package com.example.trocai.models;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class Restaurante {

    private List<Funcionario> funcionarios;
    private EscalaMensal escalaMensalRestaurante;

}
