"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, FileText, Layers, Settings } from "lucide-react"

export function ProcessMemoryDiagram() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const memorysections = [
    {
      id: "pcb",
      name: "PCB",
      description: "Process Control Block - La ficha del proceso",
      color: "bg-chart-1",
      icon: Settings,
      details: "Contiene información de identificación, estado y control del proceso",
    },
    {
      id: "stack",
      name: "Pila del Sistema",
      description: "Stack con parámetros y direcciones de retorno",
      color: "bg-chart-2",
      icon: Layers,
      details: "Almacena variables locales, parámetros de funciones y direcciones de retorno",
    },
    {
      id: "program",
      name: "Programa de Usuario",
      description: "Código a ejecutar",
      color: "bg-chart-3",
      icon: FileText,
      details: "Contiene las instrucciones del programa que se van a ejecutar",
    },
    {
      id: "data",
      name: "Datos del Usuario",
      description: "Variables y datos modificables",
      color: "bg-chart-4",
      icon: Database,
      details: "Almacena variables globales, datos estáticos y heap para memoria dinámica",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-balance">Imagen de un Proceso en Memoria</h2>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Un proceso en memoria está compuesto por cuatro secciones principales
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Memory Diagram */}
        <Card>
          <CardHeader>
            <CardTitle>Estructura en Memoria</CardTitle>
            <CardDescription>Haz clic en cada sección para ver más detalles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {memorysections.map((section, index) => (
                <div
                  key={section.id}
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                    ${
                      selectedSection === section.id
                        ? "border-primary bg-primary/10 scale-105"
                        : "border-border hover:border-primary/50 hover:bg-accent/5"
                    }
                  `}
                  onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded ${section.color}/20`}>
                      <section.icon className={`h-4 w-4 text-${section.color.replace("bg-", "")}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{section.name}</h3>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Details Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Detalles de la Sección</CardTitle>
            <CardDescription>
              {selectedSection ? "Información detallada" : "Selecciona una sección para ver más información"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedSection ? (
              <div className="space-y-4">
                {(() => {
                  const section = memorysections.find((s) => s.id === selectedSection)
                  if (!section) return null

                  return (
                    <>
                      <div className="flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${section.color}/20`}>
                          <section.icon className={`h-6 w-6 text-${section.color.replace("bg-", "")}`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{section.name}</h3>
                          <p className="text-muted-foreground">{section.description}</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="text-sm">{section.details}</p>
                      </div>

                      {section.id === "pcb" && (
                        <div className="space-y-3">
                          <h4 className="font-semibold">Componentes del PCB:</h4>
                          <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="w-20 justify-center">
                                ID
                              </Badge>
                              <span className="text-sm">PID, proceso padre</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="w-20 justify-center">
                                Estado
                              </Badge>
                              <span className="text-sm">Registros CPU, contador programa</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="w-20 justify-center">
                                Control
                              </Badge>
                              <span className="text-sm">Planificación, memoria, recursos</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )
                })()}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Selecciona una sección del diagrama para ver información detallada</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Key Concepts */}
      <Card>
        <CardHeader>
          <CardTitle>Conceptos Clave</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-chart-1/10 border border-chart-1/20">
              <h4 className="font-semibold mb-2">📋 PCB es la clave</h4>
              <p className="text-sm text-muted-foreground">
                Cada proceso tiene su propio PCB. El SO los guarda en una tabla de procesos.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-chart-2/10 border border-chart-2/20">
              <h4 className="font-semibold mb-2">🔄 Gestión de memoria</h4>
              <p className="text-sm text-muted-foreground">
                El SO gestiona la asignación y liberación de memoria para cada sección del proceso.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
