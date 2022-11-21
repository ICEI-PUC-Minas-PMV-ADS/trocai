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

    @GetMapping("/porFuncionario/{funcionarioId}")
    public List<PedidoDeTroca> fetchPedidosDeTrocaPorEmail(@PathVariable("funcionarioId") String id) throws Exception {
        return pedidoDeTrocaService.findPedidosDeTrocaPorFuncionario(Integer.valueOf(id));
    }

    @GetMapping("/porFuncionario/{funcionarioId}/enviados")
    public List<PedidoDeTroca> fetchPedidosDeTrocaEnviadosPorFuncionario(@PathVariable("funcionarioId") String id) throws Exception {
        return pedidoDeTrocaService.findPedidosDeTrocaEnviadosPorFuncionario(Integer.valueOf(id));
    }

    @GetMapping("/porFuncionario/{funcionarioId}/recebidos")
    public List<PedidoDeTroca> fetchPedidosDeTrocaRecebidosPorFuncionario(@PathVariable("funcionarioId") String id) throws Exception {
        return pedidoDeTrocaService.findPedidosDeTrocaRecebidosPorFuncionario(Integer.valueOf(id));
    }

    //TODO: validações que confirmem que turno e cargos são iguais. Senão, devolver resposta.
    @PostMapping
    public ResponseEntity<Void> createPedidoDeTroca(@RequestBody PedidoDeTrocaDTO pedidoDTO) throws Exception {
        pedidoDeTrocaService.criarPedidoTroca(pedidoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    //TODO - isso vai alterar o status de pending para rejected ou accepted e disparar o workflow de atualilzação de escalas para os envolvidos
    @PatchMapping("/{trocaId}")
    public String replyPedidoDeTroca(@PathVariable("trocaId") String id, @RequestBody String yesOrNo) throws Exception {
//        pedidoDeTrocaService.responderPedidoTroca(token);
       return "Not yet, bebê!";
    }

}
