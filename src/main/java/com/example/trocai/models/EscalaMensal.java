package com.example.trocai.models;

import lombok.Data;

import java.util.List;

@Data
public class EscalaMensal {
    private String mes;
    private List<DiaDeTrabalho> diasTrabalhados;
}
