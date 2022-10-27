package com.example.trocai.mocks;

import com.example.trocai.models.Cargo;
import com.example.trocai.models.EscalaMensal;
import com.example.trocai.models.Funcionario;
import com.example.trocai.models.Turno;

import java.util.List;

public class FuncionarioMock {

    public static EscalaMensal escalaMensal = new EscalaMensal(2022, 9);

    public static List<Funcionario> getFuncionarios() {
        return List.of( new Funcionario(
                "Carl", "Sagan",  Turno.NOITE, Cargo.SUPERVISOR,
                "sagan@email.com", "seti@home", "2133456785", escalaMensal),
                new Funcionario("Albert", "Eisten", Turno.MANHA, Cargo.SUPERVISOR,
                        "albert@eisten.com", "ecm2", "666tapanaoreia", escalaMensal));
    }
}
