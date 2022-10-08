package com.example.trocai.models;

import java.time.*;


public class Dia {

    LocalDate dia;
    boolean diaLivre;

    DetalheEscalaDiaria detalhe;

    public Dia(LocalDate dia, boolean diaLivre) {
        this.dia = dia;
        this.diaLivre = diaLivre;
    }
}
