package com.gourp_gapal.emprestimos_notebooks.exception;

public class NotebookNotFoundException extends RuntimeException{
  public NotebookNotFoundException(){
    super("nada encontrado para o ID informado");
  }
}
