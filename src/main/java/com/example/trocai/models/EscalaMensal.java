package com.example.trocai.models;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Month;
import java.util.*;

@Document
@Data
public class EscalaMensal {

    final static private Set<Turno> ALL_TURNOS = EnumSet.allOf(Turno.class);
    protected int ano;
    protected int mes;
    protected List<LocalDate> diasDoMes;
    protected List<Dia> diasDeTrabalho;
    protected List<Dia> diasLivres;

    public EscalaMensal(int ano, int mes) {
        this.ano = ano;
        this.mes = mes;
        this.diasDoMes = new ArrayList<>();
        this.diasDeTrabalho = new ArrayList<>();
        this.diasLivres = new ArrayList<>();
    }


    public void inicializarEscala(){
        this.inicializarDiasDoMes();
        this.inicializarDiasDeTrabalho();
        this.inicializarDiasLivres();

    }

    private void inicializarDiasDoMes() {
        int cont = 1;
        while (cont <= Month.of(this.mes).maxLength()) {
            LocalDate hoje = LocalDate.of(ano, mes, cont);
            this.diasDoMes.add(hoje);
            cont++;
        }

    }

    private void inicializarDiasDeTrabalho(){
        this.diasDoMes.stream().
                filter(d -> d.getDayOfWeek() != DayOfWeek.SATURDAY && d.getDayOfWeek() != DayOfWeek.SUNDAY)
                .forEach(d-> this.diasDeTrabalho.add(new Dia(d, false)));

    }

    private void inicializarDiasLivres() {
        this.diasDoMes.stream().
                filter(d -> d.getDayOfWeek() == DayOfWeek.SATURDAY || d.getDayOfWeek() == DayOfWeek.SUNDAY)
                .forEach(d-> this.diasLivres.add(new Dia(d, true)));

        this.inicializaTurnosLivresDiaLivre();

    }

    /* A partir do turno principal do funcionário, assigna turnos livres e ocupados para cada dia de trabalho */
    protected void inicializaTurnosDiasDeTrabalho(Turno turnoPrincipal) {

        this.diasDeTrabalho.forEach(dT -> dT.turnosOcupados.add(turnoPrincipal));

        Set<Turno> turnosDoDia = EnumSet.allOf(Turno.class);
        turnosDoDia.remove(turnoPrincipal);

        this.diasDeTrabalho.forEach(dT -> dT.turnosLivres.addAll(turnosDoDia));

    }

    //Inicializa turnos de dia de livre como LIVRES
    private void inicializaTurnosLivresDiaLivre(){
        this.diasLivres.forEach(dT -> dT.turnosLivres.addAll(EnumSet.allOf(Turno.class)));
    }
}

