package com.example.trocai.mocks;

import com.example.trocai.models.Cargo;
import com.example.trocai.models.EscalaMensal;
import com.example.trocai.models.Funcionario;
import com.example.trocai.models.Turno;

public class FuncionarioMock {

    public static EscalaMensal escalaMensal = new EscalaMensal(2022, 9);

    public static Funcionario getFuncionario() {
        return new Funcionario(
                "Carl", "Sagan",  Turno.NOITE, Cargo.SUPERVISOR,
                "sagan@email.com", "seti@home", "2133456785", escalaMensal);
    }
}
