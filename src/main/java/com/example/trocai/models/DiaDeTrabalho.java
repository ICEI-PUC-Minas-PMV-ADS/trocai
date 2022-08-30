package com.example.trocai.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class DiaDeTrabalho {

    @Id
    private String id;
    private Boolean turnoManha;
    private Boolean turnoTarde;
    private Boolean turnoNoite;
    private Boolean diaLivre;
    private int dia;
    private int mes;
}
