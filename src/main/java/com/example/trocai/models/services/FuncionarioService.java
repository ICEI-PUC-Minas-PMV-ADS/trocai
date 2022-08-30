package com.example.trocai.models.services;

import com.example.trocai.models.Funcionario;
import com.example.trocai.models.repositories.FuncionarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;
    public List<Funcionario> getAllFuncionarios() {
        return funcionarioRepository.findAll();
    }
}
