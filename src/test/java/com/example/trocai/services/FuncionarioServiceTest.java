package com.example.trocai.services;

import com.example.trocai.mocks.FuncionarioMock;
import com.example.trocai.models.Funcionario;
import com.example.trocai.models.Turno;
import com.example.trocai.repositories.FuncionarioRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class FuncionarioServiceTest {

    @InjectMocks
    private FuncionarioService funcionarioService;

    @Mock
    private FuncionarioRepository funcionarioRepository;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Mock
    private SequenceGeneratorService generatorService;

    private static Funcionario funcionario;

    @BeforeAll
    static void SetUp() {
        funcionario = FuncionarioMock.getFuncionarios().get(0);
    }

    @Test
    public void shouldReturnAllFuncionarios() {
        when(funcionarioRepository.findAll()).thenReturn(Arrays.asList(funcionario));
        assertEquals(Arrays.asList(funcionario), funcionarioService.getAllFuncionarios());
    }

    @Test
    public void shouldCreateFuncionario() {
        when(bCryptPasswordEncoder.encode(funcionario.getSenha())).thenReturn("#256488hdgdggd76464");
        assertEquals( "Funcionario Carl was successfully created", funcionarioService.createFuncionario(funcionario));
    }

    @Test
    public void shouldReturnFuncionariosByTurnoPrincipal() {
        Turno turno = Turno.NOITE;

        when(funcionarioService.findFuncionariosByTurnoPrincipal("NOITE")).thenReturn(Arrays.asList(funcionario));
        assertEquals(Arrays.asList(funcionario), funcionarioRepository.findFuncionariosByTurnoPrincipal(turno));
        assertEquals(funcionario.getEmail(), "sagan@email.com");
    }

    @Test
    public void shouldLoadUserByUsername() {
        User expectedUser = new User(funcionario.getEmail(), funcionario.getSenha(), new ArrayList<>());
        when(funcionarioRepository.findFuncionarioByEmail("sagan@email.com")).thenReturn(java.util.Optional.ofNullable(funcionario));

        assertEquals(expectedUser, funcionarioService.loadUserByUsername(funcionario.getEmail()));
    }

    @Test
    public void shouldThrowExceptionWhenTryLoadUserByUsername(){

        when(funcionarioRepository.findFuncionarioByEmail("ghost@email.com")).thenReturn(Optional.empty());
        try {
            funcionarioService.loadUserByUsername("ghost@email.com");
        } catch (UsernameNotFoundException ex) {
            assertEquals(ex.getMessage(), "User not found with email: ghost@email.com");
        }
    }
}
