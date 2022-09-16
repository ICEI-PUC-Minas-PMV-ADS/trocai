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
    CommandLineRunner runner(FuncionarioRepository repo) {

        return args -> {
            Funcionario paola = new Funcionario("Paola", "Bracho",
                    Turno.TARDE, Cargo.ATENDENTE, "paolal@bairro.com", "31-30301313"
            );
            Funcionario paulina = new Funcionario("Paulina", "Bracho",
                    Turno.MANHA, Cargo.ATENDENTE, "paulina@bairro.com", "31-30301515"
            );
            Funcionario carlos = new Funcionario("Carlos", "Daniel",
                    Turno.MANHA, Cargo.CAIXA, "carlosdaniel@bairro.com", "31-30301414"
            );
            Funcionario lalita = new Funcionario("Lalita", "Perez",
                    Turno.TARDE, Cargo.CAIXA, "lalita@bairro.com", "31-30301616"
            );
            Funcionario douglas = new Funcionario("Douglas", "Maldonado",
                    Turno.TARDE, Cargo.COZINHEIRO, "douglas@bairro.com", "31-30301717"
            );
            Funcionario willy = new Funcionario("Willy", "Montero",
                    Turno.MANHA, Cargo.COZINHEIRO, "willy@bairro.com", "31-30301919"
            );
            Funcionario piedad = new Funcionario("Piedad", "Bracho",
                    Turno.TARDE, Cargo.SUPERVISOR, "piedad@bairro.com", "31-30301111"
            );
            Funcionario estefania = new Funcionario("Estefania", "Bracho",
                    Turno.MANHA, Cargo.SUPERVISOR, "estefania@bairro.com", "31-30301212"
            );

            List<Funcionario> funcionarioList = List.of(paola, paulina, carlos, douglas, lalita, piedad, willy, estefania);


            for (Funcionario f : funcionarioList) {

                Query query = new Query();
                query.addCriteria(Criteria.where("email").is(f.getEmail()));
                repo.findFuncionarioByEmail(f.getEmail()).ifPresentOrElse(
                        x -> System.out.println("Funcionario com email : " + x.getEmail() + "já existe."),
                        () -> {
                            System.out.println("Insertando funcionario" + f);
                            repo.insert(f);
                        });
            }

        };


    }

}
