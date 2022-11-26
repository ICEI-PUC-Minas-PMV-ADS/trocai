package com.example.trocai.dto;

import com.example.trocai.models.Status;
import com.example.trocai.models.Turno;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Builder
public class PedidoDeTrocaDTO implements Serializable  {

    private Long id;

    private Long idFuncionarioSolicitante;
    private Long idFuncionarioSolicitado;
    private Status status;
    private LocalDate dataDaTroca;
    private Turno turnoDaTroca;

}
