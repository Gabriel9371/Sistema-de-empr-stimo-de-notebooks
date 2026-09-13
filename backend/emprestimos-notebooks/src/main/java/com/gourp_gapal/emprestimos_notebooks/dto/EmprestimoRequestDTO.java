package com.gourp_gapal.emprestimos_notebooks.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EmprestimoRequestDTO {
    private Long notebookId;
    private Long usuarioId;
    private LocalDateTime dataDevolucaoPrevista;
}
