package com.example.trocai.models.controllers;

import com.example.trocai.models.PedidoDeTroca;
import com.example.trocai.models.services.PedidoDeTrocaService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/trocas")
@AllArgsConstructor
public class PedidoDeTrocaController {

    private final PedidoDeTrocaService pedidoDeTrocaService;

    @GetMapping
    public List<PedidoDeTroca> fetchAllPedidoDeTroca() {
        return pedidoDeTrocaService.getAllPedidoDeTroca();
    }
}
