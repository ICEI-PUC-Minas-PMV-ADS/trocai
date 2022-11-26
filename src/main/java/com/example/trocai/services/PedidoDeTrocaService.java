package com.example.trocai.services;

import com.example.trocai.dto.FuncionarioDTO;
import com.example.trocai.dto.PedidoDeTrocaDTO;
import com.example.trocai.dto.SolicitacaoDeTrocaDTO;
import com.example.trocai.models.Funcionario;
import com.example.trocai.models.PedidoDeTroca;
import com.example.trocai.models.Status;
import com.example.trocai.repositories.CustomPedidoDeTrocaRepository;
import com.example.trocai.repositories.PedidoDeTrocaRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.example.trocai.models.PedidoDeTroca.SEQUENCE_NAME;

@AllArgsConstructor
@Service
public class PedidoDeTrocaService {

    @Autowired
    private FuncionarioService funcionarioService;

    private SequenceGeneratorService generatorService;

    private final PedidoDeTrocaRepository pedidoDeTrocaRepository;

    @Autowired
    private CustomPedidoDeTrocaRepository customPedidoDeTrocaRepository;


    public List<PedidoDeTroca> getAllPedidoDeTroca() {
        return pedidoDeTrocaRepository.findAll();
    }

    // this method createPedidoDeTroca: deprecated
    public PedidoDeTroca createPedidoDeTroca(PedidoDeTroca pedido) {
        pedido.setId(generatorService.getSequenceNumber(SEQUENCE_NAME));
        pedido.setStatus(Status.PENDING);
        funcionarioService.updatePedidosDeTrocaList(pedido);
        return pedidoDeTrocaRepository.save(pedido);
    }


    //guarda pedido e atualiza lista de pedidos de troca de cada funcionario envolvido
    public PedidoDeTroca insertPedidoDeTroca(PedidoDeTroca pedido) {
        pedido.setId(generatorService.getSequenceNumber(SEQUENCE_NAME));
        pedido.setStatus(Status.PENDING);
        funcionarioService.updatePedidosDeTrocaList(pedido);
        return pedidoDeTrocaRepository.save(pedido);
    }

    public void criarPedidoTroca(PedidoDeTrocaDTO pedidoDTO) throws Exception {
        Funcionario funcionarioSolicitante = getFuncionarioById(pedidoDTO.getIdFuncionarioSolicitante());
        Funcionario funcionarioSolicitado = getFuncionarioById(pedidoDTO.getIdFuncionarioSolicitado());
        pedidoDTO.setStatus(Status.PENDING);

        PedidoDeTroca pedidoDeTroca = PedidoDeTroca.builder()
                .id(generatorService.getSequenceNumber(PedidoDeTroca.SEQUENCE_NAME))
                .fromFuncionario(funcionarioSolicitante)
                .toFuncionario(funcionarioSolicitado)
                .dia(pedidoDTO.getDataDaTroca())
                .turno(pedidoDTO.getTurnoDaTroca())
                .status(pedidoDTO.getStatus())
                .build();

        funcionarioService.updatePedidosDeTrocaList(pedidoDeTroca);

        this.pedidoDeTrocaRepository.save(pedidoDeTroca);
    }

    public Funcionario getFuncionarioById(Long idFuncionarioSolicitante) throws Exception {
        try {
            return funcionarioService.findFuncionarioById(idFuncionarioSolicitante).get();
        } catch (Exception e) {
            throw new Exception("Funcionário não existe.");
        }
    }

    public List<PedidoDeTroca> findPedidosDeTrocaPorFuncionario(Integer funcionarioID) throws Exception {
        try {
            List<PedidoDeTroca> pedidos = new ArrayList<>();
            Funcionario funcionario = funcionarioService.findFuncionarioById(funcionarioID).get();
            pedidos.addAll(pedidoDeTrocaRepository.findPedidoDeTrocaByToFuncionario(funcionario));
            pedidos.addAll(pedidoDeTrocaRepository.findPedidoDeTrocaByFromFuncionario(funcionario));

            return pedidos;
        } catch (Exception e) {
            throw new Exception("Funcionário não existe.");
        }
    }

    //TODO - fix possible NPE's con los optionals
    public List<PedidoDeTroca> findPedidosDeTrocaEnviadosPorFuncionario(Integer id) throws Exception{
        try {
            Funcionario funcionario = funcionarioService.findFuncionarioById(id).get();
            return pedidoDeTrocaRepository.findPedidoDeTrocaByFromFuncionario(funcionario);
        } catch (Exception e) {
            throw new Exception("Funcionário não existe.");
        }
    }

    public List<PedidoDeTroca> findPedidosDeTrocaRecebidosPorFuncionario(Integer id) throws Exception {
        try {

            Funcionario funcionario = funcionarioService.findFuncionarioById(id).get();
            return pedidoDeTrocaRepository.findPedidoDeTrocaByToFuncionario(funcionario);
        } catch (Exception e) {
            throw new Exception("Funcionário não existe.");
        }
    }

    public List<SolicitacaoDeTrocaDTO> getPedidosTrocaPorStatus(Status status, String emailFuncionario) throws Exception {
        if (emailFuncionario == null || emailFuncionario.isEmpty()) throw new Exception("E-mail não existe");

        Optional<Funcionario> funcionario = this.funcionarioService.findFuncionarioByEmail(emailFuncionario);
        if (funcionario.isEmpty()) throw new Exception("Funcionário não existe");

        List<PedidoDeTroca> pedidos =
                this.customPedidoDeTrocaRepository.findAllByToFuncionarioAndStatus(funcionario.get(), status);

        if (!pedidos.isEmpty()) {
            return pedidos.stream().map(pedidoDeTroca -> this.buildSolicitacaoTrocaDTO(pedidoDeTroca))
                    .collect(Collectors.toList());
        }

        return new ArrayList<>();
    }


    private SolicitacaoDeTrocaDTO buildSolicitacaoTrocaDTO(PedidoDeTroca pedidoDeTroca) {
        return SolicitacaoDeTrocaDTO.builder()
                .id((long) pedidoDeTroca.getId())
                .funcionarioSolicitante(
                        new FuncionarioDTO(
                                (long) pedidoDeTroca.getFromFuncionario().getId(),
                                pedidoDeTroca.getFromFuncionario().getNome(),
                                pedidoDeTroca.getFromFuncionario().getEmail()
                        )
                )
                .funcionarioSolicitado(
                        new FuncionarioDTO(
                                (long) pedidoDeTroca.getToFuncionario().getId(),
                                pedidoDeTroca.getToFuncionario().getNome(),
                                pedidoDeTroca.getToFuncionario().getEmail()
                        )
                )
                .dataDaTroca(pedidoDeTroca.getDia())
                .turnoDaTroca(pedidoDeTroca.getTurno())
                .status(pedidoDeTroca.getStatus())
                .build();
    }
}
