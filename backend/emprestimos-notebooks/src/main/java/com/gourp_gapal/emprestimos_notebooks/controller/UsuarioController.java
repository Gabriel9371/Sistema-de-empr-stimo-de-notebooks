package com.gourp_gapal.emprestimos_notebooks.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gourp_gapal.emprestimos_notebooks.dto.UsuarioRequestDTO;
import com.gourp_gapal.emprestimos_notebooks.dto.UsuarioResponse;
import com.gourp_gapal.emprestimos_notebooks.service.UsuarioService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController{
  private final UsuarioService service;

  @PostMapping
  public ResponseEntity<UsuarioResponse> criar(@RequestBody @Valid UsuarioRequestDTO dto){
    UsuarioResponse res = service.criar(dto);
    return ResponseEntity.status(HttpStatus.CREATED).body(res);
  }

  @GetMapping 
  public ResponseEntity<List<UsuarioResponse>> listarTodos(){
    return ResponseEntity.ok(service.listarTodos());
  }

  public ResponseEntity<UsuarioResponse> listarPorId(@PathVariable Long id){
    return ResponseEntity.ok(service.listarPorId(id));
  }
}
