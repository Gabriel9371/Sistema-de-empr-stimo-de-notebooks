package com.gourp_gapal.emprestimos_notebooks.mapper;
import org.springframework.stereotype.Component;

import com.gourp_gapal.emprestimos_notebooks.dto.NotebookRequestDTO;
import com.gourp_gapal.emprestimos_notebooks.dto.NotebookResponseDTO;
import com.gourp_gapal.emprestimos_notebooks.model.Notebook;

@Component
public class NotebookMapper{
  public Notebook toEntity(NotebookRequestDTO dto){
    Notebook notebook = new Notebook();
    notebook.setPatrimonio(dto.getParimonio());
    notebook.setModelo(dto.getModelo());
    return notebook;
  }

  public NotebookResponseDTO toResponse(Notebook nt){
    NotebookResponseDTO response = new NotebookResponseDTO();

    response.setId(nt.getId());
    response.setPatrimoni(nt.getPatrimonio());
    response.setModelo(nt.getModelo());
    response.setStatus(nt.getStatus());
    response.setQrcode(nt.getQrcode());

    return response;
  }
}
