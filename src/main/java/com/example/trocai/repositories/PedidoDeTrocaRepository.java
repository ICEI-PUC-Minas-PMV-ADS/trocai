package com.example.trocai.repositories;

import com.example.trocai.models.PedidoDeTroca;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PedidoDeTrocaRepository
        extends MongoRepository<PedidoDeTroca, String> {

    List<PedidoDeTroca> findPedidoDeTrocaByFromFuncionarioOrToFuncionario(Integer id);

    List<PedidoDeTroca> findPedidoDeTrocaByFromFuncionario(Integer id);

    List<PedidoDeTroca> findPedidoDeTrocaByToFuncionario(Integer id);
}

