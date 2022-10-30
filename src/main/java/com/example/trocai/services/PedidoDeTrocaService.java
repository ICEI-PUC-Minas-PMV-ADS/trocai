package com.example.trocai.services;

import com.example.trocai.dto.PedidoDeTrocaDTO;
import com.example.trocai.models.Funcionario;
import com.example.trocai.models.PedidoDeTroca;
import com.example.trocai.models.Status;
import com.example.trocai.repositories.PedidoDeTrocaRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.trocai.models.PedidoDeTroca.SEQUENCE_NAME;

@AllArgsConstructor
@Service
public class PedidoDeTrocaService {

    @Autowired
    private FuncionarioService funcionarioService;

    private SequenceGeneratorService generatorService;

    private final PedidoDeTrocaRepository pedidoDeTrocaRepository;

    public List<PedidoDeTroca> getAllPedidoDeTroca() {
        return pedidoDeTrocaRepository.findAll();
    }

    public PedidoDeTroca createPedidoDeTroca(PedidoDeTroca pedido) {
        pedido.setId(generatorService.getSequenceNumber(SEQUENCE_NAME));
        pedido.setStatus(Status.PENDING);
        funcionarioService.updatePedidosDeTrocaList(pedido);
        return pedidoDeTrocaRepository.save(pedido);
    }

    public void criarPedidoTroca(PedidoDeTrocaDTO pedidoDTO) throws Exception {
        Funcionario funcionarioSolicitante = getFuncionarioById(pedidoDTO.getIdFuncionarioSolicitante());
        Funcionario funcionarioSolicitado = getFuncionarioById(pedidoDTO.getIdFuncionarioSolicitado());

        PedidoDeTroca pedidoDeTroca = PedidoDeTroca.builder()
                .id(generatorService.getSequenceNumber(PedidoDeTroca.SEQUENCE_NAME))
                .fromFuncionario(funcionarioSolicitante)
                .toFuncionario(funcionarioSolicitado)
                .dia(pedidoDTO.getDataDaTroca())
                .turno(pedidoDTO.getTurnoDaTroca())
                .status(pedidoDTO.getStatus())
                .build();

        this.pedidoDeTrocaRepository.save(pedidoDeTroca);
    }

    private Funcionario getFuncionarioById(Long idFuncionarioSolicitante) throws Exception {
        try {
            return this.funcionarioService.findFuncionarioById(idFuncionarioSolicitante).get();
        } catch (Exception e) {
            throw new Exception("Funcionário não existe");
        }
    }

}
