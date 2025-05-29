"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BookOpen,
  Code,
  Database,
  Server,
  Cloud,
  Shield,
  Zap,
  Users,
  Monitor,
  CheckCircle,
  Youtube,
  ExternalLink,
  Trophy,
  Target,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { ProgressStats } from "./progress-stats";

const Progress = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    value: number;
    indicatorClassName?: string;
  }
>(({ className, value, indicatorClassName, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full",
      className
    )}
    {...props}
  >
    <div
      className={cn(
        "h-full w-full flex-1 bg-gray-200 transition-all",
        indicatorClassName
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
));
Progress.displayName = "Progress";

export default function JavaRoadmap() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [completedExtras, setCompletedExtras] = useState<string[]>([]);

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const savedSteps = localStorage.getItem("java-roadmap-steps");
    const savedExtras = localStorage.getItem("java-roadmap-extras");

    if (savedSteps) {
      setCompletedSteps(JSON.parse(savedSteps));
    }

    if (savedExtras) {
      setCompletedExtras(JSON.parse(savedExtras));
    }
  }, []);

  // Salvar no localStorage sempre que o progresso mudar
  useEffect(() => {
    localStorage.setItem("java-roadmap-steps", JSON.stringify(completedSteps));
  }, [completedSteps]);

  useEffect(() => {
    localStorage.setItem(
      "java-roadmap-extras",
      JSON.stringify(completedExtras)
    );
  }, [completedExtras]);

  const updateLastActivity = () => {
    localStorage.setItem(
      "java-roadmap-last-activity",
      new Date().toISOString()
    );
  };

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    );
    updateLastActivity();
  };

  const toggleExtra = (extraId: string) => {
    setCompletedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
    updateLastActivity();
  };

  const clearProgress = () => {
    setCompletedSteps([]);
    setCompletedExtras([]);
    localStorage.removeItem("java-roadmap-steps");
    localStorage.removeItem("java-roadmap-extras");
  };

  const exportProgress = () => {
    const progressData = {
      steps: completedSteps,
      extras: completedExtras,
      exportDate: new Date().toISOString(),
      totalSteps: mainSteps.length,
      totalExtras: extraTopics.reduce(
        (acc, category) => acc + category.topics.length,
        0
      ),
    };

    const dataStr = JSON.stringify(progressData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `java-roadmap-progress-${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const progressPercentage = (completedSteps.length / 10) * 100;

  const recommendedChannels = [
    {
      name: "Maratona Java Virado no Jiraya",
      description: "Curso principal de Java",
      icon: <Youtube className="h-5 w-5" />,
      url: "https://www.youtube.com/playlist?list=PL62G310vn6nFIsOCC0H-C2infYgwm8SWW",
    },
    {
      name: "Fernanda Kipper",
      description: "Conteúdo moderno de desenvolvimento",
      icon: <Youtube className="h-5 w-5" />,
      url: "https://www.youtube.com/@kipperdev",
    },
    {
      name: "Loiane Groner",
      description: "Tutoriais detalhados",
      icon: <Youtube className="h-5 w-5" />,
      url: "https://www.youtube.com/@loianegroner",
    },
    {
      name: "Michelli Brito",
      description: "Spring e arquitetura",
      icon: <Youtube className="h-5 w-5" />,
      url: "https://www.youtube.com/@MichelliBrito",
    },
  ];

  const mainSteps = [
    {
      id: 1,
      title: "Fundamentos Java (Aulas 1-95)",
      description: "Assistir até a aula 95 do Maratona Java",
      icon: <BookOpen className="h-5 w-5" />,
      level: "Básico",
      color: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      title: "Exercícios de Lógica",
      description:
        "Fazer lista de exercícios para treinar lógica de programação",
      icon: <Code className="h-5 w-5" />,
      level: "Básico",
      color: "bg-green-100 text-green-800",
      url: "https://www.dio.me/articles/lista-de-exercicios-para-treinar-logica-de-programacao",
    },
    {
      id: 3,
      title: "Java Intermediário (Aulas 96-143)",
      description: "Continuar com conceitos intermediários",
      icon: <BookOpen className="h-5 w-5" />,
      level: "Intermediário",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 4,
      title: "Desafio Sistema de Cadastro",
      description: "Implementar sistema de cadastro completo",
      icon: <Trophy className="h-5 w-5" />,
      level: "Intermediário",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 5,
      title: "Java Avançado (Aulas 144-217)",
      description: "Conceitos avançados de Java",
      icon: <BookOpen className="h-5 w-5" />,
      level: "Avançado",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: 6,
      title: "SQL + Banco de Dados",
      description: "Aprender SQL e conceitos de banco de dados",
      icon: <Database className="h-5 w-5" />,
      level: "Intermediário",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 7,
      title: "Maven + Conexão DB",
      description: "Gerenciamento de dependências e conexão com banco",
      icon: <Server className="h-5 w-5" />,
      level: "Intermediário",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 8,
      title: "Threads e Concorrência (Aulas 246-285)",
      description: "Programação concorrente em Java",
      icon: <Zap className="h-5 w-5" />,
      level: "Avançado",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: 9,
      title: "Spring Framework",
      description: "Aprender Spring e construir primeira API Rest",
      icon: <Server className="h-5 w-5" />,
      level: "Avançado",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: 10,
      title: "API Rest Completa",
      description: "Desenvolver API Rest funcional",
      icon: <Target className="h-5 w-5" />,
      level: "Avançado",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  const extraTopics = [
    {
      category: "Princípios e Padrões",
      icon: <Lightbulb className="h-5 w-5" />,
      topics: [
        { id: "solid", name: "SOLID" },
        { id: "clean-code", name: "Clean Code e Clean Architecture" },
        {
          id: "design-patterns",
          name: "Design Patterns (Singleton, Factory, Strategy, Observer, Repository)",
        },
      ],
    },
    {
      category: "Testes e Qualidade",
      icon: <CheckCircle className="h-5 w-5" />,
      topics: [{ id: "unit-tests", name: "Testes unitários e de integração" }],
    },
    {
      category: "Protocolos e APIs",
      icon: <Server className="h-5 w-5" />,
      topics: [
        { id: "rest", name: "REST" },
        { id: "graphql", name: "GraphQL" },
        { id: "soap", name: "SOAP" },
        { id: "hateoas", name: "HATEOAS" },
      ],
    },
    {
      category: "Banco de Dados",
      icon: <Database className="h-5 w-5" />,
      topics: [{ id: "nosql", name: "NoSQL" }],
    },
    {
      category: "Segurança",
      icon: <Shield className="h-5 w-5" />,
      topics: [{ id: "auth", name: "Autenticação e Autorização" }],
    },
    {
      category: "Arquitetura",
      icon: <Monitor className="h-5 w-5" />,
      topics: [
        { id: "mvc", name: "Arquitetura MVC" },
        { id: "microservices", name: "Microsserviços" },
      ],
    },
    {
      category: "DevOps e Infraestrutura",
      icon: <Cloud className="h-5 w-5" />,
      topics: [
        { id: "docker", name: "Docker" },
        { id: "kubernetes", name: "Kubernetes" },
        { id: "cloud", name: "AWS, Azure ou Google Cloud" },
        { id: "cicd", name: "CI/CD (GitHub Actions, GitLab CI, Jenkins)" },
      ],
    },
    {
      category: "Ferramentas e Monitoramento",
      icon: <Monitor className="h-5 w-5" />,
      topics: [
        { id: "swagger", name: "Documentação com Swagger/OpenAPI" },
        { id: "cache", name: "Cache" },
        { id: "messaging", name: "Mensageria (RabbitMQ, Kafka)" },
        {
          id: "monitoring",
          name: "Log e Monitoramento (SLF4J, Prometheus, Grafana)",
        },
      ],
    },
    {
      category: "Metodologias",
      icon: <Users className="h-5 w-5" />,
      topics: [{ id: "agile", name: "Metodologias Ágeis" }],
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-6 text-gray-200">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[#9945e8]">
            Roadmap Java Developer
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Um guia completo para se tornar um desenvolvedor Java profissional,
            desde os fundamentos até tópicos avançados.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="text-sm text-gray-400">Progresso Geral:</div>
            <Progress
              value={progressPercentage}
              className="w-48 bg-gray-700"
              indicatorClassName="bg-[#8a2be2]"
            />
            <div className="text-sm font-medium">
              {Math.round(progressPercentage)}%
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={clearProgress}
              className="border-red-500/50 text-red-400 hover:bg-red-500/20"
            >
              Limpar Progresso
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportProgress}
              className="border-[#8a2be2]/50 text-[#9945e8] hover:bg-[#8a2be2]/20"
            >
              Exportar Progresso
            </Button>
          </div>
        </div>

        {/* Progress Stats */}
        <ProgressStats
          completedSteps={completedSteps}
          completedExtras={completedExtras}
          totalSteps={mainSteps.length}
          totalExtras={extraTopics.reduce(
            (acc, category) => acc + category.topics.length,
            0
          )}
        />

        {/* Recommended Channels */}
        <Card className="bg-black border-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-[#9945e8]">
              <Youtube className="h-6 w-6 text-red-500" />
              <span>Cursos e Canais Recomendados</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Principais fontes de conteúdo para seu aprendizado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendedChannels.map((channel, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-900 rounded-lg border border-gray-800"
                >
                  {channel.icon}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-200">
                      {channel.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {channel.description}
                    </p>
                  </div>
                  {channel.url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#9945e8] hover:text-[#8a2be2] hover:bg-gray-700"
                      asChild
                    >
                      <a
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Steps */}
        <Card className="bg-black border-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-[#9945e8]">
              <Target className="h-6 w-6 text-[#9945e8]" />
              <span>Passos Principais</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Siga estes passos em ordem para uma progressão estruturada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mainSteps.map((step) => (
                <div
                  key={step.id}
                  className={`p-4 border rounded-lg transition-all ${
                    completedSteps.includes(step.id)
                      ? "bg-[#8a2be2]/20 border-[#8a2be2]/30"
                      : "bg-gray-900 border-gray-800 hover:border-[#9945e8]/50"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      checked={completedSteps.includes(step.id)}
                      onCheckedChange={() => toggleStep(step.id)}
                      className="mt-1 border-gray-600 data-[state=checked]:bg-[#8a2be2] data-[state=checked]:border-[#8a2be2]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-[#9945e8]">{step.icon}</span>
                          <span className="font-medium text-lg text-gray-200">
                            {step.title}
                          </span>
                        </div>
                        <Badge className="bg-gray-700 text-gray-200">
                          {step.level}
                        </Badge>
                      </div>
                      <p className="text-gray-400 mb-2">{step.description}</p>
                      {step.url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#8a2be2]/50 text-[#9945e8] hover:bg-[#8a2be2]/20"
                          asChild
                        >
                          <a
                            href={step.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Acessar Recurso
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Extra Topics */}
        <Card className="bg-black border-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-[#9945e8]">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              <span>Tópicos Extras</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Conhecimentos complementares para se destacar no mercado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {extraTopics.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-3">
                  <div className="flex items-center space-x-2 font-medium text-[#9945e8]">
                    {category.icon}
                    <span>{category.category}</span>
                  </div>
                  <div className="space-y-2">
                    {category.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={completedExtras.includes(topic.id)}
                          onCheckedChange={() => toggleExtra(topic.id)}
                          className="border-gray-600 data-[state=checked]:bg-[#8a2be2] data-[state=checked]:border-[#8a2be2]"
                        />
                        <span
                          className={`text-sm ${
                            completedExtras.includes(topic.id)
                              ? "line-through text-gray-500"
                              : "text-gray-300"
                          }`}
                        >
                          {topic.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Backend Junior Requirements */}
        <Card className="bg-black border-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-[#9945e8]">
              <Server className="h-6 w-6 text-[#9945e8]" />
              <span>Requisitos para Backend Júnior</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Lista dos conhecimentos mais cobrados para um Desenvolvedor
              Backend Júnior com foco em Java
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Java Core */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#9945e8] flex items-center space-x-2">
                  <Code className="h-5 w-5 text-orange-400" />
                  <span>1. Java Core e Ecossistema</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <h4 className="font-medium text-gray-200">
                      Sintaxe e Fundamentos
                    </h4>
                    <ul className="text-sm text-gray-400 space-y-1 ml-4">
                      <li>
                        • Tipos de dados, operadores, estruturas de controle
                      </li>
                      <li>
                        • Orientação a Objetos (Classes, Herança, Polimorfismo)
                      </li>
                      <li>
                        • Interfaces, Classes Abstratas, Records (Java 16+)
                      </li>
                      <li>• Exceções (try-catch-finally)</li>
                      <li>• Collections Framework, Generics, Enums</li>
                    </ul>
                  </div>
                  <div className="space-y-2 bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <h4 className="font-medium text-gray-200">
                      Java Moderno (8+)
                    </h4>
                    <ul className="text-sm text-gray-400 space-y-1 ml-4">
                      <li>• Lambda Expressions</li>
                      <li>• Streams API (filter, map, reduce)</li>
                      <li>• Optional, métodos default</li>
                      <li>• Novidades Java 11, 17+</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Frameworks */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#9945e8] flex items-center space-x-2">
                  <Server className="h-5 w-5 text-green-400" />
                  <span>2. Frameworks Essenciais</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <h4 className="font-medium text-gray-200">
                      Spring Framework
                    </h4>
                    <ul className="text-sm text-gray-400 space-y-1 ml-4">
                      <li>• Spring Boot</li>
                      <li>• Spring MVC</li>
                      <li>• Spring Data JPA</li>
                      <li>• Spring Security</li>
                    </ul>
                  </div>
                  <div className="space-y-2 bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <h4 className="font-medium text-gray-200">
                      ORM e Build Tools
                    </h4>
                    <ul className="text-sm text-gray-400 space-y-1 ml-4">
                      <li>• Hibernate (ORM, JPQL)</li>
                      <li>• Maven ou Gradle</li>
                      <li>• Jakarta EE (Servlet API, JAX-RS)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Database */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#9945e8] flex items-center space-x-2">
                  <Database className="h-5 w-5 text-blue-400" />
                  <span>3. Bancos de Dados</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <h4 className="font-medium text-gray-200">SQL</h4>
                    <ul className="text-sm text-gray-400 space-y-1 ml-4">
                      <li>• MySQL, PostgreSQL, Oracle, H2</li>
                      <li>• Consultas (SELECT, JOIN, GROUP BY)</li>
                      <li>• Transações (ACID, isolation levels)</li>
                      <li>• Índices e otimização básica</li>
                    </ul>
                  </div>
                  <div className="space-y-2 bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <h4 className="font-medium text-gray-200">NoSQL</h4>
                    <ul className="text-sm text-gray-400 space-y-1 ml-4">
                      <li>• MongoDB</li>
                      <li>• Redis</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* APIs */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#9945e8] flex items-center space-x-2">
                  <Monitor className="h-5 w-5 text-purple-400" />
                  <span>4. APIs e Comunicação</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <h4 className="font-medium text-gray-200">RESTful APIs</h4>
                    <ul className="text-sm text-gray-400 space-y-1 ml-4">
                      <li>• Princípios REST, verbos HTTP</li>
                      <li>• Criação de endpoints (@RestController)</li>
                      <li>• Documentação com Swagger/OpenAPI</li>
                      <li>• Status codes, Richardson Maturity Model</li>
                    </ul>
                  </div>
                  <div className="space-y-2 bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <h4 className="font-medium text-gray-200">Autenticação</h4>
                    <ul className="text-sm text-gray-400 space-y-1 ml-4">
                      <li>• JWT (JSON Web Tokens)</li>
                      <li>• OAuth2 (fluxos básicos)</li>
                      <li>• GraphQL (opcional)</li>
                      <li>• SOAP (sistemas legados)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Architecture */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#9945e8] flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span>5. Arquitetura e Boas Práticas</span>
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2 bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <h4 className="font-medium text-gray-200">Arquitetura</h4>
                    <ul className="text-sm text-gray-400 space-y-1 ml-4">
                      <li>• MVC</li>
                      <li>• Clean Architecture</li>
                      <li>• DDD</li>
                      <li>• Microsserviços</li>
                    </ul>
                  </div>
                  <div className="space-y-2 bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <h4 className="font-medium text-gray-200">Princípios</h4>
                    <ul className="text-sm text-gray-400 space-y-1 ml-4">
                      <li>• SOLID</li>
                      <li>• Clean Code</li>
                      <li>• DI/IoC</li>
                      <li>• TDD</li>
                    </ul>
                  </div>
                  <div className="space-y-2 bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <h4 className="font-medium text-gray-200">
                      Design Patterns
                    </h4>
                    <ul className="text-sm text-gray-400 space-y-1 ml-4">
                      <li>• Singleton</li>
                      <li>• Factory</li>
                      <li>• Strategy</li>
                      <li>• Repository</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Differentials */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#9945e8] flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-amber-400" />
                  <span>6. Diferenciais</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <h4 className="font-medium text-gray-200">
                      Tecnologias Avançadas
                    </h4>
                    <ul className="text-sm text-gray-400 space-y-1 ml-4">
                      <li>• Mensageria (RabbitMQ, Kafka)</li>
                      <li>• Monitoramento (SLF4J, Prometheus, Grafana)</li>
                      <li>• Docker e Kubernetes</li>
                      <li>• Cloud (AWS, Azure, Google Cloud)</li>
                    </ul>
                  </div>
                  <div className="space-y-2 bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <h4 className="font-medium text-gray-200">Soft Skills</h4>
                    <ul className="text-sm text-gray-400 space-y-1 ml-4">
                      <li>• Metodologias Ágeis (Scrum, Kanban)</li>
                      <li>• Inglês Intermediário</li>
                      <li>• Git (branching strategy)</li>
                      <li>• Estruturas de Dados</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tips for Beginners */}
              <div className="bg-[#8a2be2]/20 p-4 rounded-lg border border-[#8a2be2]/30">
                <h3 className="text-lg font-semibold text-[#9945e8] mb-3 flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Dicas para Iniciantes</span>
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">
                    <strong>Foque primeiro em:</strong> Java Core + Spring Boot,
                    Banco de Dados SQL, REST APIs, Git e boas práticas.
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Para se destacar:</strong> Crie projetos pessoais no
                    GitHub, demonstre capacidade de aprender rápido e mantenha
                    uma boa base teórica e prática.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>
            Baseado no{" "}
            <a
              href="https://docs.google.com/document/d/12ek1Wsd_ibuwTOjHtLPZwEWdy5-A7cRoO2Bf-v5G1_s/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9945e8] hover:underline"
            >
              Roadmap Original
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
