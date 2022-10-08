package com.example.trocai.services;

import com.example.trocai.models.PedidoDeTroca;
import com.example.trocai.repositories.PedidoDeTrocaRepository;
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
