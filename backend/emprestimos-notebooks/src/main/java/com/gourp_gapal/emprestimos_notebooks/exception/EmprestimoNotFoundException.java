package com.gourp_gapal.emprestimos_notebooks.exception;

public class EmprestimoNotFoundException extends RuntimeException{
  public EmprestimoNotFoundException() {
    super("Empréstimo não encontrado.");
  }
}
