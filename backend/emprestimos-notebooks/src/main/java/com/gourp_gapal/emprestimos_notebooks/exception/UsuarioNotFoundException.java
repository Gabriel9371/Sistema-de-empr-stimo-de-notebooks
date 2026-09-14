package com.gourp_gapal.emprestimos_notebooks.exception;

public class UsuarioNotFoundException extends RuntimeException{
  public UsuarioNotFoundException(){
    super("Usuario não encontrado.");
  }
}
