"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, MemoryStick, HardDrive, Shield, Settings } from "lucide-react"

interface KernelFunction {
  id: string
  name: string
  description: string
  icon: any
  color: string
  details: string[]
  examples: string[]
}

const kernelFunctions: KernelFunction[] = [
  {
    id: "processes",
    name: "Gestión de Procesos",
    description: "Crear, planificar, terminar y sincronizar procesos",
    icon: Cpu,
    color: "bg-chart-1",
    details: [
      "Creación y destrucción de procesos",
      "Planificación de CPU (scheduling)",
      "Cambios de contexto",
      "Sincronización entre procesos",
      "Comunicación interprocesos (IPC)",
    ],
    examples: [
      "fork() - crear proceso hijo",
      "exec() - ejecutar programa",
      "wait() - esperar proceso hijo",
      "kill() - terminar proceso",
    ],
  },
  {
    id: "memory",
    name: "Gestión de Memoria",
    description: "Reserva, swapping, paginación y segmentación",
    icon: MemoryStick,
    color: "bg-chart-2",
    details: [
      "Asignación y liberación de memoria",
      "Memoria virtual y paginación",
      "Segmentación de memoria",
      "Swapping (intercambio)",
      "Protección de memoria",
    ],
    examples: [
      "malloc() - asignar memoria",
      "free() - liberar memoria",
      "mmap() - mapear memoria",
      "brk() - cambiar heap",
    ],
  },
  {
    id: "io",
    name: "Gestión de E/S",
    description: "Buffers, canales y dispositivos de entrada/salida",
    icon: HardDrive,
    color: "bg-chart-3",
    details: [
      "Manejo de dispositivos",
      "Buffers de E/S",
      "Canales de comunicación",
      "Interrupciones de hardware",
      "Drivers de dispositivos",
    ],
    examples: [
      "read() - leer archivo",
      "write() - escribir archivo",
      "open() - abrir archivo",
      "ioctl() - control dispositivo",
    ],
  },
  {
    id: "support",
    name: "Funciones de Soporte",
    description: "Interrupciones, auditoría y monitorización",
    icon: Shield,
    color: "bg-chart-4",
    details: [
      "Manejo de interrupciones",
      "Auditoría del sistema",
      "Monitorización de recursos",
      "Gestión de errores",
      "Logging del sistema",
    ],
    examples: [
      "signal() - manejo señales",
      "syslog() - log sistema",
      "getrusage() - uso recursos",
      "alarm() - temporizador",
    ],
  },
]

export function KernelFunctions() {
  const [selectedFunction, setSelectedFunction] = useState("processes")

  const currentFunction = kernelFunctions.find((f) => f.id === selectedFunction)!

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-balance">Funciones del Núcleo</h2>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Explora las principales funciones que realiza el kernel del sistema operativo
        </p>
      </div>

      {/* Function Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kernelFunctions.map((func) => (
          <Card
            key={func.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedFunction === func.id
                ? "border-primary bg-primary/5 scale-105"
                : "hover:border-primary/50 hover:bg-accent/5"
            }`}
            onClick={() => setSelectedFunction(func.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${func.color}/20`}>
                  <func.icon className={`h-5 w-5 text-${func.color.replace("bg-", "")}`} />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-sm">{func.name}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">{func.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${currentFunction.color}/20`}>
                <currentFunction.icon className={`h-5 w-5 text-${currentFunction.color.replace("bg-", "")}`} />
              </div>
              {currentFunction.name}
            </CardTitle>
            <CardDescription>{currentFunction.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Funciones Principales:</h4>
                <div className="space-y-2">
                  {currentFunction.details.map((detail, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5 text-xs">
                        {index + 1}
                      </Badge>
                      <span className="text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ejemplos de System Calls</CardTitle>
            <CardDescription>Llamadas al sistema relacionadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentFunction.examples.map((example, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50 border">
                  <div className="font-mono text-sm font-semibold text-primary">{example.split(" - ")[0]}</div>
                  <div className="text-xs text-muted-foreground mt-1">{example.split(" - ")[1]}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kernel Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Arquitectura del Kernel
          </CardTitle>
          <CardDescription>Cómo interactúan las diferentes funciones del núcleo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Capas del Sistema</h4>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-chart-1/10 border border-chart-1/20">
                  <div className="font-semibold text-sm">Aplicaciones de Usuario</div>
                  <div className="text-xs text-muted-foreground">Programas y procesos del usuario</div>
                </div>
                <div className="p-3 rounded-lg bg-chart-2/10 border border-chart-2/20">
                  <div className="font-semibold text-sm">System Calls</div>
                  <div className="text-xs text-muted-foreground">Interfaz entre usuario y kernel</div>
                </div>
                <div className="p-3 rounded-lg bg-chart-3/10 border border-chart-3/20">
                  <div className="font-semibold text-sm">Kernel</div>
                  <div className="text-xs text-muted-foreground">Núcleo del sistema operativo</div>
                </div>
                <div className="p-3 rounded-lg bg-chart-4/10 border border-chart-4/20">
                  <div className="font-semibold text-sm">Hardware</div>
                  <div className="text-xs text-muted-foreground">CPU, memoria, dispositivos</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Interacciones</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Badge className="bg-chart-1">Procesos</Badge>
                  <span>↔</span>
                  <Badge className="bg-chart-2">Memoria</Badge>
                  <span className="text-xs text-muted-foreground">Asignación de memoria</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-chart-1">Procesos</Badge>
                  <span>↔</span>
                  <Badge className="bg-chart-3">E/S</Badge>
                  <span className="text-xs text-muted-foreground">Operaciones de archivo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-chart-4">Soporte</Badge>
                  <span>→</span>
                  <Badge className="bg-chart-1">Procesos</Badge>
                  <span className="text-xs text-muted-foreground">Interrupciones y señales</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
