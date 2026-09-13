package com.gourp_gapal.emprestimos_notebooks.repository;

import com.gourp_gapal.emprestimos_notebooks.model.Notebook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotebookRepository extends JpaRepository<Notebook, Long> {
}
