package com.example.trocai.controllers;

import com.example.trocai.dto.PedidoDeTrocaDTO;
import com.example.trocai.models.PedidoDeTroca;
import com.example.trocai.services.PedidoDeTrocaService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/trocas")
@AllArgsConstructor
public class PedidoDeTrocaController {

    private final PedidoDeTrocaService pedidoDeTrocaService;

    @GetMapping
    public List<PedidoDeTroca> fetchAllPedidosDeTroca() {
        return pedidoDeTrocaService.getAllPedidosDeTroca();
    }

    @GetMapping("/funcionario")
    public List<PedidoDeTroca> fetchPedidosDeTrocaPorEmail(@RequestParam String email) throws Exception{
        return pedidoDeTrocaService.findPedidosDeTrocaPorFuncionario(email);
    }

    @GetMapping("/{funcionarioId}/enviados")
    public List<PedidoDeTroca> fetchPedidosDeTrocaEnviadosPorFuncionario(@PathVariable Integer id) throws Exception {
        return pedidoDeTrocaService.findPedidosDeTrocaEnviadosPorFuncionario(id);
    }

    @GetMapping("/{funcionarioId}/recebidos")
    public List<PedidoDeTroca> fetchPedidosDeTrocaRecebidosPorFuncionario(@PathVariable Integer id) throws Exception{
        return pedidoDeTrocaService.findPedidosDeTrocaRecebidosPorFuncionario(id);
    }

    @PostMapping
    public ResponseEntity<Void> createPedidoDeTroca(@RequestBody PedidoDeTrocaDTO pedidoDTO) throws Exception {
        pedidoDeTrocaService.criarPedidoTroca(pedidoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
