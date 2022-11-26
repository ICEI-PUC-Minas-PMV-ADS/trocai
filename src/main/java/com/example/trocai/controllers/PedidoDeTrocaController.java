package com.example.trocai.controllers;

import com.example.trocai.auth.JwtTokenUtil;
import com.example.trocai.dto.PedidoDeTrocaDTO;
import com.example.trocai.dto.SolicitacaoDeTrocaDTO;
import com.example.trocai.models.PedidoDeTroca;
import com.example.trocai.models.Status;
import com.example.trocai.services.PedidoDeTrocaService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/trocas")
@AllArgsConstructor
public class PedidoDeTrocaController {

    private final PedidoDeTrocaService pedidoDeTrocaService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping
    public ResponseEntity<List<PedidoDeTroca>> fetchAllPedidoDeTroca() {
        boolean isEmpty = pedidoDeTrocaService.getAllPedidoDeTroca().isEmpty();
        if (isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok().body(pedidoDeTrocaService.getAllPedidoDeTroca());
    }

    @PostMapping
    public ResponseEntity<Void> createPedidoDeTroca(@RequestBody PedidoDeTrocaDTO pedidoDTO) throws Exception {
        pedidoDeTrocaService.criarPedidoTroca(pedidoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/solicitacoes")
    public ResponseEntity<List<SolicitacaoDeTrocaDTO>> getPedidosTrocaPorFuncionarioLogado(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestParam(required = false) Status status) throws Exception {
        String emailFuncionario = this.jwtTokenUtil.getUsernameFromToken(token.replace("Bearer ", ""));
        Status statusFiltered = status != null ? status : Status.PENDING;

        List<SolicitacaoDeTrocaDTO> solicitacaoDeTrocaDTOList = this.pedidoDeTrocaService.getPedidosTrocaPorStatus(statusFiltered, emailFuncionario);

        if (solicitacaoDeTrocaDTOList.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok().body(solicitacaoDeTrocaDTOList);
    }


}
