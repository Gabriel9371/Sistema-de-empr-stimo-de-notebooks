package com.gourp_gapal.emprestimos_notebooks.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "notebook")
@Getter
@Setter
@NoArgsConstructor
public class Notebook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String patrimonio;

    @Column(nullable = false)
    private String modelo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusNotebook status = StatusNotebook.DISPONIVEL;
}
