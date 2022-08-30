package com.example.trocai.models.repositories;

import com.example.trocai.models.Funcionario;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface FuncionarioRepository
        extends MongoRepository<Funcionario, String> {

    Optional<Funcionario> findFuncionarioByEmail(String email);

}
