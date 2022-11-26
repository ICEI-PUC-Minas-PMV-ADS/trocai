package com.example.trocai.repositories.impl;

import com.example.trocai.models.Funcionario;
import com.example.trocai.models.PedidoDeTroca;
import com.example.trocai.models.Status;
import com.example.trocai.repositories.CustomPedidoDeTrocaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CustomPedidoDeTrocaRepositoryImpl implements CustomPedidoDeTrocaRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public List<PedidoDeTroca> findAllByToFuncionarioAndStatus(Funcionario funcionario, Status status) {
        Query query = new Query();
        query.addCriteria(Criteria.where("toFuncionario").is(funcionario));
        query.addCriteria(Criteria.where("status").is(status));
        List<PedidoDeTroca> pedidos = mongoTemplate.find(query, PedidoDeTroca.class);
        return pedidos;
    }
}
