package com.example.trocai.models;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.*;
import java.util.HashSet;
import java.util.Set;

@Document
@Data
public class Dia {

    LocalDate dia;
    boolean diaLivre;
    Set<Turno> turnosOcupados;
    Set<Turno> turnosLivres;

    public Dia(LocalDate dia, boolean diaLivre) {
        this.dia = dia;
        this.diaLivre = diaLivre;
        this.turnosOcupados = new HashSet<>();
        this.turnosLivres = new HashSet<>();
    }
}
