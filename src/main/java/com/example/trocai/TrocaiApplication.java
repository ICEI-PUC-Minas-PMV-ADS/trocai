package com.example.trocai;

import com.example.trocai.models.*;
import com.example.trocai.services.FuncionarioService;
import com.example.trocai.services.PedidoDeTrocaService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.time.LocalDateTime;
import java.util.List;


@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EnableSwagger2
@EnableMongoRepositories
public class TrocaiApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrocaiApplication.class, args);
    }

//    @Bean
//    CommandLineRunner runner(FuncionarioService funcionarioService, PedidoDeTrocaService pedidoDeTrocaService) {
//
//        return args -> {
//            Funcionario paola = new Funcionario("Paola", "Bracho",
//                    Turno.TARDE, Cargo.ATENDENTE, "paola@bairro.com", "senha1234", "31-30301313", new EscalaMensal(2022, 9)
//            );
//
//            Funcionario paulina = new Funcionario("Paulina", "Bracho",
//                    Turno.MANHA, Cargo.ATENDENTE, "paulina@bairro.com", "senha1234", "31-30301515", new EscalaMensal(2022, 9)
//            );
//
//            Funcionario carlos = new Funcionario("Carlos", "Daniel",
//                    Turno.MANHA, Cargo.CAIXA, "carlosdaniel@bairro.com","senha1234","31-30301414", new EscalaMensal(2022, 9)
//            );
//
//            Funcionario lalita = new Funcionario("Lalita", "Perez",
//                    Turno.TARDE, Cargo.CAIXA, "lalita@bairro.com","senha1234","31-30301616", new EscalaMensal(2022, 9)
//            );
//
//            Funcionario douglas = new Funcionario("Douglas", "Maldonado",
//                    Turno.TARDE, Cargo.COZINHEIRO, "douglas@bairro.com","senha1234","31-30301717", new EscalaMensal(2022, 9)
//            );
//
//            Funcionario willy = new Funcionario("Willy", "Montero",
//                    Turno.MANHA, Cargo.COZINHEIRO, "willy@bairro.com","senha1234","31-30301919", new EscalaMensal(2022, 9)
//            );
//
//            Funcionario piedad = new Funcionario("Piedad", "Bracho",
//                    Turno.TARDE, Cargo.SUPERVISOR, "piedad@bairro.com","senha1234","31-30301111", new EscalaMensal(2022, 9)
//            );
//
//            Funcionario estefania = new Funcionario("Estefania", "Bracho",
//                    Turno.MANHA, Cargo.SUPERVISOR, "estefania@bairro.com","senha1234","31-30301212", new EscalaMensal(2022, 9)
//            );
//
//
//            List<Funcionario> funcionarioList = List.of(paola, paulina, carlos, douglas, lalita, piedad, willy, estefania);
//
//            for (Funcionario f : funcionarioList) {
//
//                //inicializa escala
//                f.inicializaEscala();
//                //carrega turnos de trabalho para dias de trabalho de acordo com turno principal assignado
//                f.loadTurnosDeTrabalhoDefault();
//
//                funcionarioService.findFuncionarioByEmail(f.getEmail()).ifPresentOrElse(
//                        x -> System.out.println("Funcionario com email : " + x.getEmail() + " já existe."),
//                        () -> {
//                            System.out.println("Insertando funcionario " + f);
//                            funcionarioService.createFuncionario(f);
//                        });
//            }
//
//            PedidoDeTroca pedidoDeTroca = new PedidoDeTroca(paola, paulina, LocalDateTime.of(2022, 9, 1, 00, 00), Turno.MANHA);
//            pedidoDeTroca.setStatus(Status.PENDING);
//
//            pedidoDeTrocaService.insertPedidoDeTroca(pedidoDeTroca);
//
//        };
//
//
//    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
