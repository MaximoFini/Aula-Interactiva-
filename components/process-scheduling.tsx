"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Zap, RotateCcw, TrendingUp, Users, Target } from "lucide-react"

export function ProcessScheduling() {
  const [activeAlgorithm, setActiveAlgorithm] = useState("fifo")
  const [simulation, setSimulation] = useState({ running: false, step: 0 })

  const algorithms = {
    fifo: {
      name: "FIFO (First In First Out)",
      icon: Clock,
      color: "text-chart-1",
      bgColor: "bg-chart-1/20",
      type: "No apropiativo",
      description: "El primer proceso en llegar es el primero en ejecutarse",
      characteristics: [
        "Orden de llegada",
        "No puede ser interrumpido",
        "Simple de implementar",
        "Procesos largos retrasan a los cortos",
      ],
      advantages: ["Sencillo", "Justo en orden"],
      disadvantages: ["Tiempo de espera alto", "Efecto convoy"],
    },
    sjf: {
      name: "SJF (Shortest Job First)",
      icon: Zap,
      color: "text-chart-2",
      bgColor: "bg-chart-2/20",
      type: "No apropiativo",
      description: "Ejecuta primero el proceso más corto",
      characteristics: [
        "Selecciona el trabajo más corto",
        "Minimiza tiempo promedio de espera",
        "Requiere conocer tiempo de ejecución",
        "Más eficiente que FIFO",
      ],
      advantages: ["Tiempo de espera mínimo", "Eficiente"],
      disadvantages: ["Inanición de procesos largos", "Difícil predecir tiempo"],
    },
    srtf: {
      name: "SRTF (Shortest Remaining Time First)",
      icon: RotateCcw,
      color: "text-chart-3",
      bgColor: "bg-chart-3/20",
      type: "Apropiativo",
      description: "Siempre ejecuta el proceso con menor tiempo restante",
      characteristics: [
        "Versión apropiativa de SJF",
        "Puede interrumpir proceso actual",
        "Siempre el menor tiempo restante",
        "Óptimo para tiempo de respuesta",
      ],
      advantages: ["Tiempo de respuesta mínimo", "Muy eficiente"],
      disadvantages: ["Overhead de cambio", "Inanición posible"],
    },
    "round-robin": {
      name: "Round Robin",
      icon: RotateCcw,
      color: "text-chart-4",
      bgColor: "bg-chart-4/20",
      type: "Apropiativo",
      description: "Cada proceso recibe un quantum de tiempo",
      characteristics: [
        "Quantum de tiempo fijo",
        "Si termina antes → sale",
        "Si no termina → final de cola",
        "Quantum crítico para rendimiento",
      ],
      advantages: ["Justo", "Buen tiempo de respuesta"],
      disadvantages: ["Overhead si quantum pequeño", "Como FIFO si quantum grande"],
    },
    priority: {
      name: "Prioridad",
      icon: TrendingUp,
      color: "text-chart-5",
      bgColor: "bg-chart-5/20",
      type: "Apropiativo/No apropiativo",
      description: "Ejecuta procesos según su prioridad",
      characteristics: [
        "Prioridad estática o dinámica",
        "Mayor prioridad → ejecuta primero",
        "Puede ser apropiativo",
        "Riesgo de inanición",
      ],
      advantages: ["Flexible", "Control fino"],
      disadvantages: ["Inanición", "Complejidad"],
    },
    multilevel: {
      name: "Colas Múltiples",
      icon: Users,
      color: "text-chart-1",
      bgColor: "bg-chart-1/20",
      type: "Apropiativo",
      description: "Procesos clasificados por prioridad en diferentes colas",
      characteristics: [
        "Colas por prioridad",
        "Quantums: 1, 2, 4, 8, 16...",
        "Se va duplicando",
        "Procesos bajan de nivel",
      ],
      advantages: ["Adaptativo", "Eficiente para mix de procesos"],
      disadvantages: ["Complejo", "Configuración crítica"],
    },
  }

  const schedulingTypes = [
    {
      name: "Largo Plazo",
      description: "Controla grado de multiprogramación",
      function: "Aceptar o no nuevos procesos",
    },
    {
      name: "Mediano Plazo",
      description: "Relacionado con swapping",
      function: "Mover procesos entre memoria y disco",
    },
    {
      name: "Corto Plazo",
      description: "Decide qué proceso va a ejecución",
      function: "Listo ↔ Ejecución",
    },
  ]

  const criteria = [
    "Equidad (todos con chance)",
    "Equilibrio (CPU, E/S ocupados)",
    "Minimizar tiempo de respuesta",
    "Minimizar tiempo de retorno",
    "Maximizar rendimiento",
  ]

  const ActiveAlgorithmIcon = algorithms[activeAlgorithm].icon
  const ActiveAlgorithmColor = algorithms[activeAlgorithm].color
  const ActiveAlgorithmBgColor = algorithms[activeAlgorithm].bgColor

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-balance">Planificación de Procesos</h2>
        <p className="text-muted-foreground text-pretty">Algoritmos y estrategias de planificación</p>
      </div>

      {/* Scheduling Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Tipos de Planificación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {schedulingTypes.map((type, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">{type.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{type.description}</p>
                <Badge variant="outline" className="text-xs">
                  {type.function}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Criteria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Criterios de Planificación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {criteria.map((criterion, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm">{criterion}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Algorithm Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.entries(algorithms).map(([key, algorithm]) => (
          <Button
            key={key}
            variant={activeAlgorithm === key ? "default" : "outline"}
            onClick={() => setActiveAlgorithm(key)}
            className="h-auto p-3 flex flex-col items-center gap-2"
          >
            <algorithm.icon className="h-5 w-5" />
            <span className="text-xs text-center">{algorithm.name}</span>
            <Badge variant="secondary" className="text-xs">
              {algorithm.type}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Current Algorithm Details */}
      <Card className="hover:bg-accent/5 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${ActiveAlgorithmBgColor}`}>
              <ActiveAlgorithmIcon className={`h-6 w-6 ${ActiveAlgorithmColor}`} />
            </div>
            <div>
              <CardTitle className="text-xl">{algorithms[activeAlgorithm].name}</CardTitle>
              <CardDescription>{algorithms[activeAlgorithm].description}</CardDescription>
              <Badge variant="outline" className="mt-1">
                {algorithms[activeAlgorithm].type}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Características:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {algorithms[activeAlgorithm].characteristics.map((char, index) => (
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
                  {algorithms[activeAlgorithm].advantages.map((advantage, index) => (
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
                  {algorithms[activeAlgorithm].disadvantages.map((disadvantage, index) => (
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

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Comparación Rápida - MC</CardTitle>
          <CardDescription>Diferencias clave para múltiple choice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Algoritmo</th>
                  <th className="text-left p-2">Tipo</th>
                  <th className="text-left p-2">Criterio</th>
                  <th className="text-left p-2">Problema Principal</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">FIFO</td>
                  <td className="p-2">No apropiativo</td>
                  <td className="p-2">Orden llegada</td>
                  <td className="p-2 text-destructive">Procesos largos retrasan cortos</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">SJF</td>
                  <td className="p-2">No apropiativo</td>
                  <td className="p-2">Trabajo más corto</td>
                  <td className="p-2 text-destructive">Inanición procesos largos</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">SRTF</td>
                  <td className="p-2 text-green-600">Apropiativo</td>
                  <td className="p-2">Menor tiempo restante</td>
                  <td className="p-2 text-orange-500">Overhead cambios</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Round Robin</td>
                  <td className="p-2 text-green-600">Apropiativo</td>
                  <td className="p-2">Quantum fijo</td>
                  <td className="p-2 text-orange-500">Quantum crítico</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Prioridad</td>
                  <td className="p-2">Ambos</td>
                  <td className="p-2">Prioridad</td>
                  <td className="p-2 text-destructive">Inanición</td>
                </tr>
              </tbody>
            </table>
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
              <h4 className="font-semibold mb-2">Identificadores:</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    apropiativo
                  </Badge>
                  <span className="text-sm">→ puede interrumpir</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    quantum
                  </Badge>
                  <span className="text-sm">→ Round Robin</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    más corto
                  </Badge>
                  <span className="text-sm">→ SJF/SRTF</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Trampas comunes:</h4>
              <ul className="text-sm space-y-1">
                <li>• SJF ≠ apropiativo (es SRTF)</li>
                <li>• Round Robin ≠ prioridad</li>
                <li>• Quantum grande ≠ eficiente</li>
                <li>• FIFO ≠ justo para todos</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
