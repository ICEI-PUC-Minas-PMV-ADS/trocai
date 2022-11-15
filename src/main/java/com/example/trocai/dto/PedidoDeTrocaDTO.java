package com.example.trocai.dto;

import com.example.trocai.models.Status;
import com.example.trocai.models.Turno;
import lombok.Data;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.Serializable;
import java.time.LocalDate;

@Data
public class PedidoDeTrocaDTO implements Serializable  {

    private Long id;

    private Long idFuncionarioSolicitante;

    private Long idFuncionarioSolicitado;
    private Status status = Status.PENDING;
    private LocalDate dataDaTroca;
    private Turno turnoDaTroca;


    public PedidoDeTrocaDTO(Long idFuncionarioSolicitante, Long idFuncionarioSolicitado, LocalDate dataDaTroca, Turno turnoDaTroca) {
        this.idFuncionarioSolicitante = idFuncionarioSolicitante;
        this.idFuncionarioSolicitado = idFuncionarioSolicitado;
        this.dataDaTroca = dataDaTroca;
        this.turnoDaTroca = turnoDaTroca;
    }
}
