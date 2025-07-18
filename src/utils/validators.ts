export const validateEmail = (email: string): string => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email é obrigatório.';
  if (!regex.test(email)) return 'Email inválido.';
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password) return 'Senha é obrigatória.';
  if (password.length < 6) return 'A senha precisa ter pelo menos 6 caracteres.';
  return "";
};