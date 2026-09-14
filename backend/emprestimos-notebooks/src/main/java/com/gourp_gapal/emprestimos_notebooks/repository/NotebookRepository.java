package com.gourp_gapal.emprestimos_notebooks.repository;

import com.gourp_gapal.emprestimos_notebooks.model.Notebook;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface NotebookRepository extends JpaRepository<Notebook, Long> {
  Optional<Notebook> findByQrCode(UUID fdbqrcode);
}
