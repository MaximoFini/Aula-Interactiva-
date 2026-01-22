"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Share2, Lock, Database, FileText, Cpu, MemoryStick } from "lucide-react"

export function ThreadSharing() {
  const sharedResources = [
    {
      icon: Database,
      title: "Memoria",
      description: "Espacio de direcciones del proceso",
      details: "Todos los hilos pueden acceder a las mismas variables globales y heap",
    },
    {
      icon: FileText,
      title: "Archivos",
      description: "Descriptores de archivos abiertos",
      details: "Los archivos abiertos por el proceso están disponibles para todos los hilos",
    },
    {
      icon: Share2,
      title: "Variables Globales",
      description: "Datos compartidos del programa",
      details: "Las variables globales y estáticas son accesibles por todos los hilos",
    },
  ]

  const privateResources = [
    {
      icon: Cpu,
      title: "Contador de Programa",
      description: "Posición actual de ejecución",
      details: "Cada hilo mantiene su propia posición en el código",
    },
    {
      icon: MemoryStick,
      title: "Pila (Stack)",
      description: "Memoria para variables locales",
      details: "Cada hilo tiene su propia pila para variables locales y llamadas a funciones",
    },
    {
      icon: Lock,
      title: "Variables Locales",
      description: "Datos privados del hilo",
      details: "Las variables locales son únicas para cada hilo",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-balance">Compartición de Recursos</h2>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Explora qué recursos comparten los hilos y cuáles mantienen privados
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recursos Compartidos */}
        <Card className="border-chart-1/20 bg-chart-1/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-1/20">
                <Share2 className="h-6 w-6 text-chart-1" />
              </div>
              <div>
                <CardTitle className="text-xl text-chart-1">Recursos Compartidos</CardTitle>
                <CardDescription>Lo que todos los hilos pueden acceder</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Badge variant="outline" className="bg-chart-1/10 text-chart-1 border-chart-1/30">
              ✅ Comparten
            </Badge>

            <div className="space-y-4">
              {sharedResources.map((resource, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-1/20">
                      <resource.icon className="h-4 w-4 text-chart-1" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{resource.title}</h4>
                      <p className="text-xs text-muted-foreground">{resource.description}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground ml-11">{resource.details}</p>
                  {index < sharedResources.length - 1 && <Separator className="mt-3" />}
                </div>
              ))}
            </div>

            <div className="bg-chart-1/10 p-4 rounded-lg">
              <p className="text-sm font-medium text-chart-1">💡 Ventaja: Comunicación directa y rápida entre hilos</p>
            </div>
          </CardContent>
        </Card>

        {/* Recursos Privados */}
        <Card className="border-chart-2/20 bg-chart-2/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/20">
                <Lock className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <CardTitle className="text-xl text-chart-2">Recursos Privados</CardTitle>
                <CardDescription>Lo que cada hilo mantiene por separado</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/30">
              ❌ No Comparten
            </Badge>

            <div className="space-y-4">
              {privateResources.map((resource, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-2/20">
                      <resource.icon className="h-4 w-4 text-chart-2" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{resource.title}</h4>
                      <p className="text-xs text-muted-foreground">{resource.description}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground ml-11">{resource.details}</p>
                  {index < privateResources.length - 1 && <Separator className="mt-3" />}
                </div>
              ))}
            </div>

            <div className="bg-chart-2/10 p-4 rounded-lg">
              <p className="text-sm font-medium text-chart-2">
                💡 Ventaja: Cada hilo puede ejecutar independientemente
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Diagrama Visual */}
      <Card className="border-chart-3/20 bg-chart-3/5">
        <CardHeader>
          <CardTitle className="text-xl text-chart-3">Diagrama de Compartición</CardTitle>
          <CardDescription>Visualización de cómo los hilos comparten recursos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Proceso Container */}
            <div className="border-2 border-chart-3/30 rounded-lg p-6 bg-chart-3/10">
              <h3 className="font-semibold text-chart-3 mb-4 text-center">Proceso</h3>

              {/* Shared Resources */}
              <div className="bg-chart-1/20 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-chart-1 mb-2 text-center">Recursos Compartidos</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-background/50 rounded p-2">
                    <Database className="h-6 w-6 text-chart-1 mx-auto mb-1" />
                    <p className="text-xs">Memoria</p>
                  </div>
                  <div className="bg-background/50 rounded p-2">
                    <FileText className="h-6 w-6 text-chart-1 mx-auto mb-1" />
                    <p className="text-xs">Archivos</p>
                  </div>
                  <div className="bg-background/50 rounded p-2">
                    <Share2 className="h-6 w-6 text-chart-1 mx-auto mb-1" />
                    <p className="text-xs">Variables</p>
                  </div>
                </div>
              </div>

              {/* Threads */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((threadNum) => (
                  <div key={threadNum} className="bg-chart-2/20 rounded-lg p-4">
                    <h4 className="font-semibold text-chart-2 mb-2 text-center">Hilo {threadNum}</h4>
                    <div className="space-y-2">
                      <div className="bg-background/50 rounded p-2 text-center">
                        <Cpu className="h-4 w-4 text-chart-2 mx-auto mb-1" />
                        <p className="text-xs">PC</p>
                      </div>
                      <div className="bg-background/50 rounded p-2 text-center">
                        <MemoryStick className="h-4 w-4 text-chart-2 mx-auto mb-1" />
                        <p className="text-xs">Pila</p>
                      </div>
                      <div className="bg-background/50 rounded p-2 text-center">
                        <Lock className="h-4 w-4 text-chart-2 mx-auto mb-1" />
                        <p className="text-xs">Vars</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-chart-3/10 p-4 rounded-lg">
              <p className="text-sm font-medium text-chart-3 text-center">
                🔄 Los hilos acceden a los recursos compartidos pero mantienen su contexto de ejecución privado
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
