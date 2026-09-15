export interface Usuario {
  id?: number;
  nome: string;
  matricula: string;
}

export type StatusNotebook = 'DISPONIVEL' | 'EMPRESTADO' | 'MANUTENCAO' | 'INATIVO';

export interface Notebook {
  id?: number;
  patrimonio: string;
  modelo: string;
  status: StatusNotebook;
  qrcode?: string; // UUID (From backend)
  qrCode?: string; // UUID (fallback)
}

export type StatusEmprestimo = 'ATIVO' | 'CONCLUIDO' | 'ATRASADO';

export interface Emprestimo {
  id?: number;
  notebook: Notebook;
  usuario: Usuario;
  dataEmprestimo: string; // ISO DateTime
  dataDevolucaoPrevista: string; // ISO DateTime
  dataDevolucaoReal?: string; // ISO DateTime
  status: StatusEmprestimo;
}
