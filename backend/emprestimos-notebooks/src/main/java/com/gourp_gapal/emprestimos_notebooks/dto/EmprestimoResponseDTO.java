package com.gourp_gapal.emprestimos_notebooks.dto;

import com.gourp_gapal.emprestimos_notebooks.model.StatusNotebook;
import lombok.Data;

import java.util.UUID;

@Data
public class EmprestimoResponseDTO {
    private Long notebookId;
    private String patrimoni;
    private String modelo;
    private StatusNotebook status;
    private UUID qrcode;

}
