"use client"

import { CommandSimulator } from "@/components/command-simulator"
import { ShellScriptReference } from "@/components/shell-script-reference"
import { ShellScriptExercises } from "@/components/shell-script-exercises"
import { CommandReference } from "@/components/command-reference"
import {
  Cpu,
  Database,
  Terminal,
  Zap,
  Settings,
  Monitor,
  GitBranch,
  Share2,
  TrendingUp,
  Activity,
  Layers,
  Network,
  MessageSquare,
  Clock,
  Container,
  Shield,
  Target,
  Star,
  Code,
  BookOpen,
  Play,
} from "lucide-react"
import { ProcessMemoryDiagram } from "@/components/process-memory-diagram"
import { PCBViewer } from "@/components/pcb-viewer"
import { ProcessStateSimulator } from "@/components/process-state-simulator"
import { KernelFunctions } from "@/components/kernel-functions"
import { ExecutionModes } from "@/components/execution-modes"
import { ThreadVsProcess } from "@/components/thread-vs-process"
import { ThreadSharing } from "@/components/thread-sharing"
import { ThreadAdvantages } from "@/components/thread-advantages"
import { ThreadStates } from "@/components/thread-states"
import { ThreadImplementations } from "@/components/thread-implementations"
import { GoldenBullets } from "@/components/golden-bullets"
import { MCTraps } from "@/components/mc-traps"
import { SMPMicrokernels } from "@/components/smp-microkernels"
import { IPCCommunication } from "@/components/ipc-communication"
import { ProcessScheduling } from "@/components/process-scheduling"
import { DockerContainers } from "@/components/docker-containers"
import { SystemSecurity } from "@/components/system-security"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProcessLearningDashboard() {
  const [activeSection, setActiveSection] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Cpu className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-balance">Aula Interactiva - Sistemas Operativos</h1>
                <p className="text-sm text-muted-foreground">
                  Preparación Multiple Choice + Shell Scripts - Unidades 3-6
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-accent/20 text-accent">
                Multiple Choice
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Shell Scripts
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border bg-card/30">
        <div className="container mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {[
              { id: "overview", label: "Resumen", icon: Monitor },
              { id: "golden-bullets", label: "Balas de Oro", icon: Star },
              { id: "mc-traps", label: "Trampas MC", icon: Target },
              { id: "command-reference", label: "Comandos", icon: BookOpen },
              { id: "shell-exercises", label: "Shell Scripts", icon: Code },
              { id: "shell-practice", label: "Práctica", icon: Play },
              { id: "memory", label: "Memoria", icon: Database },
              { id: "pcb", label: "PCB", icon: Settings },
              { id: "states", label: "Estados", icon: Zap },
              { id: "kernel", label: "Núcleo", icon: Cpu },
              { id: "commands", label: "Terminal", icon: Terminal },
              { id: "thread-vs-process", label: "Proceso vs Hilo", icon: GitBranch },
              { id: "thread-sharing", label: "Compartición", icon: Share2 },
              { id: "thread-advantages", label: "Ventajas", icon: TrendingUp },
              { id: "thread-states", label: "Estados Hilos", icon: Activity },
              { id: "thread-implementations", label: "Implementaciones", icon: Layers },
              { id: "smp-microkernels", label: "SMP/Micronúcleos", icon: Network },
              { id: "ipc", label: "IPC", icon: MessageSquare },
              { id: "scheduling", label: "Planificación", icon: Clock },
              { id: "docker", label: "Docker", icon: Container },
              { id: "security", label: "Seguridad", icon: Shield },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveSection(item.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeSection === "overview" && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-balance">Aula Interactiva - Sistemas Operativos</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Preparación completa para examen: múltiple choice, shell scripts y comandos Linux
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card
                className="cursor-pointer hover:bg-accent/5 transition-colors bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20"
                onClick={() => setActiveSection("golden-bullets")}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Balas de Oro</CardTitle>
                      <CardDescription>Conceptos clave para MC</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Definiciones cortas, diferencias clave y palabras ancla para responder rápido
                  </p>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:bg-accent/5 transition-colors bg-gradient-to-br from-destructive/10 to-orange-500/10 border-destructive/20"
                onClick={() => setActiveSection("mc-traps")}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/20">
                      <Target className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Trampas de MC</CardTitle>
                      <CardDescription>Confusiones típicas</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Errores comunes en exámenes y cómo evitarlos</p>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:bg-accent/5 transition-colors bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20"
                onClick={() => setActiveSection("command-reference")}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20">
                      <BookOpen className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Comandos Linux</CardTitle>
                      <CardDescription>Referencia completa</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Todos los comandos del parcial con ejemplos y sintaxis
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-500">Parte Práctica - Shell Scripts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card
                    className="cursor-pointer hover:bg-accent/5 transition-colors"
                    onClick={() => setActiveSection("command-reference")}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20">
                          <BookOpen className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Comandos</CardTitle>
                          <CardDescription>Referencia rápida</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Compresión, tar, split, ps, top, nice, cron, variables y más
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className="cursor-pointer hover:bg-accent/5 transition-colors"
                    onClick={() => setActiveSection("shell-exercises")}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                          <Code className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">22 Ejercicios</CardTitle>
                          <CardDescription>Shell scripts resueltos</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Ejercicios completos con parámetros posicionales, bucles y condicionales
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className="cursor-pointer hover:bg-accent/5 transition-colors"
                    onClick={() => setActiveSection("shell-practice")}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                          <Play className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Práctica</CardTitle>
                          <CardDescription>Simulador interactivo</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Crea y prueba tus propios shell scripts paso a paso
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-chart-1">Unidad 3.2 - Procesos</h3>
              </div>
            </div>
          </div>
        )}

        {activeSection === "memory" && <ProcessMemoryDiagram />}
        {activeSection === "pcb" && <PCBViewer />}
        {activeSection === "states" && <ProcessStateSimulator />}
        {activeSection === "kernel" && <KernelFunctions />}
        {activeSection === "commands" && <CommandSimulator />}
        {activeSection === "modes" && <ExecutionModes />}

        {activeSection === "thread-vs-process" && <ThreadVsProcess />}
        {activeSection === "thread-sharing" && <ThreadSharing />}
        {activeSection === "thread-advantages" && <ThreadAdvantages />}
        {activeSection === "thread-states" && <ThreadStates />}
        {activeSection === "thread-implementations" && <ThreadImplementations />}

        {activeSection === "golden-bullets" && <GoldenBullets />}
        {activeSection === "mc-traps" && <MCTraps />}
        {activeSection === "smp-microkernels" && <SMPMicrokernels />}
        {activeSection === "ipc" && <IPCCommunication />}
        {activeSection === "scheduling" && <ProcessScheduling />}
        {activeSection === "docker" && <DockerContainers />}
        {activeSection === "security" && <SystemSecurity />}

        {activeSection === "command-reference" && <CommandReference />}
        {activeSection === "shell-exercises" && <ShellScriptExercises />}
        {activeSection === "shell-practice" && <ShellScriptReference />}
      </main>
    </div>
  )
}
