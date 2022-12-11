package com.example.trocai.controllers;

import com.example.trocai.models.Cargo;
import com.example.trocai.models.EscalaMensal;
import com.example.trocai.models.Funcionario;
import com.example.trocai.models.Turno;
import com.example.trocai.services.FuncionarioService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/funcionarios")
@AllArgsConstructor
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    @GetMapping
    public ResponseEntity<List<Funcionario>> fetchAllFuncionarios(){
        List<Funcionario> funcionarios = funcionarioService.getAllFuncionarios();

        if (funcionarios.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return new ResponseEntity<>(funcionarios, HttpStatus.OK);
    }

    //TODO: improve with request body
    @PostMapping
    public ResponseEntity<Void> createFuncionario(
            @RequestParam String nome,
            @RequestParam String sobreNome,
            @RequestParam String turnoPrincipal,
            @RequestParam String cargo,
            @RequestParam String email,
            @RequestParam String senha,
            @RequestParam String telefone
    ){
        funcionarioService.createFuncionario(new Funcionario(nome, sobreNome, Turno.valueOf(turnoPrincipal.toUpperCase()), Cargo.valueOf(cargo), email, senha, telefone, new EscalaMensal(2022,9) ));
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    //TODO: accept string for date - Make it work!!
    @GetMapping("/turnoLivre")
    public ResponseEntity<List<Funcionario>> fetchFuncionariosPorTurnoLivreAndDate(
            @RequestParam int year,
            @RequestParam int month,
            @RequestParam int day,
            @RequestParam String turno
    ) throws Exception {
        LocalDateTime searchDate = LocalDateTime.of(year, month, day, 0, 0);
        List<Funcionario> funcionarios = funcionarioService.findFuncionariosByTurnoLivreAndDate(searchDate, turno);

        if (funcionarios.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return new ResponseEntity<>(funcionarios, HttpStatus.OK);
    }

    @GetMapping("/turno")
    public ResponseEntity<List<Funcionario>> fetchFuncionariosPorTurnoPrincipal(@RequestParam String turno){

        List<Funcionario> funcionarios = funcionarioService.findFuncionariosByTurnoPrincipal(turno);

        if (funcionarios.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return new ResponseEntity<>(funcionarios, HttpStatus.OK);
    }

}
