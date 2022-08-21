package com.example.trocai.models.repositories;

import com.example.trocai.models.Funcionario;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FuncionarioRepository
        extends MongoRepository<Funcionario, String> {
}
