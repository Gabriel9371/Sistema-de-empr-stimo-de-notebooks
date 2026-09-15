import axios from 'axios';
import type { Notebook, Emprestimo, Usuario } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// GET all notebooks
export const getNotebooks = async (): Promise<Notebook[]> => {
  const { data } = await api.get('/notebooks');
  return data;
};

// CREATE a notebook
export const createNotebook = async (patrimonio: string, modelo: string): Promise<Notebook> => {
  const { data } = await api.post('/notebooks', { patrimonio, modelo });
  return data;
};

// GET all emprestimos
export const getEmprestimos = async (): Promise<Emprestimo[]> => {
  const { data } = await api.get('/emprestimos');
  return data;
};

// REALIZAR emprestimo (Create)
export const realizarEmprestimo = async (usuarioId: number, qrCode: string): Promise<Emprestimo> => {
  // First, we need to find the notebook by QR code to get its ID,
  // Let's get all notebooks, find by qrCode
  const notebooks = await getNotebooks();
  const notebook = notebooks.find(n => n.qrcode === qrCode || n.qrCode === qrCode);
  
  if (!notebook) throw new Error('Notebook não encontrado com este QR Code');
  if (notebook.status !== 'DISPONIVEL') throw new Error('Notebook indisponível');

  // Now create the emprestimo using notebook.id
  const { data } = await api.post('/emprestimos', {
    notebookId: notebook.id,
    usuarioId: usuarioId,
    dataDevolucaoPrevista: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString()
  });
  return data;
};

// REALIZAR devolucao (via QR Code)
export const realizarDevolucao = async (qrCode: string): Promise<void> => {
  await api.patch(`/emprestimos/qr/${qrCode}/devolver`);
};

// LOGIN: Busca todos os usuários e filtra pela matrícula
export const loginUsuario = async (matricula: string, _senha?: string): Promise<Usuario> => {
  const { data } = await api.get<Usuario[]>('/usuarios');
  const usuario = data.find(u => u.matricula === matricula);
  
  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }
  
  return usuario;
};

export default api;
