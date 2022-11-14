package com.example.trocai.models;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.*;
import java.util.ArrayList;
import java.util.List;

@Document
@Data
public class Dia {

    LocalDate dia;
    boolean diaLivre;
    List<Turno> turnosOcupados;

    public Dia(LocalDate dia, boolean diaLivre) {
        this.dia = dia;
        this.diaLivre = diaLivre;
        this.turnosOcupados = new ArrayList<>();
    }
}
