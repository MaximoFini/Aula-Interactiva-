"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Terminal, Play, RotateCcw } from "lucide-react"

interface Command {
  command: string
  description: string
  example: string
  output: string
}

const commands: Command[] = [
  {
    command: "kill -9 PID",
    description: "Terminar proceso forzado",
    example: "kill -9 1234",
    output: "Proceso 1234 terminado forzosamente",
  },
  {
    command: "fg",
    description: "Traer proceso a foreground",
    example: "fg %1",
    output: "Proceso movido a primer plano",
  },
  {
    command: "bg",
    description: "Enviar proceso a background",
    example: "bg %1",
    output: "Proceso ejecutándose en segundo plano",
  },
  {
    command: "jobs",
    description: "Lista procesos suspendidos o en background",
    example: "jobs",
    output: "[1]+ Running    ./programa &\n[2]- Stopped   vim archivo.txt",
  },
  {
    command: "ps aux",
    description: "Lista todos los procesos del sistema",
    example: "ps aux",
    output:
      "USER  PID  %CPU %MEM    VSZ   RSS TTY   STAT START   TIME COMMAND\nroot    1   0.0  0.1  19356  1544 ?     Ss   10:00   0:01 /sbin/init\nuser 1234   2.1  1.5  45678  8912 pts/0 R+   10:30   0:05 ./programa",
  },
  {
    command: "top",
    description: "Monitor de procesos en tiempo real",
    example: "top",
    output:
      "PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND\n1234 user     20   0   45678   8912   2345 R  15.2  1.5   0:05.23 programa\n5678 user     20   0   23456   4567   1234 S   5.1  0.8   0:02.15 firefox",
  },
]

export function CommandSimulator() {
  const [currentCommand, setCurrentCommand] = useState("")
  const [output, setOutput] = useState<string[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])

  const executeCommand = () => {
    if (!currentCommand.trim()) return

    const matchedCommand = commands.find((cmd) =>
      currentCommand.toLowerCase().includes(cmd.command.toLowerCase().split(" ")[0]),
    )

    let result = ""
    if (matchedCommand) {
      result = matchedCommand.output
    } else {
      result = `bash: ${currentCommand}: command not found`
    }

    setOutput((prev) => [...prev, `$ ${currentCommand}`, result])
    setCommandHistory((prev) => [...prev, currentCommand])
    setCurrentCommand("")
  }

  const clearTerminal = () => {
    setOutput([])
    setCommandHistory([])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand()
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-balance">Simulador de Comandos</h2>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Practica comandos básicos para gestión de procesos en Linux
        </p>
      </div>

      {/* Command Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Comandos Disponibles
          </CardTitle>
          <CardDescription>Haz clic en un comando para probarlo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commands.map((cmd, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border cursor-pointer hover:bg-accent/5 transition-colors"
                onClick={() => setCurrentCommand(cmd.example)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    {cmd.command.split(" ")[0]}
                  </Badge>
                </div>
                <h4 className="font-semibold text-sm mb-1">{cmd.description}</h4>
                <p className="text-xs text-muted-foreground font-mono">{cmd.example}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Terminal Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              Terminal
            </CardTitle>
            <CardDescription>Simula la ejecución de comandos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Terminal Output */}
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm min-h-[200px] max-h-[300px] overflow-y-auto">
                {output.length === 0 ? (
                  <div className="text-green-400/60">Terminal listo. Escribe un comando...</div>
                ) : (
                  output.map((line, index) => (
                    <div key={index} className={line.startsWith("$") ? "text-yellow-400" : "text-green-400"}>
                      {line}
                    </div>
                  ))
                )}
              </div>

              {/* Command Input */}
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 bg-black text-green-400 p-2 rounded-lg font-mono text-sm">
                  <span className="text-yellow-400">$</span>
                  <Input
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe un comando..."
                    className="bg-transparent border-none text-green-400 placeholder:text-green-400/60 focus-visible:ring-0"
                  />
                </div>
                <Button onClick={executeCommand} size="sm">
                  <Play className="h-4 w-4" />
                </Button>
                <Button onClick={clearTerminal} variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Command Help */}
        <Card>
          <CardHeader>
            <CardTitle>Ayuda de Comandos</CardTitle>
            <CardDescription>Información detallada sobre cada comando</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {commands.map((cmd, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50 border">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="font-mono text-xs bg-primary">{cmd.command}</Badge>
                  </div>
                  <p className="text-sm font-semibold mb-1">{cmd.description}</p>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold">Ejemplo: </span>
                    <code className="bg-muted px-1 rounded">{cmd.example}</code>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Process States Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Estados de Procesos - Referencia Rápida</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { state: "R", name: "Running", desc: "Ejecutando", color: "bg-chart-2" },
              { state: "S", name: "Sleep", desc: "Suspendido (int.)", color: "bg-chart-1" },
              { state: "D", name: "Sleep", desc: "Suspendido (no int.)", color: "bg-chart-3" },
              { state: "T", name: "Stopped", desc: "Detenido", color: "bg-chart-4" },
              { state: "Z", name: "Zombie", desc: "Zombie", color: "bg-chart-5" },
              { state: "X", name: "Dead", desc: "Muerto", color: "bg-destructive" },
            ].map((item) => (
              <div key={item.state} className="text-center p-3 rounded-lg bg-muted/50 border">
                <Badge className={`${item.color} mb-2`}>{item.state}</Badge>
                <div className="text-xs font-semibold">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
