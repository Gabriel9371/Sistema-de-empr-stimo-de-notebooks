package com.gourp_gapal.emprestimos_notebooks.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gourp_gapal.emprestimos_notebooks.dto.EmprestimoRequestDTO;
import com.gourp_gapal.emprestimos_notebooks.dto.EmprestimoResponseDTO;
import com.gourp_gapal.emprestimos_notebooks.exception.EmprestimoNotFoundException;
import com.gourp_gapal.emprestimos_notebooks.exception.NotebookIndisponivelException;
import com.gourp_gapal.emprestimos_notebooks.exception.NotebookNotFoundException;
import com.gourp_gapal.emprestimos_notebooks.exception.UsuarioComEmprestimoAtivoException;
import com.gourp_gapal.emprestimos_notebooks.exception.UsuarioNotFoundException;
import com.gourp_gapal.emprestimos_notebooks.mapper.EmprestimoMapper;
import com.gourp_gapal.emprestimos_notebooks.model.Emprestimo;
import com.gourp_gapal.emprestimos_notebooks.model.Notebook;
import com.gourp_gapal.emprestimos_notebooks.model.StatusEmprestimo;
import com.gourp_gapal.emprestimos_notebooks.model.StatusNotebook;
import com.gourp_gapal.emprestimos_notebooks.model.Usuario;
import com.gourp_gapal.emprestimos_notebooks.repository.EmprestimoRepository;
import com.gourp_gapal.emprestimos_notebooks.repository.NotebookRepository;
import com.gourp_gapal.emprestimos_notebooks.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmprestimoService{
  private final EmprestimoRepository emprestimoRepository;
  private final EmprestimoMapper emprestimoMapper;
  private final NotebookRepository notebookRepository;
  private final UsuarioRepository usuarioRepository;

  public EmprestimoResponseDTO criar(EmprestimoRequestDTO dto){
    Notebook notebook = notebookRepository.findById(dto.getNotebookId()).orElseThrow(
      () -> new NotebookNotFoundException()
    );

    Usuario usuario = usuarioRepository.findById(dto.getUsuarioId()).orElseThrow(
      () -> new UsuarioNotFoundException()
    );

    if(notebook.getStatus() != StatusNotebook.DISPONIVEL){
      throw new NotebookIndisponivelException();
    }

    boolean possuiEmprestimoAtivo = emprestimoRepository.existsByUsuarioIdAndStatus(dto.getUsuarioId(), StatusEmprestimo.ATIVO);


    if(possuiEmprestimoAtivo){
      throw new UsuarioComEmprestimoAtivoException();
    }

    notebook.setStatus(StatusNotebook.EMPRESTADO);
    notebookRepository.save(notebook);

    Emprestimo emprestimo = emprestimoMapper.toEntity(dto, notebook, usuario);
    Emprestimo saveEmprestimo = emprestimoRepository.save(emprestimo);

    return emprestimoMapper.toResponse(saveEmprestimo);
  }

  public List<EmprestimoResponseDTO> listarTodos(){
    return emprestimoRepository.findAll().stream()
      .map(emprestimoMapper::toResponse).toList();
  }



  @Transactional
  public EmprestimoResponseDTO devolver(Long id){
    Emprestimo emprestimo = emprestimoRepository.findById(id)
      .orElseThrow(() -> new EmprestimoNotFoundException());

    emprestimo.setStatus(StatusEmprestimo.DEVOLVIDO);
    emprestimo.setDataDevolucaoReal(LocalDateTime.now());

    Notebook notebook = emprestimo.getNotebook();
    notebook.setStatus(StatusNotebook.DISPONIVEL);
    notebookRepository.save(notebook);

    Emprestimo salvo = emprestimoRepository.save(emprestimo);

    return emprestimoMapper.toResponse(salvo);
  }
}
