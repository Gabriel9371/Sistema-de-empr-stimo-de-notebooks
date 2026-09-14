package com.gourp_gapal.emprestimos_notebooks.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.gourp_gapal.emprestimos_notebooks.dto.NotebookRequestDTO;
import com.gourp_gapal.emprestimos_notebooks.dto.NotebookResponseDTO;
import com.gourp_gapal.emprestimos_notebooks.exception.NotebookNotFoundException;
import com.gourp_gapal.emprestimos_notebooks.mapper.NotebookMapper;
import com.gourp_gapal.emprestimos_notebooks.model.Notebook;
import com.gourp_gapal.emprestimos_notebooks.repository.NotebookRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotebookService{
  private final NotebookRepository notebookRepository;
  private final NotebookMapper notebookMapper;
  
  public NotebookResponseDTO criar(NotebookRequestDTO dto){
    Notebook notebook = notebookMapper.toEntity(dto);
    Notebook saveNotebook = notebookRepository.save(notebook);

    return notebookMapper.toResponse(saveNotebook);

  }


  public List<NotebookResponseDTO> listarTodos(){
    return notebookRepository.findAll()
      .stream().map(notebookMapper::toResponse)
      .toList();
  }

  public NotebookResponseDTO listarPorId(Long id){
    Notebook notebook = notebookRepository.findById(id).orElseThrow(
      () -> new NotebookNotFoundException()
    );

    return notebookMapper.toResponse(notebook);
  }

}
