package com.gourp_gapal.emprestimos_notebooks.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gourp_gapal.emprestimos_notebooks.dto.EmprestimoRequestDTO;
import com.gourp_gapal.emprestimos_notebooks.dto.EmprestimoResponseDTO;
import com.gourp_gapal.emprestimos_notebooks.service.EmprestimoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/emprestimos")
@RequiredArgsConstructor
public class EmprestimoController{
  private final EmprestimoService service;

  @PostMapping
  public ResponseEntity<EmprestimoResponseDTO> criar(@RequestBody @Valid EmprestimoRequestDTO dto){
    EmprestimoResponseDTO emr = service.criar(dto);

    return ResponseEntity.status(HttpStatus.CREATED).body(emr);
  }

  @GetMapping
  public ResponseEntity<List<EmprestimoResponseDTO>> listarTodos(){
    return ResponseEntity.ok(service.listarTodos());
  }

  @PatchMapping("/{id}/devolver")
  public ResponseEntity<EmprestimoResponseDTO> devolver(@PathVariable Long id){
    return ResponseEntity.ok(service.devolver(id));
  }

  @GetMapping("/qr/{qrCode}")
  public ResponseEntity<EmprestimoResponseDTO> buscarAtivoPorQrCode(@PathVariable UUID qrCode) {
      return ResponseEntity.ok(service.buscarAtivoPorQrCode(qrCode));
  }

  @PatchMapping("/qr/{qrCode}/devolver")
  public ResponseEntity<EmprestimoResponseDTO> devolverPorQrCode(@PathVariable UUID qrCode) {
      return ResponseEntity.ok(service.devolverPorQrCode(qrCode));
  }

}
