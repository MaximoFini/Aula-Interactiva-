"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Zap, Moon, Skull, Square } from "lucide-react"

interface ProcessState {
  id: string
  name: string
  description: string
  color: string
  icon: any
  transitions: string[]
}

const processStates: ProcessState[] = [
  {
    id: "R",
    name: "Running",
    description: "Ejecutando en CPU",
    color: "bg-chart-2",
    icon: Play,
    transitions: ["S", "D", "T", "Z"],
  },
  {
    id: "S",
    name: "Sleep (Interruptible)",
    description: "Suspendido, espera interrumpible",
    color: "bg-chart-1",
    icon: Moon,
    transitions: ["R", "T", "Z"],
  },
  {
    id: "D",
    name: "Sleep (Uninterruptible)",
    description: "Suspendido, espera no interrumpible",
    color: "bg-chart-3",
    icon: Pause,
    transitions: ["R", "Z"],
  },
  {
    id: "T",
    name: "Stopped",
    description: "Detenido por señal",
    color: "bg-chart-4",
    icon: Square,
    transitions: ["R", "Z"],
  },
  {
    id: "Z",
    name: "Zombie",
    description: "Terminó pero conserva PCB",
    color: "bg-chart-5",
    icon: Skull,
    transitions: ["X"],
  },
  {
    id: "X",
    name: "Dead",
    description: "Muerto, PCB liberado",
    color: "bg-destructive",
    icon: Zap,
    transitions: [],
  },
]

export function ProcessStateSimulator() {
  const [currentState, setCurrentState] = useState("R")
  const [isSimulating, setIsSimulating] = useState(false)
  const [history, setHistory] = useState<string[]>(["R"])

  const currentStateObj = processStates.find((s) => s.id === currentState)!

  useEffect(() => {
    if (isSimulating && currentState !== "X") {
      const timer = setTimeout(() => {
        const possibleTransitions = currentStateObj.transitions
        if (possibleTransitions.length > 0) {
          const nextState = possibleTransitions[Math.floor(Math.random() * possibleTransitions.length)]
          setCurrentState(nextState)
          setHistory((prev) => [...prev, nextState])
        }
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [currentState, isSimulating, currentStateObj.transitions])

  const handleTransition = (newState: string) => {
    setCurrentState(newState)
    setHistory((prev) => [...prev, newState])
  }

  const resetSimulation = () => {
    setCurrentState("R")
    setHistory(["R"])
    setIsSimulating(false)
  }

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating)
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-balance">Estados de Procesos en Linux</h2>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Simula las transiciones entre los diferentes estados del ciclo de vida de un proceso
        </p>
      </div>

      {/* Current State Display */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${currentStateObj.color}/20`}>
                  <currentStateObj.icon className={`h-6 w-6 text-${currentStateObj.color.replace("bg-", "")}`} />
                </div>
                Estado Actual: {currentStateObj.name}
              </CardTitle>
              <CardDescription>{currentStateObj.description}</CardDescription>
            </div>
            <Badge className={`${currentStateObj.color} text-white text-lg px-4 py-2`}>{currentStateObj.id}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              onClick={toggleSimulation}
              variant={isSimulating ? "destructive" : "default"}
              disabled={currentState === "X"}
            >
              {isSimulating ? "Pausar" : "Simular Auto"}
            </Button>
            <Button onClick={resetSimulation} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reiniciar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* State Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Diagrama de Estados</CardTitle>
            <CardDescription>Todos los estados posibles de un proceso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {processStates.map((state) => (
                <div
                  key={state.id}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                    ${
                      currentState === state.id
                        ? "border-primary bg-primary/10 scale-105"
                        : "border-border hover:border-primary/50"
                    }
                  `}
                  onClick={() => !isSimulating && handleTransition(state.id)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded ${state.color}/20`}>
                      <state.icon className={`h-4 w-4 text-${state.color.replace("bg-", "")}`} />
                    </div>
                    <Badge className={state.color}>{state.id}</Badge>
                  </div>
                  <h4 className="font-semibold text-sm">{state.name}</h4>
                  <p className="text-xs text-muted-foreground">{state.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transitions */}
        <Card>
          <CardHeader>
            <CardTitle>Transiciones Posibles</CardTitle>
            <CardDescription>Desde el estado actual: {currentStateObj.name}</CardDescription>
          </CardHeader>
          <CardContent>
            {currentStateObj.transitions.length > 0 ? (
              <div className="space-y-3">
                {currentStateObj.transitions.map((stateId) => {
                  const targetState = processStates.find((s) => s.id === stateId)!
                  return (
                    <Button
                      key={stateId}
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => !isSimulating && handleTransition(stateId)}
                      disabled={isSimulating}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-6 w-6 items-center justify-center rounded ${targetState.color}/20`}>
                          <targetState.icon className={`h-3 w-3 text-${targetState.color.replace("bg-", "")}`} />
                        </div>
                        <span>{targetState.name}</span>
                        <Badge variant="secondary">{stateId}</Badge>
                      </div>
                    </Button>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Skull className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay transiciones posibles desde este estado</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Estados</CardTitle>
          <CardDescription>Secuencia de transiciones del proceso</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {history.map((stateId, index) => {
              const state = processStates.find((s) => s.id === stateId)!
              return (
                <div key={index} className="flex items-center gap-1">
                  <Badge className={state.color}>{state.id}</Badge>
                  {index < history.length - 1 && <span className="text-muted-foreground">→</span>}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
