package com.gourp_gapal.emprestimos_notebooks.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class NotebookRequestDTO {
    @NotBlank
    private String patrimonio;
    @NotBlank
    private String modelo;
}
