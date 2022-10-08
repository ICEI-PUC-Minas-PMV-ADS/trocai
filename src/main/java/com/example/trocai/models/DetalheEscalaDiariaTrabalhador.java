package com.example.trocai.models;

import lombok.Data;

@Data
public class DetalheEscalaDiariaTrabalhador extends DetalheEscalaDiaria {

    private Boolean manhaLivre;
    private Boolean tardeLivre;
    private Boolean noiteLivre;

}
