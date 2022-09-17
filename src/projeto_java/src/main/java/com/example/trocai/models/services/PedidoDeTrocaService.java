package com.example.trocai.models.services;

import com.example.trocai.models.PedidoDeTroca;
import com.example.trocai.models.repositories.PedidoDeTrocaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class PedidoDeTrocaService {

    private final PedidoDeTrocaRepository pedidoDeTrocaRepository;

    public List<PedidoDeTroca> getAllPedidoDeTroca() {
        return pedidoDeTrocaRepository.findAll();
    }
}
