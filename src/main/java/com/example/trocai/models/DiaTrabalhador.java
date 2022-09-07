package com.example.trocai.models;

import lombok.Data;

@Data
public class DiaTrabalhador extends Dia {

    private Boolean manhaLivre;
    private Boolean tardeLivre;
    private Boolean noiteLivre;

}
