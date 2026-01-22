"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Share2, Lock, Clock, Shield } from "lucide-react"

export function IPCCommunication() {
  const [activeMethod, setActiveMethod] = useState("shared-memory")
  const [simulationStep, setSimulationStep] = useState(0)

  const methods = {
    "shared-memory": {
      name: "Memoria Compartida",
      icon: Share2,
      color: "text-chart-1",
      bgColor: "bg-chart-1/20",
      description: "Procesos leen/escriben en un espacio común de memoria",
      characteristics: [
        "Espacio común de lectura/escritura",
        "Acceso directo a datos",
        "Requiere sincronización",
        "Más rápido que mensajes",
      ],
      advantages: ["Velocidad alta", "Eficiencia"],
      disadvantages: ["Problemas de sincronización", "Sección crítica"],
    },
    messages: {
      name: "Paso de Mensajes",
      icon: MessageSquare,
      color: "text-chart-2",
      bgColor: "bg-chart-2/20",
      description: "Emisor envía datos al receptor",
      characteristics: [
        "Emisor → Receptor",
        "Puede ser síncrono o asíncrono",
        "Usa buffer en asíncrono",
        "Incluye ACK y control de errores",
      ],
      advantages: ["No hay sección crítica", "Más seguro"],
      disadvantages: ["Más lento", "Overhead de comunicación"],
    },
  }

  const executionTypes = [
    {
      name: "Secuencial",
      description: "Un proceso termina, luego comienza otro",
      timeline: "P1 ——————— P2 ——————— P3",
    },
    {
      name: "Concurrente",
      description: "Procesos se superponen en el tiempo",
      timeline: "P1 ————————\n   P2 ————————\n      P3 ————————",
    },
  ]

  const currentMethod = methods[activeMethod]
  const CurrentIcon = currentMethod.icon

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-balance">Comunicación entre Procesos (IPC)</h2>
        <p className="text-muted-foreground text-pretty">Métodos de comunicación y sincronización</p>
      </div>

      {/* Execution Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Tipos de Ejecución
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {executionTypes.map((type, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant={index === 0 ? "secondary" : "default"}>{type.name}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{type.description}</p>
                <div className="bg-muted/30 p-3 rounded-lg font-mono text-xs">
                  {type.timeline.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Communication Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(methods).map(([key, method]) => (
          <Button
            key={key}
            variant={activeMethod === key ? "default" : "outline"}
            onClick={() => setActiveMethod(key)}
            className="h-auto p-4 flex flex-col items-center gap-2"
          >
            <method.icon className="h-6 w-6" />
            <span className="text-sm text-center">{method.name}</span>
          </Button>
        ))}
      </div>

      {/* Current Method Details */}
      <Card className="hover:bg-accent/5 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${currentMethod.bgColor}`}>
              <CurrentIcon className={`h-6 w-6 ${currentMethod.color}`} />
            </div>
            <div>
              <CardTitle className="text-xl">{currentMethod.name}</CardTitle>
              <CardDescription>{currentMethod.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Características:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentMethod.characteristics.map((char, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm">{char}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-600">Ventajas</h4>
                <div className="space-y-2">
                  {currentMethod.advantages.map((advantage, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-green-500/10 text-green-600 border-green-500/20 mr-2"
                    >
                      {advantage}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-destructive">Desventajas</h4>
                <div className="space-y-2">
                  {currentMethod.disadvantages.map((disadvantage, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-destructive/10 text-destructive border-destructive/20 mr-2"
                    >
                      {disadvantage}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Sección Crítica y Exclusión Mutua
          </CardTitle>
          <CardDescription>Conceptos clave para sincronización</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Definiciones:</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="font-medium text-sm">Competencia</p>
                    <p className="text-xs text-muted-foreground">
                      Dos procesos acceden a recurso compartido al mismo tiempo
                    </p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="font-medium text-sm">Sección Crítica</p>
                    <p className="text-xs text-muted-foreground">Parte del programa que usa recursos compartidos</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="font-medium text-sm">Exclusión Mutua</p>
                    <p className="text-xs text-muted-foreground">Solo un proceso en sección crítica a la vez</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Implementaciones:</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Con espera ocupada</Badge>
                    <span className="text-sm text-muted-foreground">Busy waiting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Sin espera ocupada</Badge>
                    <span className="text-sm text-muted-foreground">SLEEP / WAKEUP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Message Reliability */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Fiabilidad en Mensajes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Mecanismos:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">ACK</Badge>
                  <span className="text-sm">Confirma entrega</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Reintentos</Badge>
                  <span className="text-sm">Si no llega ACK</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">CRC</Badge>
                  <span className="text-sm">Control de integridad</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Autenticación</Badge>
                  <span className="text-sm">Verificar emisor</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Tipos de Comunicación:</h4>
              <div className="space-y-3">
                <div className="p-3 bg-chart-1/10 rounded-lg border border-chart-1/20">
                  <p className="font-medium text-sm text-chart-1">Síncrona</p>
                  <p className="text-xs text-muted-foreground">Emisor espera respuesta</p>
                </div>
                <div className="p-3 bg-chart-2/10 rounded-lg border border-chart-2/20">
                  <p className="font-medium text-sm text-chart-2">Asíncrona</p>
                  <p className="text-xs text-muted-foreground">Usa buffer, no espera respuesta</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* MC Tips */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <CardTitle>Palabras Clave para MC</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Memoria Compartida:</h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">
                  espacio común
                </Badge>
                <Badge variant="outline" className="text-xs">
                  sección crítica
                </Badge>
                <Badge variant="outline" className="text-xs">
                  exclusión mutua
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Mensajes:</h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">
                  emisor/receptor
                </Badge>
                <Badge variant="outline" className="text-xs">
                  buffer
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ACK
                </Badge>
                <Badge variant="outline" className="text-xs">
                  síncrono/asíncrono
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
