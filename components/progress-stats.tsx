"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, Trophy, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

interface ProgressStatsProps {
  completedSteps: number[];
  completedExtras: string[];
  totalSteps: number;
  totalExtras: number;
}

export function ProgressStats({
  completedSteps,
  completedExtras,
  totalSteps,
  totalExtras,
}: ProgressStatsProps) {
  const stepsProgress = (completedSteps.length / totalSteps) * 100;
  const extrasProgress = (completedExtras.length / totalExtras) * 100;
  const overallProgress =
    ((completedSteps.length + completedExtras.length) /
      (totalSteps + totalExtras)) *
    100;
  const [lastActivity, setLastActivity] = useState<string | null>(null);

  const getProgressLevel = (progress: number) => {
    if (progress === 0)
      return { level: "Iniciante", color: "bg-gray-600 text-gray-200" };
    if (progress < 25)
      return { level: "Básico", color: "bg-green-600 text-green-100" };
    if (progress < 50)
      return { level: "Intermediário", color: "bg-blue-600 text-blue-100" };
    if (progress < 75)
      return { level: "Avançado", color: "bg-purple-600 text-purple-100" };
    if (progress < 100)
      return { level: "Expert", color: "bg-yellow-600 text-yellow-100" };
    return {
      level: "Mestre",
      color: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
    };
  };

  const currentLevel = getProgressLevel(overallProgress);
  /*  const lastActivity = localStorage.getItem("java-roadmap-last-activity") */

  useEffect(() => {
    const storedLastActivity = localStorage.getItem(
      "java-roadmap-last-activity"
    );
    if (storedLastActivity) {
      setLastActivity(storedLastActivity);
    } else {
      setLastActivity(null);
    }
  }, [completedSteps, completedExtras]);

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-[#9945e8]">
          <Trophy className="h-6 w-6" />
          <span>Estatísticas de Progresso</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Nível Atual */}
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-[#9945e8]">
              {Math.round(overallProgress)}%
            </div>
            <Badge className={currentLevel.color}>{currentLevel.level}</Badge>
            <p className="text-xs text-gray-400">Nível Atual</p>
          </div>

          {/* Passos Principais */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1">
              <Target className="h-4 w-4 text-blue-400" />
              <span className="text-lg font-semibold text-gray-200">
                {completedSteps.length}/{totalSteps}
              </span>
            </div>
            <div className="text-xs text-gray-400">Passos Principais</div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${stepsProgress}%` }}
              />
            </div>
          </div>

          {/* Tópicos Extras */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-lg font-semibold text-gray-200">
                {completedExtras.length}/{totalExtras}
              </span>
            </div>
            <div className="text-xs text-gray-400">Tópicos Extras</div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${extrasProgress}%` }}
              />
            </div>
          </div>

          {/* Última Atividade */}
          <div className="text-center space-y-2">
            <Calendar className="h-6 w-6 text-gray-400 mx-auto" />
            <div className="text-xs text-gray-400">Última Atividade</div>
            <div className="text-xs text-gray-300">
              {lastActivity
                ? new Date(lastActivity).toLocaleDateString("pt-BR")
                : "Nunca"}
            </div>
          </div>
        </div>

        {/* Conquistas */}
        <div className="mt-6 space-y-2">
          <h4 className="text-sm font-medium text-[#9945e8]">
            Conquistas Desbloqueadas:
          </h4>
          <div className="flex flex-wrap gap-2">
            {overallProgress >= 10 && (
              <Badge
                variant="outline"
                className="border-green-500 text-green-400"
              >
                🚀 Primeiro Passo
              </Badge>
            )}
            {completedSteps.length >= 5 && (
              <Badge
                variant="outline"
                className="border-blue-500 text-blue-400"
              >
                📚 Estudioso
              </Badge>
            )}
            {overallProgress >= 50 && (
              <Badge
                variant="outline"
                className="border-purple-500 text-purple-400"
              >
                💪 Meio Caminho
              </Badge>
            )}
            {completedExtras.length >= 10 && (
              <Badge
                variant="outline"
                className="border-yellow-500 text-yellow-400"
              >
                ⭐ Explorador
              </Badge>
            )}
            {overallProgress >= 100 && (
              <Badge
                variant="outline"
                className="border-pink-500 text-pink-400"
              >
                🏆 Mestre Java
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
