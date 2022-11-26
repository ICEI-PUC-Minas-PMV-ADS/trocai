package com.example.trocai.repositories;

import com.example.trocai.models.Funcionario;
import com.example.trocai.models.PedidoDeTroca;
import com.example.trocai.models.Status;

import java.util.List;

public interface CustomPedidoDeTrocaRepository {

     List<PedidoDeTroca> findAllByToFuncionarioAndStatus(Funcionario funcionario, Status status);

}
