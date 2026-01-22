"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Clock, MessageSquare, Cpu, Zap, Users } from "lucide-react"
import { useState, useEffect } from "react"

export function ThreadAdvantages() {
  const [creationTime, setCreationTime] = useState(0)
  const [switchTime, setSwitchTime] = useState(0)
  const [terminationTime, setTerminationTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCreationTime((prev) => (prev < 100 ? prev + 2 : 0))
      setSwitchTime((prev) => (prev < 100 ? prev + 3 : 0))
      setTerminationTime((prev) => (prev < 100 ? prev + 4 : 0))
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const advantages = [
    {
      icon: Clock,
      title: "Creación Rápida",
      description: "Crear un hilo es más rápido que crear un proceso",
      detail: "Los hilos comparten recursos existentes, no necesitan duplicar memoria",
      color: "chart-1",
    },
    {
      icon: Zap,
      title: "Cambio de Contexto Eficiente",
      description: "Cambiar entre hilos es menos costoso",
      detail: "No hay que cambiar el espacio de direcciones, solo registros y pila",
      color: "chart-2",
    },
    {
      icon: MessageSquare,
      title: "Comunicación Directa",
      description: "Los hilos se comunican fácilmente",
      detail: "Comparten memoria, no necesitan IPC (Inter-Process Communication)",
      color: "chart-3",
    },
    {
      icon: Users,
      title: "Terminación Económica",
      description: "Terminar un hilo consume menos recursos",
      detail: "Solo se libera la pila y registros, no todo el espacio de memoria",
      color: "chart-4",
    },
    {
      icon: Cpu,
      title: "Aprovechamiento de SMP",
      description: "Mejor uso de sistemas multiprocesador",
      detail: "Diferentes hilos pueden ejecutarse en diferentes CPUs simultáneamente",
      color: "chart-5",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-balance">Ventajas de los Hilos</h2>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Descubre por qué los hilos son más eficientes que los procesos tradicionales
        </p>
      </div>

      {/* Performance Comparison */}
      <Card className="border-chart-1/20 bg-chart-1/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-1/20">
              <TrendingUp className="h-6 w-6 text-chart-1" />
            </div>
            <div>
              <CardTitle className="text-xl text-chart-1">Comparación de Rendimiento</CardTitle>
              <CardDescription>Hilos vs Procesos en operaciones comunes</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Creación</span>
                <Badge variant="outline" className="bg-chart-1/10 text-chart-1">
                  {creationTime}% más rápido
                </Badge>
              </div>
              <Progress value={creationTime} className="h-2" />
              <p className="text-xs text-muted-foreground">Los hilos reutilizan recursos del proceso padre</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cambio de Contexto</span>
                <Badge variant="outline" className="bg-chart-2/10 text-chart-2">
                  {switchTime}% más rápido
                </Badge>
              </div>
              <Progress value={switchTime} className="h-2" />
              <p className="text-xs text-muted-foreground">No hay que cambiar el espacio de direcciones</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Terminación</span>
                <Badge variant="outline" className="bg-chart-3/10 text-chart-3">
                  {terminationTime}% más rápido
                </Badge>
              </div>
              <Progress value={terminationTime} className="h-2" />
              <p className="text-xs text-muted-foreground">Solo se liberan recursos específicos del hilo</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advantages.map((advantage, index) => (
          <Card key={index} className={`border-${advantage.color}/20 bg-${advantage.color}/5`}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${advantage.color}/20`}>
                  <advantage.icon className={`h-5 w-5 text-${advantage.color}`} />
                </div>
                <div>
                  <CardTitle className={`text-lg text-${advantage.color}`}>{advantage.title}</CardTitle>
                  <CardDescription>{advantage.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{advantage.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SMP Visualization */}
      <Card className="border-chart-5/20 bg-chart-5/5">
        <CardHeader>
          <CardTitle className="text-xl text-chart-5">Aprovechamiento de Multiprocesadores (SMP)</CardTitle>
          <CardDescription>Cómo los hilos mejoran el rendimiento en sistemas con múltiples CPUs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Single Process */}
            <div className="space-y-4">
              <h4 className="font-semibold text-chart-2">Proceso Único</h4>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((cpu) => (
                  <div key={cpu} className="flex items-center gap-3">
                    <Badge variant="outline" className="w-16">
                      CPU {cpu}
                    </Badge>
                    <div className="flex-1 h-8 bg-muted rounded">
                      {cpu === 1 && (
                        <div className="h-full w-3/4 bg-chart-2 rounded flex items-center justify-center">
                          <span className="text-xs text-white font-medium">Proceso A</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Solo una CPU está siendo utilizada, las demás permanecen inactivas
              </p>
            </div>

            {/* Multiple Threads */}
            <div className="space-y-4">
              <h4 className="font-semibold text-chart-1">Múltiples Hilos</h4>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((cpu) => (
                  <div key={cpu} className="flex items-center gap-3">
                    <Badge variant="outline" className="w-16">
                      CPU {cpu}
                    </Badge>
                    <div className="flex-1 h-8 bg-muted rounded">
                      <div className="h-full w-full bg-chart-1 rounded flex items-center justify-center">
                        <span className="text-xs text-white font-medium">Hilo {cpu}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Todas las CPUs están trabajando en paralelo, maximizando el rendimiento
              </p>
            </div>
          </div>

          <div className="bg-chart-5/10 p-4 rounded-lg">
            <p className="text-sm font-medium text-chart-5 text-center">
              🚀 Los hilos permiten paralelismo real en sistemas multiprocesador
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="border-chart-3/20 bg-chart-3/5">
        <CardHeader>
          <CardTitle className="text-xl text-chart-3">Resumen de Ventajas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-chart-3">Eficiencia:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-chart-3 mt-2 flex-shrink-0" />
                  <span>Menor overhead en creación y destrucción</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-chart-3 mt-2 flex-shrink-0" />
                  <span>Cambios de contexto más rápidos</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-chart-3 mt-2 flex-shrink-0" />
                  <span>Mejor utilización de recursos del sistema</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-chart-3">Funcionalidad:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-chart-3 mt-2 flex-shrink-0" />
                  <span>Comunicación directa entre hilos</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-chart-3 mt-2 flex-shrink-0" />
                  <span>Paralelismo real en sistemas SMP</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-chart-3 mt-2 flex-shrink-0" />
                  <span>Mejor responsividad de aplicaciones</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
