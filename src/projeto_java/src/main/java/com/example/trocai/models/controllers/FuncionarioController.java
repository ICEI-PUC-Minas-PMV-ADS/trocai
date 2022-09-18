package com.example.trocai.models.controllers;

import com.example.trocai.models.Funcionario;
import com.example.trocai.models.services.FuncionarioService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public String createFuncionario(@RequestBody Funcionario funcionario) {return funcionarioService.createFuncionario(funcionario);}
//
//    //TODO: fix mappings
//    @GetMapping("/funcionariosPorTurnoLivre")
//    public List<Funcionario> fetchFuncionariosPorTurnoLivre(@RequestParam int day, int month, int year, String turno){
//        return funcionarioService.getFuncionarioByTurnoLivre(day, month, year, turno);
//    }

    @GetMapping("/turno")
    public List<Funcionario> fetchFuncionariosPorTurnoPrincipal(@RequestParam String turno){
        return  funcionarioService.getFuncionarioByTurnoPrincipal(turno);
    }
}
