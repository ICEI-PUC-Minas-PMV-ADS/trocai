package com.example.trocai.controllers;

import com.example.trocai.models.PedidoDeTroca;
import com.example.trocai.services.PedidoDeTrocaService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public PedidoDeTroca createPedidoDeTroca(@RequestBody PedidoDeTroca pedido) {
        return pedidoDeTrocaService.createPedidoDeTroca(pedido);
    }


}
