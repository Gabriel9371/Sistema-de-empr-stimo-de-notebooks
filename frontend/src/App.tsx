
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from './components/AdminLayout';
import AlunoLayout from './components/AlunoLayout';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNotebooks from './pages/admin/AdminNotebooks';
import AdminEmprestimos from './pages/admin/AdminEmprestimos';

// Aluno Pages
import AlunoLogin from './pages/aluno/AlunoLogin';
import AlunoHome from './pages/aluno/AlunoHome';
import AlunoScanner from './pages/aluno/AlunoScanner';
import AlunoSucesso from './pages/aluno/AlunoSucesso';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/aluno/login" />} />
        
        {/* Student Routes */}
        <Route path="/aluno/login" element={<AlunoLogin />} />
        
        <Route path="/aluno" element={<AlunoLayout />}>
          <Route index element={<AlunoHome />} />
          <Route path="emprestimo" element={<AlunoScanner action="EMPRESTIMO" />} />
          <Route path="devolucao" element={<AlunoScanner action="DEVOLUCAO" />} />
          <Route path="sucesso" element={<AlunoSucesso />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="notebooks" element={<AdminNotebooks />} />
          <Route path="emprestimos" element={<AdminEmprestimos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
