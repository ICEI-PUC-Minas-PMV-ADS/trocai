package com.example.trocai.models.repositories;

import com.example.trocai.models.Funcionario;
import com.example.trocai.models.Turno;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FuncionarioRepository
        extends MongoRepository<Funcionario, String> {

    Optional<Funcionario> findFuncionarioByEmail(String email);

//    List<Funcionario> getFuncionarioByTurnoLivre(LocalDate dia, Turno turno);

    @Query("{'Funcionario.turnoPrincipal': ?0}")
    List<Funcionario> getFuncionarioByTurnoPrincipal(Turno turno);
}
