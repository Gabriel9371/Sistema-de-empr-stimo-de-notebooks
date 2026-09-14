package com.gourp_gapal.emprestimos_notebooks.repository;

import com.gourp_gapal.emprestimos_notebooks.model.Emprestimo;
import com.gourp_gapal.emprestimos_notebooks.model.StatusEmprestimo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
  boolean existsByUsuarioIdAndStatus(Long usuarioId, StatusEmprestimo status);
}
