package com.example.trocai.controllers;

import com.example.trocai.models.Cargo;
import com.example.trocai.models.EscalaMensal;
import com.example.trocai.models.Funcionario;
import com.example.trocai.models.Turno;
import com.example.trocai.services.FuncionarioService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/v1/funcionarios")
@AllArgsConstructor
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    @GetMapping
    public List<Funcionario> fetchAllFuncionarios(){
        return funcionarioService.getAllFuncionarios();
    }

    //TODO: improve with request body
    @PostMapping
    public String createFuncionario(@RequestParam String nome, @RequestParam String sobreNome, @RequestParam String turnoPrincipal, @RequestParam String cargo, @RequestParam String email, @RequestParam String senha, @RequestParam String telefone){
        return funcionarioService.createFuncionario(new Funcionario(nome, sobreNome, Turno.valueOf(turnoPrincipal.toUpperCase()), Cargo.valueOf(cargo), email, senha, telefone, new EscalaMensal(2022,9) ));
    }

    //TODO: accept string for date - Make it work!!
    @GetMapping("/turnoLivre")
    public List<Funcionario> fetchFuncionariosPorTurnoLivre(@RequestParam int year, @RequestParam int month, @RequestParam int day, @RequestParam String turno){
        LocalDate searchDate = LocalDate.of(year, month, day);
        Turno turnoBuscado = Turno.valueOf(turno.toUpperCase());
        return funcionarioService.findFuncionariosByTurnoLivreAndDate(searchDate, turnoBuscado);
    }

    @GetMapping("/turno")
    public List<Funcionario> fetchFuncionariosPorTurnoPrincipal(@RequestParam String turno){
        return  funcionarioService.findFuncionariosByTurnoPrincipal(turno);
    }
}
