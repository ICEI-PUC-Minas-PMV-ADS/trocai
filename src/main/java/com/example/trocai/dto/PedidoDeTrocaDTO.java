package com.example.trocai.dto;

import com.example.trocai.models.Status;
import com.example.trocai.models.Turno;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class PedidoDeTrocaDTO implements Serializable  {

    private Long id;

    private Long idFuncionarioSolicitante;

    private Long idFuncionarioSolicitado;
    private Status status;
    private LocalDateTime dataDaTroca;
    private Turno turnoDaTroca;

}
