"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Container, Server, Layers, Network, HardDrive, Shield } from "lucide-react"

export function DockerContainers() {
  const [activeSection, setActiveSection] = useState("vm-vs-container")

  const sections = {
    "vm-vs-container": {
      name: "VMs vs Contenedores",
      icon: Container,
      color: "text-chart-1",
      bgColor: "bg-chart-1/20",
    },
    technologies: {
      name: "Tecnologías Linux",
      icon: Layers,
      color: "text-chart-2",
      bgColor: "bg-chart-2/20",
    },
    docker: {
      name: "Docker Platform",
      icon: Server,
      color: "text-chart-3",
      bgColor: "bg-chart-3/20",
    },
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-balance">Docker y Contenedores</h2>
        <p className="text-muted-foreground text-pretty">Contenedores vs VMs, tecnologías y ventajas</p>
      </div>

      {/* Section Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {Object.entries(sections).map(([key, section]) => (
          <Button
            key={key}
            variant={activeSection === key ? "default" : "outline"}
            onClick={() => setActiveSection(key)}
            className="h-auto p-4 flex flex-col items-center gap-2"
          >
            <section.icon className="h-6 w-6" />
            <span className="text-sm text-center">{section.name}</span>
          </Button>
        ))}
      </div>

      {activeSection === "vm-vs-container" && (
        <div className="space-y-6">
          {/* Problem with VMs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Server className="h-5 w-5" />
                Problema de las Máquinas Virtuales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <h4 className="font-semibold mb-2">Arquitectura VM:</h4>
                  <p className="text-sm font-mono">SO host + hipervisor + SO guest + app</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-destructive">Problemas:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Configuración difícil de repetir</li>
                      <li>• "Funciona en mi máquina" pero no en otra</li>
                      <li>• Recursos desperdiciados (SO guest)</li>
                      <li>• Arranque lento</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Recursos consumidos:</h4>
                    <div className="space-y-2">
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                        SO completo por VM
                      </Badge>
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                        RAM duplicada
                      </Badge>
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                        Overhead hipervisor
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Container Solution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Container className="h-5 w-5" />
                Solución: Contenedores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <h4 className="font-semibold mb-2">Arquitectura Contenedor:</h4>
                  <p className="text-sm font-mono">SO host + núcleo + bibliotecas compartidas + apps</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600">Ventajas:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• No necesitan SO guest</li>
                      <li>• Más livianos y rápidos</li>
                      <li>• Arranque instantáneo</li>
                      <li>• Portabilidad total</li>
                      <li>• Reproducibilidad</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Características:</h4>
                    <div className="space-y-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                        Aislamiento de procesos
                      </Badge>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                        Kernel compartido
                      </Badge>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                        Sin dependencias
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Comparación VM vs Contenedor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Aspecto</th>
                      <th className="text-left p-2">Máquina Virtual</th>
                      <th className="text-left p-2">Contenedor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">SO Guest</td>
                      <td className="p-2 text-destructive">❌ Necesario</td>
                      <td className="p-2 text-green-600">✅ No necesario</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Arranque</td>
                      <td className="p-2 text-destructive">❌ Minutos</td>
                      <td className="p-2 text-green-600">✅ Segundos</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Recursos</td>
                      <td className="p-2 text-destructive">❌ Altos</td>
                      <td className="p-2 text-green-600">✅ Bajos</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">Portabilidad</td>
                      <td className="p-2 text-orange-500">⚠️ Limitada</td>
                      <td className="p-2 text-green-600">✅ Total</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeSection === "technologies" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Tecnologías de Linux para Contenedores
              </CardTitle>
              <CardDescription>Tres pilares fundamentales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Namespaces */}
                <div className="p-4 bg-chart-1/5 border border-chart-1/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Network className="h-6 w-6 text-chart-1" />
                    <h4 className="font-semibold text-chart-1">namespaces</h4>
                  </div>
                  <p className="text-sm mb-3">Cada contenedor cree tener su propio sistema</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Badge variant="outline" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                      Procesos aislados
                    </Badge>
                    <Badge variant="outline" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                      Red separada
                    </Badge>
                    <Badge variant="outline" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                      Sistema de archivos
                    </Badge>
                  </div>
                </div>

                {/* cgroups */}
                <div className="p-4 bg-chart-2/5 border border-chart-2/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="h-6 w-6 text-chart-2" />
                    <h4 className="font-semibold text-chart-2">cgroups</h4>
                  </div>
                  <p className="text-sm mb-3">Limitan el consumo de recursos</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                      Límites CPU
                    </Badge>
                    <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                      Límites memoria
                    </Badge>
                    <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                      Control E/S
                    </Badge>
                  </div>
                </div>

                {/* OverlayFS */}
                <div className="p-4 bg-chart-3/5 border border-chart-3/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <HardDrive className="h-6 w-6 text-chart-3" />
                    <h4 className="font-semibold text-chart-3">OverlayFS</h4>
                  </div>
                  <p className="text-sm mb-3">Sistema de archivos en capas</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Badge variant="outline" className="bg-chart-3/10 text-chart-3 border-chart-3/20">
                      Capas read-only
                    </Badge>
                    <Badge variant="outline" className="bg-chart-3/10 text-chart-3 border-chart-3/20">
                      Capa write
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technology Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detalles Técnicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">¿Cómo funciona el aislamiento?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="font-medium text-sm">namespaces</p>
                      <p className="text-xs text-muted-foreground">Aísla la vista del sistema</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="font-medium text-sm">cgroups</p>
                      <p className="text-xs text-muted-foreground">Controla recursos disponibles</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="font-medium text-sm">OverlayFS</p>
                      <p className="text-xs text-muted-foreground">Gestiona archivos eficientemente</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeSection === "docker" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Container className="h-5 w-5" />
                Docker Platform
              </CardTitle>
              <CardDescription>Plataforma para crear y ejecutar contenedores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Componentes principales:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h5 className="font-medium mb-2">Dockerfile</h5>
                      <p className="text-sm text-muted-foreground mb-2">Script que define el ambiente</p>
                      <Badge variant="outline" className="text-xs">
                        Instrucciones de construcción
                      </Badge>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h5 className="font-medium mb-2">Docker Hub</h5>
                      <p className="text-sm text-muted-foreground mb-2">Repositorio de imágenes</p>
                      <Badge variant="outline" className="text-xs">
                        Imágenes pre-construidas
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-green-600">Ventajas de Docker:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-600" />
                      <span className="text-sm">Portabilidad</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-600" />
                      <span className="text-sm">Reproducibilidad</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-600" />
                      <span className="text-sm">Sin problemas de dependencias</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold mb-2">Flujo típico:</h4>
                  <div className="space-y-2 text-sm font-mono">
                    <p>1. Escribir Dockerfile</p>
                    <p>2. docker build → crear imagen</p>
                    <p>3. docker run → ejecutar contenedor</p>
                    <p>4. docker push → subir a registry</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* MC Tips */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <CardTitle>Palabras Clave para MC</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Docker vs VM:</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    SO guest
                  </Badge>
                  <span className="text-sm">→ VM sí, Docker no</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    kernel compartido
                  </Badge>
                  <span className="text-sm">→ Docker</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    hipervisor
                  </Badge>
                  <span className="text-sm">→ Solo VM</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Tecnologías:</h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">
                  namespaces
                </Badge>
                <Badge variant="outline" className="text-xs">
                  cgroups
                </Badge>
                <Badge variant="outline" className="text-xs">
                  OverlayFS
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Dockerfile
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
