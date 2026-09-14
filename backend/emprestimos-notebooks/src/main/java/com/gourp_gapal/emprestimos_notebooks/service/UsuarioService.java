package com.gourp_gapal.emprestimos_notebooks.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.gourp_gapal.emprestimos_notebooks.dto.UsuarioRequestDTO;
import com.gourp_gapal.emprestimos_notebooks.dto.UsuarioResponse;
import com.gourp_gapal.emprestimos_notebooks.exception.UsuarioNotFoundException;
import com.gourp_gapal.emprestimos_notebooks.mapper.UsuarioMapper;
import com.gourp_gapal.emprestimos_notebooks.model.Usuario;
import com.gourp_gapal.emprestimos_notebooks.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService{
  private final UsuarioRepository usuarioRepository;
  private final UsuarioMapper usuarioMapper;

  public UsuarioResponse criar(UsuarioRequestDTO dto){
    Usuario usuario = usuarioMapper.toEntity(dto);
    Usuario saveUsuario = usuarioRepository.save(usuario);

    return usuarioMapper.toResponse(saveUsuario);
  }

  public List<UsuarioResponse> listarTodos(){
    return usuarioRepository.findAll()
      .stream().map(usuarioMapper::toResponse)
      .toList();
  }

  public UsuarioResponse listarPorId(Long id){
    Usuario usuario = usuarioRepository.findById(id).orElseThrow(
      () -> new UsuarioNotFoundException()
    );

    return usuarioMapper.toResponse(usuario);
  }
}
