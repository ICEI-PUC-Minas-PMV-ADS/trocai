package com.example.trocai.repositories;

import com.example.trocai.models.Funcionario;
import com.example.trocai.models.Turno;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface FuncionarioRepository
        extends MongoRepository<Funcionario, Integer> {

    Optional<Funcionario> findFuncionarioByEmail(String email);

    List<Funcionario> findFuncionariosByTurnoPrincipal(Turno turno);

    Optional<Funcionario> findFuncionarioById(Long id);

    @Query(value = "{'funcionarios.escalaMensal.diasDeTrabalho.dia': ?0, 'funcionarios.escalaMensal.diasDeTrabalho.dia.turnosOcupados': {$nin: ?1}}")
    List<Funcionario> findFuncionariosByTurnoLivreAndDate(LocalDate date, Turno turno);

}
