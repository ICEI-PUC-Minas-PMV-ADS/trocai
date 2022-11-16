package com.example.trocai.repositories;

import com.example.trocai.models.Funcionario;
import com.example.trocai.models.PedidoDeTroca;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PedidoDeTrocaRepository
        extends MongoRepository<PedidoDeTroca, String> {

    List<PedidoDeTroca> findPedidoDeTrocaByFromFuncionario(Funcionario funcionarioFrom);

    List<PedidoDeTroca> findPedidoDeTrocaByToFuncionario(Funcionario funcionarioTo);
}

