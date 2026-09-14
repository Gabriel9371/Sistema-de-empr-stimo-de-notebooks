package com.gourp_gapal.emprestimos_notebooks.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UsuarioRequestDTO {
    @NotBlank
    private String nome;
    @NotBlank
    private String matricula;
}
