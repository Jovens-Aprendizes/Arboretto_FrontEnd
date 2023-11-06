export interface User {
  id: string;
  nome: string;
  senha: string | null;
  cpf: string;
  email: string;
  numeroApartamento: string;
  bloco: string;
  cargo: string;
  dataNascimento: string;
}

export interface ScheduledEvent {
  id: string;
  usuarioId: string;
  spaceId: string;
  dataMarcada: string;
  observacao: string;
  status: string;
  autorizacao: string | null;
  nomeUsuario: string;
  nomeSpace: string;
}

export interface Space {
  name: string;
  image: string;
  description: string;
  id: number;
  type?: 'churrasqueira' | 'salao'
}
