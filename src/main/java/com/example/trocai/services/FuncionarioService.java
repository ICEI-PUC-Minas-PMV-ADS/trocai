package com.example.trocai.services;

import com.example.trocai.models.Funcionario;
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

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class FuncionarioService  implements UserDetailsService {

    private final FuncionarioRepository funcionarioRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public List<Funcionario> getAllFuncionarios() {
        return funcionarioRepository.findAll();
    }

    public String createFuncionario(@RequestBody Funcionario funcionario){

        funcionario.setSenha(bCryptPasswordEncoder.encode(funcionario.getSenha()));
        funcionarioRepository.save(funcionario);

        return "It works!!";
    }

//    public List<Funcionario> getFuncionarioByTurnoLivre(@RequestParam int day, int month, int year, String turno){
//        LocalDate dia = LocalDate.of(year, month, day);
//        return funcionarioRepository.getFuncionarioByTurnoLivre(dia,Turno.valueOf(turno));
//    }
    public List<Funcionario> getFuncionarioByTurnoPrincipal(@RequestParam String turno){
        return funcionarioRepository.getFuncionarioByTurnoPrincipal(Turno.valueOf(turno));
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        return funcionarioRepository.findFuncionarioByEmail(email)
                .map(user -> {
                    return new User(user.getEmail(), user.getSenha(), new ArrayList<>());
                })
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }
}
