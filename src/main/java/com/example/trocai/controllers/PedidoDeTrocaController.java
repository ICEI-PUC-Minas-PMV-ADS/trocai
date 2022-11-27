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

    @GetMapping("/porFuncionario/{funcionarioId}")
    public List<PedidoDeTroca> fetchPedidosDeTrocaPorEmail(@PathVariable("funcionarioId") String id) {
        return pedidoDeTrocaService.findPedidosDeTrocaPorFuncionario(Integer.valueOf(id));
    }

    @GetMapping("/porFuncionario/{funcionarioId}/enviados")
    public List<PedidoDeTroca> fetchPedidosDeTrocaEnviadosPorFuncionario(@PathVariable("funcionarioId") String id) {
        return pedidoDeTrocaService.findPedidosDeTrocaEnviadosPorFuncionario(Integer.valueOf(id));
    }

    @GetMapping("/porFuncionario/{funcionarioId}/recebidos")
    public List<PedidoDeTroca> fetchPedidosDeTrocaRecebidosPorFuncionario(@PathVariable("funcionarioId") String id) {
        return pedidoDeTrocaService.findPedidosDeTrocaRecebidosPorFuncionario(Integer.valueOf(id));
    }

    //TODO: validações que confirmem que turno e cargos são iguais. Senão, devolver resposta.
    @PostMapping
    public ResponseEntity<Void> createPedidoDeTroca(@RequestBody PedidoDeTrocaDTO pedidoDTO) {
        pedidoDeTrocaService.criarPedidoTroca(pedidoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    //TODO - isso vai alterar o status de pending para rejected ou accepted e disparar o workflow de atualilzação de escalas para os envolvidos
    @PatchMapping("/{trocaId}")
    public String replyPedidoDeTroca(@PathVariable("trocaId") String id, @RequestBody String yesOrNo) {
//        pedidoDeTrocaService.responderPedidoTroca(token);
       return "Not yet, bebê!";
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
