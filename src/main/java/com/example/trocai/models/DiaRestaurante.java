package com.example.trocai.models;

import lombok.Data;

import java.util.List;

@Data
public class DiaRestaurante extends Dia {

    private Funcionario gestorDoDia;

    private int demandaAtendente;
    private int demandaCaixa;
    private int demandaCozinheiro;
    private int demandaSupervisor;
    private List<Funcionario> atendentesEscalados;
    private List<Funcionario> cozinheirosEscalados;
    private List<Funcionario> caixasEscalados;
    private List<Funcionario> supervisoresEscalados;

}
