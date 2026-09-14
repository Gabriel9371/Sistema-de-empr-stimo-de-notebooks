package com.gourp_gapal.emprestimos_notebooks.exception;


public class UsuarioComEmprestimoAtivoException extends RuntimeException{
  public UsuarioComEmprestimoAtivoException() {
    super("Usuário já possui um empréstimo ativo.");
  }
}
