package com.example.trocai.exceptions;

public class FuncionarioNotFoundException extends RuntimeException{

    public FuncionarioNotFoundException() {
        super("Funcionário não existe");
    }

    public FuncionarioNotFoundException(String message) {
        super(message);
    }
}
