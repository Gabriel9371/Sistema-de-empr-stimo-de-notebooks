package com.gourp_gapal.emprestimos_notebooks.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "emprestimo")
@Getter
@Setter
@NoArgsConstructor
public class Emprestimo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "notebook_id", nullable = false)
    private Notebook notebook;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private LocalDateTime dataEmprestimo;

    @Column(nullable = false)
    private LocalDateTime dataDevolucaoPrevista;

    private LocalDateTime dataDevolucaoReal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusEmprestimo status = StatusEmprestimo.ATIVO;
}
