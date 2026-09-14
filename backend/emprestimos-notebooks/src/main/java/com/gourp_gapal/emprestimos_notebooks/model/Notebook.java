package com.gourp_gapal.emprestimos_notebooks.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

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


    @Column(name = "qr_code",nullable = false, unique = true)
    private UUID qrcode = UUID.randomUUID();

}
