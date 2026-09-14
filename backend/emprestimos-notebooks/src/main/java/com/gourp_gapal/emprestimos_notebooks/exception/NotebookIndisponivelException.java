package com.gourp_gapal.emprestimos_notebooks.exception;

public class NotebookIndisponivelException extends RuntimeException {

    public NotebookIndisponivelException() {
        super("Notebook indisponível no momento.");
    }
}
