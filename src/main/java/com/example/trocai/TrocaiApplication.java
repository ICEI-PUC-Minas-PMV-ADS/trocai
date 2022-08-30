package com.example.trocai;

import com.example.trocai.models.*;
import com.example.trocai.models.repositories.FuncionarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@SpringBootApplication
public class TrocaiApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrocaiApplication.class, args);
    }

    @Bean
    CommandLineRunner runner (FuncionarioRepository repo){
        String email = "mariaDel@bairro.com";
        return args -> {
            Funcionario funcionario = new Funcionario("Maria", "do Bairro", "Maria do Bairro",
                    Turno.TARDE, Cargo.ATENDENTE, email, "31-34502888",
                    false, new EscalaMensal(),
                    List.of(new PedidosDeTroca())
            );


            Query query = new Query();
            query.addCriteria(Criteria.where("email").is(email));

            repo.findFuncionarioByEmail(email).ifPresentOrElse( f-> System.out.println("Funcionario já existe: " + email), () -> {
                System.out.println("Inserting funcionario:" + funcionario);
                repo.insert(funcionario);
            });

        };


    }

}
