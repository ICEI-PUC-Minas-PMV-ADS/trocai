package com.example.trocai.models;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@Data
@Document
public class EscalaMensal {

    protected int ano;
    protected int mes;
    protected List<LocalDate> diasDoMes;
    protected List<Dia> diasDeTrabalho;
    protected List<Dia> diasLivres;

    public EscalaMensal(int ano, int mes) {
        this.ano = ano;
        this.mes = mes;
        this.diasDoMes = this.getDiasDoMes();
        this.diasDeTrabalho = this.getDiasDeTrabalho();
        this.diasLivres = this.getDiasLivres();
    }


    private List<LocalDate> getDiasDoMes() {
        int cont = 1;
        List<LocalDate> listaDeDias = new ArrayList<>();
        while (cont <= Month.of(this.mes).maxLength()) {
            LocalDate hoje = LocalDate.of(ano, mes, cont);
            listaDeDias.add(hoje);
            cont++;
        }
        return listaDeDias;
    }

    private List<Dia> getDiasDeTrabalho(){
        List<Dia> diasDeTrabalho = new ArrayList<>();
        this.diasDoMes.stream().
                filter(d -> d.getDayOfWeek() != DayOfWeek.SUNDAY | d.getDayOfWeek() != DayOfWeek.SUNDAY)
                .forEach(d-> diasDeTrabalho.add(new Dia(d, false)));

        return diasDeTrabalho;
    }

    private List<Dia> getDiasLivres() {
        List<Dia> diasLivres = new ArrayList<>();
        this.diasDoMes.stream().
                filter(d -> d.getDayOfWeek() == DayOfWeek.SUNDAY | d.getDayOfWeek() == DayOfWeek.SUNDAY)
                .forEach(d-> diasLivres.add(new Dia(d, true)));
        return diasLivres;
    }

}

