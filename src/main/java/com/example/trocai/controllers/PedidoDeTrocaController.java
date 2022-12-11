package com.example.trocai.controllers;

import com.example.trocai.auth.JwtTokenUtil;
import com.example.trocai.dto.PedidoDeTrocaDTO;
import com.example.trocai.dto.SolicitacaoDeTrocaDTO;
import com.example.trocai.models.PedidoDeTroca;
import com.example.trocai.models.Status;
import com.example.trocai.services.PedidoDeTrocaService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //TODO - isso vai alterar o status de pending para rejected ou accepted e disparar o workflow de atualilzação de escalas para os envolvidos
    @PostMapping("/{trocaId}/response")
    public ResponseEntity<String> replyPedidoDeTroca(
//            @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @PathVariable("trocaId") String id,
            @RequestBody String res) {

        Boolean resposta = res.contains("true");
        PedidoDeTroca pedido = pedidoDeTrocaService.encontrarPorId(id);

        //TODO - validar que somente funcionarioTo/solicitado possam responder a swap request

        //      if (jwtTokenUtil.getUsernameFromToken(token).contains(pedido.getToFuncionario().getEmail())) {
        String msg = pedidoDeTrocaService.responderPedidoTroca(id, resposta);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(msg);
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Somente funcionários solicitados podem responder a um pedido de Troca");
//        }

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
