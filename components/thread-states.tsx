"use client"

import React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Play, Pause, Square, AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"

export function ThreadStates() {
  const [currentState, setCurrentState] = useState("ready")
  const [isRunning, setIsRunning] = useState(false)
  const [stateHistory, setStateHistory] = useState<string[]>([])

  const states = {
    ready: {
      name: "Listo",
      description: "El hilo está preparado para ejecutarse",
      color: "chart-2",
      icon: Pause,
      detail: "El hilo está en la cola de listos esperando ser asignado a un procesador",
    },
    running: {
      name: "Ejecutando",
      description: "El hilo está siendo ejecutado por el procesador",
      color: "chart-1",
      icon: Play,
      detail: "El hilo tiene control del procesador y está ejecutando instrucciones",
    },
    blocked: {
      name: "Bloqueado",
      description: "El hilo está esperando por un recurso o evento",
      color: "chart-3",
      icon: Square,
      detail: "El hilo no puede continuar hasta que se complete una operación de E/S o se libere un recurso",
    },
  }

  const transitions = [
    {
      from: "ready",
      to: "running",
      trigger: "Asignación de CPU",
      description: "El planificador selecciona el hilo para ejecución",
    },
    {
      from: "running",
      to: "ready",
      trigger: "Fin de quantum / Interrupción",
      description: "El hilo es desalojado del procesador",
    },
    {
      from: "running",
      to: "blocked",
      trigger: "Operación de E/S",
      description: "El hilo solicita una operación que requiere espera",
    },
    {
      from: "blocked",
      to: "ready",
      trigger: "Completar E/S",
      description: "La operación solicitada se completa",
    },
  ]

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        const possibleStates = Object.keys(states)
        const nextState = possibleStates[Math.floor(Math.random() * possibleStates.length)]
        setCurrentState(nextState)
        setStateHistory((prev) => [...prev.slice(-4), nextState])
      }, 2000)

      return () => clearInterval(timer)
    }
  }, [isRunning])

  const handleStateChange = (newState: string) => {
    setCurrentState(newState)
    setStateHistory((prev) => [...prev.slice(-4), newState])
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-balance">Estados de Hilos</h2>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Simula las transiciones entre los diferentes estados de un hilo durante su ejecución
        </p>
      </div>

      {/* Current State Display */}
      <Card
        className={`border-${states[currentState as keyof typeof states].color}/20 bg-${states[currentState as keyof typeof states].color}/5`}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${states[currentState as keyof typeof states].color}/20`}
              >
                <Activity className={`h-6 w-6 text-${states[currentState as keyof typeof states].color}`} />
              </div>
              <div>
                <CardTitle className="text-xl">Estado Actual del Hilo</CardTitle>
                <CardDescription>Simulador interactivo de estados</CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={isRunning ? "destructive" : "default"}
                size="sm"
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? "Detener" : "Simular"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-3">
            <div
              className={`inline-flex h-20 w-20 items-center justify-center rounded-full bg-${states[currentState as keyof typeof states].color}/20`}
            >
              {React.createElement(states[currentState as keyof typeof states].icon, {
                className: `h-10 w-10 text-${states[currentState as keyof typeof states].color}`,
              })}
            </div>
            <div>
              <h3 className={`text-2xl font-bold text-${states[currentState as keyof typeof states].color}`}>
                {states[currentState as keyof typeof states].name}
              </h3>
              <p className="text-muted-foreground">{states[currentState as keyof typeof states].description}</p>
            </div>
          </div>

          <div className={`bg-${states[currentState as keyof typeof states].color}/10 p-4 rounded-lg`}>
            <p className="text-sm text-center">{states[currentState as keyof typeof states].detail}</p>
          </div>

          {stateHistory.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Historial de Estados:</h4>
              <div className="flex gap-2 flex-wrap">
                {stateHistory.map((state, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className={`bg-${states[state as keyof typeof states].color}/10 text-${states[state as keyof typeof states].color}`}
                  >
                    {states[state as keyof typeof states].name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* State Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Control Manual de Estados</CardTitle>
          <CardDescription>Haz clic en un estado para simular la transición</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(states).map(([key, state]) => (
              <Button
                key={key}
                variant={currentState === key ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => handleStateChange(key)}
              >
                <state.icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-semibold">{state.name}</div>
                  <div className="text-xs text-muted-foreground">{state.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* State Transitions */}
      <Card>
        <CardHeader>
          <CardTitle>Transiciones de Estado</CardTitle>
          <CardDescription>Eventos que causan cambios entre estados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transitions.map((transition, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                <Badge
                  variant="outline"
                  className={`bg-${states[transition.from as keyof typeof states].color}/10 text-${states[transition.from as keyof typeof states].color}`}
                >
                  {states[transition.from as keyof typeof states].name}
                </Badge>
                <div className="flex-1 text-center">
                  <div className="text-sm font-medium">{transition.trigger}</div>
                  <div className="text-xs text-muted-foreground">{transition.description}</div>
                </div>
                <Badge
                  variant="outline"
                  className={`bg-${states[transition.to as keyof typeof states].color}/10 text-${states[transition.to as keyof typeof states].color}`}
                >
                  {states[transition.to as keyof typeof states].name}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Process Suspension Note */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/20">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-lg text-destructive">Suspensión de Proceso</CardTitle>
              <CardDescription>Comportamiento especial cuando se suspende un proceso</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              <strong>Regla importante:</strong> Si se suspende un proceso, se suspenden automáticamente todos sus
              hilos.
            </p>
            <div className="bg-destructive/10 p-3 rounded-lg">
              <p className="text-sm text-destructive">
                💡 Esto significa que los hilos no pueden ejecutarse independientemente si su proceso padre está
                suspendido.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
