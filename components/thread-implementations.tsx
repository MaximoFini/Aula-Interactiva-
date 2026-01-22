"use client"

import React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Layers, User, Shield, CheckCircle, XCircle, Cpu } from "lucide-react"
import { useState } from "react"

export function ThreadImplementations() {
  const [selectedImplementation, setSelectedImplementation] = useState<"ult" | "klt" | null>(null)

  const implementations = {
    ult: {
      name: "ULT - User Level Threads",
      subtitle: "Hilos a Nivel Usuario",
      description: "Administrados en espacio de usuario por una biblioteca de hilos",
      color: "chart-1",
      icon: User,
      characteristics: [
        "El kernel no sabe que existen los hilos",
        "Administrados por biblioteca de hilos",
        "Cambio de contexto muy rápido",
        "Portables entre sistemas operativos",
        "Un solo hilo por proceso desde la perspectiva del kernel",
      ],
      advantages: [
        "Cambio de hilo extremadamente rápido",
        "No requiere llamadas al sistema",
        "Portables entre diferentes SO",
        "Menor overhead del sistema",
        "Control total sobre la planificación",
      ],
      disadvantages: [
        "Si un hilo se bloquea, se bloquean todos",
        "No aprovechan sistemas multiprocesador",
        "No hay paralelismo real",
        "Dependientes de cooperación entre hilos",
        "Limitados por el quantum del proceso",
      ],
    },
    klt: {
      name: "KLT - Kernel Level Threads",
      subtitle: "Hilos a Nivel Kernel",
      description: "Administrados directamente por el kernel del sistema operativo",
      color: "chart-2",
      icon: Shield,
      characteristics: [
        "El kernel conoce y administra cada hilo",
        "Cada hilo es una entidad planificable",
        "Cambio de contexto más costoso",
        "Requieren llamadas al sistema",
        "Soporte nativo del sistema operativo",
      ],
      advantages: [
        "Aprovechan sistemas multiprocesador",
        "Si un hilo se bloquea, otros pueden continuar",
        "Paralelismo real entre hilos",
        "Mejor para aplicaciones intensivas en E/S",
        "Planificación justa entre hilos",
      ],
      disadvantages: [
        "Cambio de contexto más costoso",
        "Requiere pasar a modo kernel",
        "Mayor overhead del sistema",
        "Menos portables",
        "Limitados por recursos del kernel",
      ],
    },
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-balance">Implementaciones de Hilos</h2>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Compara las dos principales implementaciones: hilos a nivel usuario vs hilos a nivel kernel
        </p>
      </div>

      {/* Implementation Selector */}
      <div className="flex justify-center gap-4">
        <Button
          variant={selectedImplementation === "ult" ? "default" : "outline"}
          onClick={() => setSelectedImplementation(selectedImplementation === "ult" ? null : "ult")}
          className="flex items-center gap-2"
        >
          <User className="h-4 w-4" />
          ULT - Usuario
        </Button>
        <Button
          variant={selectedImplementation === "klt" ? "default" : "outline"}
          onClick={() => setSelectedImplementation(selectedImplementation === "klt" ? null : "klt")}
          className="flex items-center gap-2"
        >
          <Shield className="h-4 w-4" />
          KLT - Kernel
        </Button>
      </div>

      {/* Detailed View */}
      {selectedImplementation && (
        <Card
          className={`border-${implementations[selectedImplementation].color}/20 bg-${implementations[selectedImplementation].color}/5`}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${implementations[selectedImplementation].color}/20`}
              >
                {React.createElement(implementations[selectedImplementation].icon, {
                  className: `h-6 w-6 text-${implementations[selectedImplementation].color}`,
                })}
              </div>
              <div>
                <CardTitle className="text-xl">{implementations[selectedImplementation].name}</CardTitle>
                <CardDescription>{implementations[selectedImplementation].subtitle}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm">{implementations[selectedImplementation].description}</p>

            <div className="space-y-4">
              <h4 className="font-semibold">Características:</h4>
              <ul className="space-y-2">
                {implementations[selectedImplementation].characteristics.map((char, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div
                      className={`w-1.5 h-1.5 rounded-full bg-${implementations[selectedImplementation].color} mt-2 flex-shrink-0`}
                    />
                    <span>{char}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <h4 className="font-semibold text-green-700">Ventajas</h4>
                </div>
                <ul className="space-y-2">
                  {implementations[selectedImplementation].advantages.map((adv, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <h4 className="font-semibold text-red-700">Desventajas</h4>
                </div>
                <ul className="space-y-2">
                  {implementations[selectedImplementation].disadvantages.map((dis, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      <span>{dis}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Object.entries(implementations).map(([key, impl]) => (
          <Card key={key} className={`border-${impl.color}/20 bg-${impl.color}/5`}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${impl.color}/20`}>
                  <impl.icon className={`h-5 w-5 text-${impl.color}`} />
                </div>
                <div>
                  <CardTitle className="text-lg">{impl.name}</CardTitle>
                  <CardDescription>{impl.subtitle}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{impl.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Velocidad de cambio</span>
                  <Badge variant="outline" className={key === "ult" ? "text-green-600" : "text-yellow-600"}>
                    {key === "ult" ? "Muy rápida" : "Moderada"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Paralelismo</span>
                  <Badge variant="outline" className={key === "klt" ? "text-green-600" : "text-red-600"}>
                    {key === "klt" ? "Sí" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Bloqueo independiente</span>
                  <Badge variant="outline" className={key === "klt" ? "text-green-600" : "text-red-600"}>
                    {key === "klt" ? "Sí" : "No"}
                  </Badge>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
                onClick={() => setSelectedImplementation(key as "ult" | "klt")}
              >
                Ver detalles
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Architecture Diagrams */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Arquitecturas de Implementación
          </CardTitle>
          <CardDescription>Visualización de cómo se organizan los hilos en cada implementación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ULT Architecture */}
            <div className="space-y-4">
              <h4 className="font-semibold text-chart-1 text-center">User Level Threads (ULT)</h4>
              <div className="space-y-3">
                {/* User Space */}
                <div className="border-2 border-chart-1/30 rounded-lg p-4 bg-chart-1/10">
                  <h5 className="font-semibold text-chart-1 mb-3 text-center">Espacio de Usuario</h5>
                  <div className="space-y-2">
                    <div className="bg-background/80 rounded p-2 text-center text-sm">Biblioteca de Hilos</div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-chart-1/20 rounded p-2 text-center text-xs">
                          Hilo {i}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Kernel Space */}
                <div className="border-2 border-muted rounded-lg p-4 bg-muted/20">
                  <h5 className="font-semibold text-muted-foreground mb-3 text-center">Espacio de Kernel</h5>
                  <div className="bg-background/80 rounded p-2 text-center text-sm">Un solo proceso</div>
                </div>
              </div>
            </div>

            {/* KLT Architecture */}
            <div className="space-y-4">
              <h4 className="font-semibold text-chart-2 text-center">Kernel Level Threads (KLT)</h4>
              <div className="space-y-3">
                {/* User Space */}
                <div className="border-2 border-chart-2/30 rounded-lg p-4 bg-chart-2/10">
                  <h5 className="font-semibold text-chart-2 mb-3 text-center">Espacio de Usuario</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-chart-2/20 rounded p-2 text-center text-xs">
                        Hilo {i}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kernel Space */}
                <div className="border-2 border-chart-2/30 rounded-lg p-4 bg-chart-2/10">
                  <h5 className="font-semibold text-chart-2 mb-3 text-center">Espacio de Kernel</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-chart-2/20 rounded p-2 text-center text-xs">
                        KLT {i}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            Comparación de Rendimiento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Aspecto</th>
                  <th className="text-center p-2 text-chart-1">ULT</th>
                  <th className="text-center p-2 text-chart-2">KLT</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b">
                  <td className="p-2 font-medium">Velocidad de creación</td>
                  <td className="p-2 text-center">
                    <Badge className="bg-green-100 text-green-800">Muy rápida</Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge className="bg-yellow-100 text-yellow-800">Moderada</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Cambio de contexto</td>
                  <td className="p-2 text-center">
                    <Badge className="bg-green-100 text-green-800">Muy rápido</Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge className="bg-yellow-100 text-yellow-800">Lento</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Paralelismo real</td>
                  <td className="p-2 text-center">
                    <Badge className="bg-red-100 text-red-800">No</Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge className="bg-green-100 text-green-800">Sí</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Bloqueo independiente</td>
                  <td className="p-2 text-center">
                    <Badge className="bg-red-100 text-red-800">No</Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge className="bg-green-100 text-green-800">Sí</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Overhead del sistema</td>
                  <td className="p-2 text-center">
                    <Badge className="bg-green-100 text-green-800">Bajo</Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge className="bg-yellow-100 text-yellow-800">Alto</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
