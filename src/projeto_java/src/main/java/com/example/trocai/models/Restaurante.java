package com.example.trocai.models;

import lombok.Data;

import java.util.List;

@Data
public class Restaurante {

    private List<Funcionario> funcionarios;
    private EscalaMensalRestaurante escalaMensalRestaurante;

}
