package com.example.trocai.repositories;

import com.example.trocai.models.Funcionario;
import com.example.trocai.models.Turno;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface FuncionarioRepository
        extends MongoRepository<Funcionario, Integer> {

    Optional<Funcionario> findFuncionarioByEmail(String email);

    List<Funcionario> findFuncionariosByTurnoPrincipal(Turno turno);

    Optional<Funcionario> findFuncionarioById(Integer id);

    Optional<Funcionario> findFuncionarioById(Long id);

    //Won't work!!
    @Query("{$and: [{?0: {$nin: ['escalaMensal.diasDeTrabalho.dia.turnosOcupados']}}, {'escalaMensal.diasDeTrabalho.dia': ?1}]}")
    List<Funcionario> findByTurnoLivreAndDate(Turno turno, LocalDateTime date);

}
