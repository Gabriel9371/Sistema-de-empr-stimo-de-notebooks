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

import com.gourp_gapal.emprestimos_notebooks.dto.NotebookRequestDTO;
import com.gourp_gapal.emprestimos_notebooks.dto.NotebookResponseDTO;
import com.gourp_gapal.emprestimos_notebooks.service.NotebookService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notebooks")
@RequiredArgsConstructor
public class NotebookController{
  private final NotebookService service;


  @PostMapping
  public ResponseEntity<NotebookResponseDTO> criar(@RequestBody @Valid NotebookRequestDTO dto){
    NotebookResponseDTO response = service.criar(dto);

    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @GetMapping()
  public ResponseEntity<List<NotebookResponseDTO>> listarTodos(){
    return ResponseEntity.ok(service.listarTodos());
  }

  @GetMapping("/{id}")
  public ResponseEntity<NotebookResponseDTO> listarPorId(@PathVariable Long id){
    return ResponseEntity.ok(service.listarPorId(id));
  }
}
