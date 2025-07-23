# Task Manager - Sistema de Gerenciamento de Tarefas

Aplicação web desenvolvida em **ReactJS** para gerenciamento de tarefas pessoais ou profissionais. O projeto utiliza arquitetura baseada em **Headless Components**, gerenciamento de estado global com **Redux Toolkit + Redux Persist**, além de backend simulado via **JSON Server**.

## ✨ Funcionalidades

- ✅ Login com validação (rota pública)
- ✅ Rotas privadas protegidas
- ✅ CRUD de tarefas:
  - Criar, listar, editar, remover
  - Campos: título, descrição, categoria, prioridade, status
- ✅ Dashboard com gráficos (Recharts)
- ✅ Filtros de tarefas (status, categoria, prioridade) (em construção)
- ✅ Busca por texto (em construção)
- ✅ Toasts de feedback global (React Hot Toast)
- ✅ Design responsivo (Tailwind CSS)
- ✅ Backend simulado (JSON Server)

---

## 📦 Tecnologias

- React 18 + Vite
- TypeScript
- Redux Toolkit
- Redux Persist
- React Router
- React Hot Toast
- Recharts
- JSON Server (backend simulado)
- Tailwind CSS 4

---

## 🚀 Instalação

### Pré requisitos

- **Node.js 22+**
- **Yarn ou NPM**

```bash
# Instalar dependências
yarn install

# Rodar Frontend
yarn dev

# Rodar JSON Server (backend)
yarn server
```

## Login

## Configuração banco de dados (local com json-server)

O arquivo _db.json_ contém os dados atuais do banco, que por padrão constam com um usuário e três tarefas cadastradas
