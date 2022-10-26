package com.example.trocai;

import com.example.trocai.models.*;
import com.example.trocai.repositories.FuncionarioRepository;
import com.example.trocai.services.FuncionarioService;
import com.example.trocai.services.PedidoDeTrocaService;
import com.example.trocai.services.SequenceGeneratorService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EnableSwagger2
@EnableMongoRepositories
public class TrocaiApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrocaiApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(FuncionarioService funcionarioService, PedidoDeTrocaService pedidoDeTrocaService) {

        EscalaMensal escalaMensal = new EscalaMensal(2022, 9);

        return args -> {
            Funcionario paola = new Funcionario("Paola", "Bracho",
                    Turno.TARDE, Cargo.ATENDENTE, "paola@bairro.com", "senha1234", "31-30301313", escalaMensal
            );
            paola.setTurnoPrincipal(Turno.MANHA);
            Funcionario paulina = new Funcionario("Paulina", "Bracho",
                    Turno.MANHA, Cargo.ATENDENTE, "paulina@bairro.com", "senha1234", "31-30301515", escalaMensal
            );
            paulina.setTurnoPrincipal(Turno.TARDE);
            Funcionario carlos = new Funcionario("Carlos", "Daniel",
                    Turno.MANHA, Cargo.CAIXA, "carlosdaniel@bairro.com","senha1234","31-30301414", escalaMensal
            );
            carlos.setTurnoPrincipal(Turno.MANHA);
            Funcionario lalita = new Funcionario("Lalita", "Perez",
                    Turno.TARDE, Cargo.CAIXA, "lalita@bairro.com","senha1234","31-30301616", escalaMensal
            );
            lalita.setTurnoPrincipal(Turno.TARDE);
            Funcionario douglas = new Funcionario("Douglas", "Maldonado",
                    Turno.TARDE, Cargo.COZINHEIRO, "douglas@bairro.com","senha1234","31-30301717", escalaMensal
            );
            douglas.setTurnoPrincipal(Turno.MANHA);
            Funcionario willy = new Funcionario("Willy", "Montero",
                    Turno.MANHA, Cargo.COZINHEIRO, "willy@bairro.com","senha1234","31-30301919", escalaMensal
            );
            willy.setTurnoPrincipal(Turno.TARDE);
            Funcionario piedad = new Funcionario("Piedad", "Bracho",
                    Turno.TARDE, Cargo.SUPERVISOR, "piedad@bairro.com","senha1234","31-30301111", escalaMensal
            );
            piedad.setTurnoPrincipal(Turno.MANHA);
            Funcionario estefania = new Funcionario("Estefania", "Bracho",
                    Turno.MANHA, Cargo.SUPERVISOR, "estefania@bairro.com","senha1234","31-30301212", escalaMensal
            );
            estefania.setTurnoPrincipal(Turno.TARDE);

            List<Funcionario> funcionarioList = List.of(paola, paulina, carlos, douglas, lalita, piedad, willy, estefania);

            //Hashing password
//            funcionarioList.forEach(func -> func.setSenha(bCryptPasswordEncoder().encode(func.getSenha())));



            for (Funcionario f : funcionarioList) {

                Query query = new Query();
                query.addCriteria(Criteria.where("email").is(f.getEmail()));
                funcionarioService.findFuncionarioByEmail(f.getEmail()).ifPresentOrElse(
                        x -> System.out.println("Funcionario com email : " + x.getEmail() + " já existe."),
                        () -> {
                            System.out.println("Insertando funcionario " + f);
//                            f.setId(generatorService.getSequenceNumber(com.example.trocai.models.Funcionario.SEQUENCE_NAME));
                            funcionarioService.createFuncionario(f);
                        });
            }

            PedidoDeTroca pedidoDeTroca = new PedidoDeTroca(paola, paulina, LocalDate.of(2022, Month.of(9), 10), Turno.MANHA);
//            pedidoDeTroca.setId(generatorService.getSequenceNumber( com.example.trocai.models.PedidoDeTroca.SEQUENCE_NAME));
//            pedidoDeTroca.setStatus(Status.PENDING);

            pedidoDeTrocaService.createPedidoDeTroca(pedidoDeTroca);

        };


    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SequenceGeneratorService generatorService() { return new SequenceGeneratorService();}

}
