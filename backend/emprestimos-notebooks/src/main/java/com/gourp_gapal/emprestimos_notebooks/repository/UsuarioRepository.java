package com.gourp_gapal.emprestimos_notebooks.repository;

import com.gourp_gapal.emprestimos_notebooks.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
