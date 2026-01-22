"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { GitBranch, Package, Zap, Users } from "lucide-react"

export function ThreadVsProcess() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-balance">Proceso vs Hilo</h2>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Comprende las diferencias fundamentales entre procesos e hilos de ejecución
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Proceso */}
        <Card className="border-chart-1/20 bg-chart-1/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-1/20">
                <Package className="h-6 w-6 text-chart-1" />
              </div>
              <div>
                <CardTitle className="text-xl text-chart-1">Proceso</CardTitle>
                <CardDescription>Unidad de recursos</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Badge variant="outline" className="bg-chart-1/10 text-chart-1 border-chart-1/30">
                Unidad de Recursos
              </Badge>
              <p className="text-sm text-muted-foreground">
                Un proceso es la unidad básica de asignación de recursos del sistema operativo.
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold text-chart-1">Características:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-chart-1 mt-2 flex-shrink-0" />
                  <span>Tiene su propio espacio de memoria</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-chart-1 mt-2 flex-shrink-0" />
                  <span>Posee archivos y dispositivos asignados</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-chart-1 mt-2 flex-shrink-0" />
                  <span>Contiene al menos un hilo de ejecución</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-chart-1 mt-2 flex-shrink-0" />
                  <span>Aislado de otros procesos</span>
                </li>
              </ul>
            </div>

            <div className="bg-chart-1/10 p-4 rounded-lg">
              <p className="text-sm font-medium text-chart-1">
                💡 Concepto clave: El proceso es el "contenedor" que agrupa recursos
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Hilo */}
        <Card className="border-chart-2/20 bg-chart-2/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/20">
                <GitBranch className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <CardTitle className="text-xl text-chart-2">Hilo</CardTitle>
                <CardDescription>Unidad de ejecución</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/30">
                Unidad de Ejecución
              </Badge>
              <p className="text-sm text-muted-foreground">
                Un hilo es la unidad básica de ejecución dentro de un proceso.
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold text-chart-2">Características:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-2 flex-shrink-0" />
                  <span>Ejecuta instrucciones secuencialmente</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-2 flex-shrink-0" />
                  <span>Comparte recursos del proceso padre</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-2 flex-shrink-0" />
                  <span>Tiene su propio contador de programa</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-2 flex-shrink-0" />
                  <span>Posee su propia pila de ejecución</span>
                </li>
              </ul>
            </div>

            <div className="bg-chart-2/10 p-4 rounded-lg">
              <p className="text-sm font-medium text-chart-2">
                💡 Concepto clave: El hilo es la "línea de ejecución" dentro del proceso
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Relación */}
      <Card className="border-chart-3/20 bg-chart-3/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/20">
              <Users className="h-6 w-6 text-chart-3" />
            </div>
            <div>
              <CardTitle className="text-xl text-chart-3">Relación Proceso-Hilo</CardTitle>
              <CardDescription>Cómo interactúan entre sí</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-chart-3/20 mx-auto">
                <span className="text-2xl font-bold text-chart-3">1</span>
              </div>
              <h4 className="font-semibold">Todo proceso tiene al menos un hilo</h4>
              <p className="text-sm text-muted-foreground">
                Cuando se crea un proceso, automáticamente se crea un hilo principal
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-chart-3/20 mx-auto">
                <span className="text-2xl font-bold text-chart-3">N</span>
              </div>
              <h4 className="font-semibold">Un proceso puede tener múltiples hilos</h4>
              <p className="text-sm text-muted-foreground">
                Los hilos adicionales se crean para ejecutar tareas en paralelo
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-chart-3/20 mx-auto">
                <Zap className="h-8 w-8 text-chart-3" />
              </div>
              <h4 className="font-semibold">Los hilos comparten el contexto</h4>
              <p className="text-sm text-muted-foreground">
                Todos los hilos de un proceso comparten memoria y recursos
              </p>
            </div>
          </div>

          <div className="bg-chart-3/10 p-6 rounded-lg">
            <h4 className="font-semibold text-chart-3 mb-3">Analogía:</h4>
            <p className="text-sm">
              <strong>Proceso</strong> = Una empresa con oficina, empleados y recursos
              <br />
              <strong>Hilos</strong> = Los empleados trabajando en diferentes tareas, compartiendo la oficina y recursos
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
