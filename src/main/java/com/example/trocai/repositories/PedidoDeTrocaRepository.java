package com.example.trocai.repositories;

import com.example.trocai.models.Funcionario;
import com.example.trocai.models.PedidoDeTroca;
import com.example.trocai.models.Status;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface PedidoDeTrocaRepository
        extends MongoRepository<PedidoDeTroca, String> {

    List<PedidoDeTroca> findAllByToFuncionarioAndStatus(Funcionario funcionario, Status status);
}
