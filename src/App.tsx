import { useState } from "react";
import { Book, Code, Puzzle, Trophy, Check, X } from "lucide-react";
import "./App.css";

type Challenge = {
  id: string;
  title: string;
  description: string;
  solution: string;
  points: number;
};

type Chapter = {
  id: string;
  title: string;
  theory: string;
  challenges: Challenge[];
};

function App() {
  const [currentChapter, setCurrentChapter] = useState<string | null>(null);
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([]);
  const [userSolutions, setUserSolutions] = useState<{ [key: string]: string }>(
    {}
  );
  const [challengeStatus, setChallengeStatus] = useState<{
    [key: string]: "pending" | "correct" | "incorrect";
  }>({});

  const chapters: Chapter[] = [
    {
      id: "introducao-java",
      title: "Introdução ao Java: Primeiro Programa",
      theory: `
        Java é uma linguagem de programação orientada a objetos. 
        Todo programa Java começa com a criação de uma classe contendo 
        o método main(), que é o ponto de entrada do programa.
        
        Componentes básicos de um programa Java:
        - Classe principal
        - Método main()
        - Comando System.out.println() para impressão
      `,
      challenges: [
        {
          id: "hello-world",
          title: "Seu Primeiro Programa: Hello, World!",
          description:
            'Escreva um programa que imprima "Hello, World!" na tela',
          solution: `
            public class PrimeiroPrograma {
                public static void main(String[] args) {
                    System.out.println("Hello, World!");
                }
            }
          `.trim(),
          points: 50,
        },
      ],
    },
    {
      id: "conceitos-basicos",
      title: "Conceitos Básicos: Tipos de Dados e Controle de Fluxo",
      theory: `
        Tipos de dados básicos em Java:
        - int: números inteiros
        - double: números decimais
        - boolean: valores verdadeiro/falso
        - String: sequência de caracteres

        Estruturas de controle de fluxo:
        - if/else: tomada de decisão
        - switch: múltiplas condições
        - for/while: repetição de código
      `,
      challenges: [
        {
          id: "tipos-variaveis",
          title: "Declarando e Usando Variáveis",
          description:
            "Declare variáveis de diferentes tipos e faça uma operação simples",
          solution: `
            public class TiposVariaveis {
                public static void main(String[] args) {
                    int idade = 25;
                    double altura = 1.75;
                    boolean estudante = true;
                    String nome = "João";
                    
                    System.out.println("Nome: " + nome);
                    System.out.println("Idade: " + idade);
                    System.out.println("Altura: " + altura);
                    System.out.println("Estudante: " + estudante);
                }
            }
          `.trim(),
          points: 75,
        },
        {
          id: "estruturas-controle",
          title: "Estruturas de Controle de Fluxo",
          description: "Crie um programa que use if-else e um loop for",
          solution: `
            public class ControleFluxo {
                public static void main(String[] args) {
                    int numero = 10;
                    
                    if (numero > 5) {
                        System.out.println("Número é maior que 5");
                    } else {
                        System.out.println("Número é menor ou igual a 5");
                    }
                    
                    for (int i = 0; i < 5; i++) {
                        System.out.println("Iteração: " + i);
                    }
                }
            }
          `.trim(),
          points: 100,
        },
      ],
    },
    {
      id: "poo-classes-objetos",
      title: "POO: Classes e Objetos",
      theory: `
        Conceitos fundamentais de Programação Orientada a Objetos:
        - Classe: Modelo/Blueprint para criar objetos
        - Objeto: Instância de uma classe
        - Atributos: Características do objeto
        - Métodos: Comportamentos do objeto
      `,
      challenges: [
        {
          id: "criar-classe-pessoa",
          title: "Criando uma Classe Pessoa",
          description: "Crie uma classe Pessoa com atributos e um método",
          solution: `
            public class Pessoa {
                private String nome;
                private int idade;
                
                public Pessoa(String nome, int idade) {
                    this.nome = nome;
                    this.idade = idade;
                }
                
                public void apresentar() {
                    System.out.println("Meu nome é " + nome + " e tenho " + idade + " anos");
                }
                
                public static void main(String[] args) {
                    Pessoa pessoa = new Pessoa("Maria", 30);
                    pessoa.apresentar();
                }
            }
          `.trim(),
          points: 100,
        },
      ],
    },
    {
      id: "encapsulamento",
      title: "Encapsulamento: Protegendo os Dados",
      theory: `
        Encapsulamento é um princípio de POO que:
        - Esconde detalhes internos de uma classe
        - Protege dados de modificações indevidas
        - Usa modificadores de acesso (private, public, protected)
        - Fornece métodos get e set para acessar atributos
      `,
      challenges: [
        {
          id: "classe-conta-bancaria",
          title: "Conta Bancária Encapsulada",
          description: "Crie uma classe ContaBancaria com encapsulamento",
          solution: `
            public class ContaBancaria {
                private double saldo;
                
                public void depositar(double valor) {
                    if (valor > 0) {
                        saldo += valor;
                    }
                }
                
                public void sacar(double valor) {
                    if (valor > 0 && valor <= saldo) {
                        saldo -= valor;
                    }
                }
                
                public double getSaldo() {
                    return saldo;
                }
                
                public static void main(String[] args) {
                    ContaBancaria conta = new ContaBancaria();
                    conta.depositar(1000);
                    conta.sacar(500);
                    System.out.println("Saldo: " + conta.getSaldo());
                }
            }
          `.trim(),
          points: 150,
        },
      ],
    },
    {
      id: "heranca",
      title: "Herança: Reuso e Extensão de Código",
      theory: `
        Herança permite:
        - Criar novas classes baseadas em classes existentes
        - Reutilizar código
        - Estabelecer uma hierarquia entre classes
        - Usar a palavra-chave 'extends'
      `,
      challenges: [
        {
          id: "heranca-animais",
          title: "Criando uma Hierarquia de Animais",
          description: "Crie uma classe Animal e uma subclasse Cachorro",
          solution: `
            public class Animal {
                protected String nome;
                
                public void emitirSom() {
                    System.out.println("Som genérico de animal");
                }
            }

            public class Cachorro extends Animal {
                @Override
                public void emitirSom() {
                    System.out.println("Au au!");
                }
                
                public void abanarRabo() {
                    System.out.println(nome + " abanando o rabo");
                }
                
                public static void main(String[] args) {
                    Cachorro dog = new Cachorro();
                    dog.nome = "Bob";
                    dog.emitirSom();
                    dog.abanarRabo();
                }
            }
          `.trim(),
          points: 150,
        },
      ],
    },
    {
      id: "polimorfismo",
      title: "Polimorfismo: Flexibilidade em POO",
      theory: `
        Polimorfismo permite:
        - Tratar objetos de diferentes tipos de forma uniforme
        - Sobrescrever métodos em classes filhas
        - Usar interfaces e classes abstratas
        - Implementar comportamentos diferentes para o mesmo método
      `,
      challenges: [
        {
          id: "forma-geometrica",
          title: "Calculando Áreas com Polimorfismo",
          description:
            "Crie uma hierarquia de formas geométricas com método de área",
          solution: `
            public abstract class Forma {
                public abstract double calcularArea();
            }

            public class Circulo extends Forma {
                private double raio;
                
                public Circulo(double raio) {
                    this.raio = raio;
                }
                
                @Override
                public double calcularArea() {
                    return Math.PI * raio * raio;
                }
            }

            public class Retangulo extends Forma {
                private double largura;
                private double altura;
                
                public Retangulo(double largura, double altura) {
                    this.largura = largura;
                    this.altura = altura;
                }
                
                @Override
                public double calcularArea() {
                    return largura * altura;
                }
                
                public static void main(String[] args) {
                    Forma circulo = new Circulo(5);
                    Forma retangulo = new Retangulo(4, 6);
                    
                    System.out.println("Área do Círculo: " + circulo.calcularArea());
                    System.out.println("Área do Retângulo: " + retangulo.calcularArea());
                }
            }
          `.trim(),
          points: 200,
        },
      ],
    },
  ];

  const verifySolution = (challengeId: string) => {
    const challenge = chapters
      .flatMap((chapter) => chapter.challenges)
      .find((c) => c.id === challengeId);

    if (!challenge) return;

    const normalizedSolution = challenge.solution
      .replace(/\s+/g, "")
      .replace(/\n/g, "");

    const normalizedUserSolution =
      userSolutions[challengeId]?.replace(/\s+/g, "").replace(/\n/g, "") || "";

    if (normalizedUserSolution === normalizedSolution) {
      setChallengeStatus((prev) => ({
        ...prev,
        [challengeId]: "correct",
      }));

      if (!solvedChallenges.includes(challengeId)) {
        setSolvedChallenges((prev) => [...prev, challengeId]);
      }
    } else {
      setChallengeStatus((prev) => ({
        ...prev,
        [challengeId]: "incorrect",
      }));
    }
  };

  const handleSolutionChange = (challengeId: string, solution: string) => {
    setUserSolutions((prev) => ({
      ...prev,
      [challengeId]: solution,
    }));

    setChallengeStatus((prev) => ({
      ...prev,
      [challengeId]: "pending",
    }));
  };

  return (
    <div className="min-h-screen w-auto bg-gray-100 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Guia Interativo de Java e POO
        </h1>
      </header>

      <div className="grid grid-cols-3 gap-4 mb-8 max-w-screen-xl m-auto">
        <div className="bg-white p-4 rounded shadow flex items-center text-black">
          <Book className="mr-2 text-blue-500" />
          <span>Teoria</span>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center text-black">
          <Code className="mr-2 text-green-500" />
          <span>Código</span>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center text-black">
          <Puzzle className="mr-2 text-purple-500" />
          <span>Desafios</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="bg-white p-6 rounded-lg shadow-md mb-4"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() =>
                setCurrentChapter(
                  currentChapter === chapter.id ? null : chapter.id
                )
              }
            >
              <h2 className="text-2xl font-semibold text-blue-700">
                {chapter.title}
              </h2>
              <Trophy
                className={`w-6 h-6 ${
                  solvedChallenges.some((challengeId) =>
                    chapter.challenges.some(
                      (challenge) => challenge.id === challengeId
                    )
                  )
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
              />
            </div>

            {currentChapter === chapter.id && (
              <div className="mt-4">
                <div className="bg-gray-50 p-4 rounded mb-4 text-blue-700 whitespace-pre-wrap">
                  <h3 className="font-bold mb-2">Teoria</h3>
                  <p>{chapter.theory}</p>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Desafios</h3>
                  {chapter.challenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className="bg-white border p-4 rounded mb-2"
                    >
                      <h4 className="font-semibold">{challenge.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {challenge.description}
                      </p>

                      <textarea
                        className="w-full p-2 border rounded mb-2 font-mono text-sm"
                        rows={10}
                        placeholder="Digite sua solução aqui..."
                        value={userSolutions[challenge.id] || ""}
                        onChange={(e) =>
                          handleSolutionChange(challenge.id, e.target.value)
                        }
                      />

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-green-600">
                          {challenge.points} pontos
                        </span>

                        <div className="flex items-center space-x-2">
                          {challengeStatus[challenge.id] === "correct" && (
                            <Check className="text-green-500" />
                          )}
                          {challengeStatus[challenge.id] === "incorrect" && (
                            <X className="text-red-500" />
                          )}

                          <button
                            onClick={() => verifySolution(challenge.id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          >
                            Verificar Solução
                          </button>
                        </div>
                      </div>

                      {challengeStatus[challenge.id] === "incorrect" && (
                        <div className="mt-2 p-2 bg-red-50 border-l-4 border-red-500 text-red-700">
                          Solução incorreta. Tente novamente!
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
