package com.example.trocai;

import com.example.trocai.models.*;
import com.example.trocai.models.repositories.FuncionarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class TrocaiApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrocaiApplication.class, args);
    }

    @Bean
    CommandLineRunner runner (FuncionarioRepository repo){
        return args -> {
            Funcionario funcionario = new Funcionario("Maria", "do Bairro", "Maria do Bairro",
                    Turno.TARDE, Cargo.ATENDENTE, "maria@bairro.com", "31-34502888",
                    false, new EscalaMensal(),
                    List.of(new PedidosDeTroca())
            );

            repo.insert(funcionario);
        };


    }

}
