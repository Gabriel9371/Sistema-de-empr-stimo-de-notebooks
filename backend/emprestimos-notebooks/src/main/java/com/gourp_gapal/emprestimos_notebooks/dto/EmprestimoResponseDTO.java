package com.gourp_gapal.emprestimos_notebooks.dto;

import com.gourp_gapal.emprestimos_notebooks.model.StatusEmprestimo;
import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Data
public class EmprestimoResponseDTO {

    private Long id;
    private NotebookResponseDTO notebook;
    private NotebookResponseDTO usuario;
    private LocalDateTime dataEmprestimo;
    private LocalDateTime dataDevolucaoPrevista;
    private LocalDateTime dataDevolucao;
    private StatusEmprestimo statu;
}
