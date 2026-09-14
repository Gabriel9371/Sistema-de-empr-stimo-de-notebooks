package com.gourp_gapal.emprestimos_notebooks.dto;

import lombok.Data;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

@Data
public class EmprestimoRequestDTO {
    @NotNull
    private Long notebookId;
    @NotNull
    private Long usuarioId;
    @NotNull
    private LocalDateTime dataDevolucaoPrevista;
}
