export type Aluno = {
    nome: string;
    presente: boolean;
  };
  
  export type TurmaComAlunos = {
    alunos: Aluno[];
    totalPresentes: number;
  };
  
  export const dadosTurmas: { [turma: string]: TurmaComAlunos } = {
    "2024.1.144": {
      alunos: [
        { nome: "João Silva", presente: true },
        { nome: "Maria Souza", presente: false },
      ],
      totalPresentes: 1,
    },
    "2024.1.145": {
      alunos: [
        { nome: "Lucas Lima", presente: true },
        { nome: "Ana Costa", presente: true },
      ],
      totalPresentes: 2,
    },
    "2024.1.146": {
      alunos: [
        { nome: "Nicolas Marcelo Lima Eloy", presente: true },
        { nome: "Lívia Mendes", presente: true },
      ],
      totalPresentes: 2,
    },
    "2024.1.147": {
      alunos: [],
      totalPresentes: 0,
    },
    "2024.1.148": {
      alunos: [],
      totalPresentes: 0,
    },
  };
  