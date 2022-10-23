package com.example.trocai.repositories;

import com.example.trocai.models.Funcionario;
import com.example.trocai.models.Turno;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface FuncionarioRepository
        extends MongoRepository<Funcionario, String> {

    Optional<Funcionario> findFuncionarioByEmail(String email);

    List<Funcionario> getFuncionarioByTurnoPrincipal(Turno turno);

}
