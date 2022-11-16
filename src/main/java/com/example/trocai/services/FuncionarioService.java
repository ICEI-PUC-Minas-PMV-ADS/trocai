package com.example.trocai.services;

import com.example.trocai.models.Funcionario;
import com.example.trocai.models.PedidoDeTroca;
import com.example.trocai.models.Turno;
import com.example.trocai.repositories.FuncionarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.example.trocai.models.Funcionario.SEQUENCE_NAME;

@AllArgsConstructor
@Service
public class FuncionarioService  implements UserDetailsService {

    private final FuncionarioRepository funcionarioRepository;

    private SequenceGeneratorService generatorService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public List<Funcionario> getAllFuncionarios() {
        return funcionarioRepository.findAll();
    }

    public String createFuncionario(@RequestBody Funcionario funcionario){

        funcionario.setId(generatorService.getSequenceNumber(SEQUENCE_NAME));
        funcionario.setSenha(bCryptPasswordEncoder.encode(funcionario.getSenha()));
        funcionarioRepository.save(funcionario);

        return String.format("Funcionario %s was successfully created", funcionario.getNome());
    }


//    public List<Funcionario> getFuncionarioByTurnoLivre(@RequestParam int day, int month, int year, String turno){
//        LocalDate dia = LocalDate.of(year, month, day);
//        return funcionarioRepository.getFuncionarioByTurnoLivre(dia,Turno.valueOf(turno));
//    }
    public List<Funcionario> findFuncionariosByTurnoPrincipal(@RequestParam String turno){
        return funcionarioRepository.findFuncionariosByTurnoPrincipal(Turno.valueOf(turno));
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        return funcionarioRepository.findFuncionarioByEmail(email)
                .map(user -> new User(user.getEmail(), user.getSenha(), new ArrayList<>()))
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public Optional<Funcionario> findFuncionarioByEmail(String email) {
        return funcionarioRepository.findFuncionarioByEmail(email);
    }

    public void updatePedidosDeTrocaList(PedidoDeTroca pedido){
        Funcionario to = pedido.getToFuncionario();
        Funcionario from = pedido.getFromFuncionario();
        to.addPedidoDeTroca(pedido);
        from.addPedidoDeTroca(pedido);
        funcionarioRepository.saveAll(List.of(to, from));
    }


    public Optional<Funcionario> findFuncionarioById(Long id) {
        return funcionarioRepository.findFuncionarioById(id);
    }
    public Optional<Funcionario> findFuncionarioById(Integer id) {
        return funcionarioRepository.findFuncionarioById(id);
    }

    public List<Funcionario> findFuncionariosByTurnoLivreAndDate(LocalDate date, Turno turno) {
//        String turnoLivre = turno.name();
//        Query query = new Query();
//        query.addCriteria(Criteria.where("funcionarios.escalaMensal.diasDeTrabalho.dia").is(date)
//                .nin(turnoLivre).in("funcionarios.escalaMensal.diasDeTrabalho.dia.turnosOcupados"));
        return funcionarioRepository.findFuncionariosByTurnoLivreAndDate(date, turno);
    }
}
