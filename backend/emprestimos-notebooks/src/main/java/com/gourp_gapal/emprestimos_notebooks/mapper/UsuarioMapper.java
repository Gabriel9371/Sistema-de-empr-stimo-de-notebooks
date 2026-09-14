package com.gourp_gapal.emprestimos_notebooks.mapper;
import org.springframework.stereotype.Component;

import com.gourp_gapal.emprestimos_notebooks.dto.UsuarioRequestDTO;
import com.gourp_gapal.emprestimos_notebooks.dto.UsuarioResponse;
import com.gourp_gapal.emprestimos_notebooks.model.Usuario;

@Component
public class UsuarioMapper{
  public Usuario toEntity(UsuarioRequestDTO dto){
    Usuario user = new Usuario();
    user.setMatricula(dto.getMatricula());
    user.setNome(dto.getNome());

    return user;
  }

  public UsuarioResponse toResponse(Usuario usr){
    UsuarioResponse response = new UsuarioResponse();

    response.setId(usr.getId());
    response.setMatricula(usr.getMatricula());
    response.setNome(usr.getNome());


    return response;
  }
}
