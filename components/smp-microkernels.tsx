"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Network, Cpu, Server, Layers, Check, X, Zap } from "lucide-react"

export function SMPMicrokernels() {
  const [activeArchitecture, setActiveArchitecture] = useState("master-slave")
  const [simulationRunning, setSimulationRunning] = useState(false)

  const architectures = {
    "master-slave": {
      name: "Maestro/Esclavo",
      icon: Server,
      color: "text-chart-1",
      bgColor: "bg-chart-1/20",
      description: "CPU maestro controla todo, esclavos solo ejecutan programas de usuario",
      advantages: ["Diseño simple", "Control centralizado"],
      disadvantages: ["Cuello de botella", "Punto único de fallo", "No escalable"],
      details: [
        "CPU maestro → único que ejecuta el SO",
        "CPUs esclavas → solo programas de usuario",
        "Maestro controla memoria y E/S",
        "Si falla el maestro, falla todo el sistema",
      ],
    },
    smp: {
      name: "SMP (Symmetric Multiprocessing)",
      icon: Network,
      color: "text-chart-2",
      bgColor: "bg-chart-2/20",
      description: "Todos los procesadores son iguales y pueden ejecutar el SO",
      advantages: ["No hay cuello de botella", "Tolerancia a fallos", "Escalabilidad", "Auto-planificación"],
      disadvantages: ["Conflictos de acceso", "Sincronización compleja"],
      details: [
        "Varios procesadores iguales",
        "Todos ejecutan el SO",
        "Comparten memoria y E/S",
        "Cada CPU se auto-planifica",
      ],
    },
    microkernel: {
      name: "Micronúcleo",
      icon: Layers,
      color: "text-chart-3",
      bgColor: "bg-chart-3/20",
      description: "Solo funciones básicas en el núcleo, resto en modo usuario",
      advantages: ["Extensible", "Flexible", "Portable", "Más confiable"],
      disadvantages: ["Más lento", "Overhead de mensajes"],
      details: [
        "Solo funciones básicas en kernel",
        "Memoria, comunicación, interrupciones",
        "Servicios del SO en modo usuario",
        "Comunicación por paso de mensajes",
      ],
    },
    cluster: {
      name: "Clusters",
      icon: Cpu,
      color: "text-chart-4",
      bgColor: "bg-chart-4/20",
      description: "Conjunto de computadoras interconectadas que actúan como una",
      advantages: ["Alta disponibilidad", "Alto rendimiento", "Escalabilidad horizontal"],
      disadvantages: ["Complejidad de red", "Latencia entre nodos"],
      details: [
        "Conjunto de computadoras (nodos)",
        "Interconectadas por red",
        "Actúan como una sola máquina",
        "Distribución de carga de trabajo",
      ],
    },
  }

  const currentArch = architectures[activeArchitecture]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-balance">SMP y Micronúcleos</h2>
        <p className="text-muted-foreground text-pretty">Arquitecturas multiprocesador y diseños de núcleo</p>
      </div>

      {/* Architecture Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(architectures).map(([key, arch]) => (
          <Button
            key={key}
            variant={activeArchitecture === key ? "default" : "outline"}
            onClick={() => setActiveArchitecture(key)}
            className="h-auto p-3 flex flex-col items-center gap-2"
          >
            <arch.icon className="h-5 w-5" />
            <span className="text-xs text-center">{arch.name}</span>
          </Button>
        ))}
      </div>

      {/* Current Architecture Details */}
      <Card className="hover:bg-accent/5 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${currentArch.bgColor}`}>
              <currentArch.icon className={`h-6 w-6 ${currentArch.color}`} />
            </div>
            <div>
              <CardTitle className="text-xl">{currentArch.name}</CardTitle>
              <CardDescription>{currentArch.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Details */}
            <div>
              <h4 className="font-semibold mb-3">Características:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentArch.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Advantages and Disadvantages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-600 flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Ventajas
                </h4>
                <div className="space-y-2">
                  {currentArch.advantages.map((advantage, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                        {advantage}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-destructive flex items-center gap-2">
                  <X className="h-4 w-4" />
                  Desventajas
                </h4>
                <div className="space-y-2">
                  {currentArch.disadvantages.map((disadvantage, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                        {disadvantage}
                      </Badge>
                    </div>
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
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Comparación Rápida - MC
          </CardTitle>
          <CardDescription>Diferencias clave para múltiple choice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Aspecto</th>
                  <th className="text-left p-2">Maestro/Esclavo</th>
                  <th className="text-left p-2">SMP</th>
                  <th className="text-left p-2">Micronúcleo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Control del SO</td>
                  <td className="p-2">Solo CPU maestro</td>
                  <td className="p-2">Todos los CPUs</td>
                  <td className="p-2">Funciones mínimas</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Cuello de botella</td>
                  <td className="p-2 text-destructive">❌ Sí</td>
                  <td className="p-2 text-green-600">✅ No</td>
                  <td className="p-2 text-orange-500">⚠️ Mensajes</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Tolerancia a fallos</td>
                  <td className="p-2 text-destructive">❌ Baja</td>
                  <td className="p-2 text-green-600">✅ Alta</td>
                  <td className="p-2 text-green-600">✅ Alta</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Complejidad</td>
                  <td className="p-2 text-green-600">✅ Simple</td>
                  <td className="p-2 text-orange-500">⚠️ Media</td>
                  <td className="p-2 text-destructive">❌ Alta</td>
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
              <h4 className="font-semibold mb-2">Si ves estas palabras:</h4>
              <div className="space-y-1">
                <Badge variant="outline" className="mr-1">
                  "cuello de botella"
                </Badge>
                <span className="text-sm">→ Maestro/Esclavo</span>
              </div>
              <div className="space-y-1">
                <Badge variant="outline" className="mr-1">
                  "auto-planificación"
                </Badge>
                <span className="text-sm">→ SMP</span>
              </div>
              <div className="space-y-1">
                <Badge variant="outline" className="mr-1">
                  "paso de mensajes"
                </Badge>
                <span className="text-sm">→ Micronúcleo</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Trampas comunes:</h4>
              <ul className="text-sm space-y-1">
                <li>• SMP ≠ tiene CPU maestro</li>
                <li>• Micronúcleo ≠ más rápido</li>
                <li>• Cluster ≠ un solo computador</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
