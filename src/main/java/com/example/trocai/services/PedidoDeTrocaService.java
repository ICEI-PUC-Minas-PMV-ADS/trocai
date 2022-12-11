package com.example.trocai.services;

import com.example.trocai.auth.JwtTokenUtil;
import com.example.trocai.dto.FuncionarioDTO;
import com.example.trocai.dto.PedidoDeTrocaDTO;
import com.example.trocai.dto.SolicitacaoDeTrocaDTO;
import com.example.trocai.exceptions.FuncionarioNotFoundException;
import com.example.trocai.models.Funcionario;
import com.example.trocai.models.PedidoDeTroca;
import com.example.trocai.models.Status;
import com.example.trocai.models.Turno;
import com.example.trocai.repositories.CustomPedidoDeTrocaRepository;
import com.example.trocai.repositories.PedidoDeTrocaRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

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

    public void criarPedidoTroca(PedidoDeTrocaDTO pedidoDTO) {
        Funcionario funcionarioSolicitante = funcionarioService.findFuncionarioById(pedidoDTO.getIdFuncionarioSolicitante());
        Funcionario funcionarioSolicitado = funcionarioService.findFuncionarioById(pedidoDTO.getIdFuncionarioSolicitado());
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

    public List<PedidoDeTroca> findPedidosDeTrocaPorFuncionario(Integer funcionarioID) {

        List<PedidoDeTroca> pedidos = new ArrayList<>();
        Funcionario funcionario = funcionarioService.findFuncionarioById(funcionarioID);
        pedidos.addAll(pedidoDeTrocaRepository.findPedidoDeTrocaByToFuncionario(funcionario));
        pedidos.addAll(pedidoDeTrocaRepository.findPedidoDeTrocaByFromFuncionario(funcionario));

        return pedidos;
    }

    //TODO - fix possible NPE's con los optionals
    public List<PedidoDeTroca> findPedidosDeTrocaEnviadosPorFuncionario(Integer id) {

        Funcionario funcionario = funcionarioService.findFuncionarioById(id);
        return pedidoDeTrocaRepository.findPedidoDeTrocaByFromFuncionario(funcionario);
    }

    public List<PedidoDeTroca> findPedidosDeTrocaRecebidosPorFuncionario(Integer id) {
        Funcionario funcionario = funcionarioService.findFuncionarioById(id);
        return pedidoDeTrocaRepository.findPedidoDeTrocaByToFuncionario(funcionario);
    }

    public List<SolicitacaoDeTrocaDTO> getPedidosTrocaPorStatus(Status status, String emailFuncionario) throws Exception {
        if (emailFuncionario == null || emailFuncionario.isEmpty()) throw new Exception("E-mail não existe");

        Optional<Funcionario> funcionario = this.funcionarioService.findFuncionarioByEmail(emailFuncionario);
        if (funcionario.isEmpty()) throw new FuncionarioNotFoundException();

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

    public String responderPedidoTroca(String id, Boolean resposta) {

        PedidoDeTroca pedido = encontrarPorId(id);
        Funcionario funcionarioFrom = pedido.getFromFuncionario();
        Funcionario funcionarioTo = pedido.getToFuncionario();
        LocalDateTime diaDaTroca = pedido.getDia();
        Turno turnoLivreSolicitado = pedido.getTurno();
        String res;

        //turno de trabalho do funcionarioTo
        Turno turnoDeTrabalhoFuncionarioToAntesDaTroca = funcionarioTo.getEscalaMensal().encontrarTurnoDeTrabalho(diaDaTroca);


        if (resposta) {

            if (validateCargo(pedido)) {
                //atualiza turnos de trabalho funcionario solicitante
                funcionarioFrom.getEscalaMensal().removerTurnoDeTrabalho(diaDaTroca, turnoLivreSolicitado);
                funcionarioFrom.getEscalaMensal().assignarTurnoDeTrabalho(diaDaTroca, turnoDeTrabalhoFuncionarioToAntesDaTroca);

                //atualiza turnos de trabalho funcionario solicitado
                funcionarioTo.getEscalaMensal().removerTurnoDeTrabalho(diaDaTroca, turnoDeTrabalhoFuncionarioToAntesDaTroca);
                funcionarioTo.getEscalaMensal().assignarTurnoDeTrabalho(diaDaTroca, turnoLivreSolicitado);

                //atualiza status do pedido de Troca
                pedido.setStatus(Status.ACCEPTED);

                res = "Pedido ACCEPTED";
            } else {
                res = "Pedido INVÁLIDO: Cargos dos funcionários não são equivalentes.";
            }

        } else {
            pedido.setStatus(Status.REJECTED);
            res = "PEDIDO REJECTED";
        }

        pedidoDeTrocaRepository.save(pedido);
        funcionarioService.updateFuncionarios(List.of(funcionarioFrom, funcionarioTo));

        return res;
    }

    public boolean validateCargo(PedidoDeTroca pedido) {
        Funcionario funcionarioFrom = pedido.getFromFuncionario();
        Funcionario funcionarioTo = pedido.getToFuncionario();
        return funcionarioTo.getCargo().equals(funcionarioFrom.getCargo());
    }

    public PedidoDeTroca encontrarPorId(String swapId) {
        return pedidoDeTrocaRepository.findPedidoDeTrocaById(Integer.parseInt(swapId)).orElseThrow();

    }


}
