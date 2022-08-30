package com.example.trocai.models.controllers;

import com.example.trocai.models.Funcionario;
import com.example.trocai.models.services.FuncionarioService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
