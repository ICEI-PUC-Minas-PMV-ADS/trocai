package com.example.trocai.repositories;

import com.example.trocai.models.PedidoDeTroca;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PedidoDeTrocaRepository
        extends MongoRepository<PedidoDeTroca, String> {

}
