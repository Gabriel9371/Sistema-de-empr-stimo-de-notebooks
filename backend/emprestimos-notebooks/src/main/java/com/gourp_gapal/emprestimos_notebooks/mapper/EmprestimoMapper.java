package com.gourp_gapal.emprestimos_notebooks.mapper;

import com.gourp_gapal.emprestimos_notebooks.dto.EmprestimoRequestDTO;
import com.gourp_gapal.emprestimos_notebooks.dto.EmprestimoResponseDTO;
import com.gourp_gapal.emprestimos_notebooks.model.Emprestimo;
import com.gourp_gapal.emprestimos_notebooks.model.Notebook;
import com.gourp_gapal.emprestimos_notebooks.model.StatusEmprestimo;
import com.gourp_gapal.emprestimos_notebooks.model.Usuario;

import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmprestimoMapper {
    private final NotebookMapper notebookMapper;
    private final UsuarioMapper usuarioMapper;


    public Emprestimo toEntity(EmprestimoRequestDTO dto, Notebook nt, Usuario usr){
        Emprestimo emprestimo = new Emprestimo();
        emprestimo.setNotebook(nt);
        emprestimo.setUsuario(usr);
        emprestimo.setDataDevolucaoPrevista(dto.getDataDevolucaoPrevista());
        emprestimo.setDataEmprestimo(LocalDateTime.now());
        emprestimo.setStatus(StatusEmprestimo.ATIVO);

        return emprestimo;
    }

    public EmprestimoResponseDTO toResponse(Emprestimo emp){
      EmprestimoResponseDTO response = new EmprestimoResponseDTO();

      response.setId(emp.getId());
      response.setNotebook(notebookMapper.toResponse(emp.getNotebook()));
      response.setUsuario(usuarioMapper.toResponse(emp.getUsuario()));

      response.setDataEmprestimo(emp.getDataEmprestimo());
      response.setDataDevolucaoPrevista(emp.getDataDevolucaoPrevista());
      response.setDataDevolucao(emp.getDataDevolucaoReal());

      return response;
    }
}
