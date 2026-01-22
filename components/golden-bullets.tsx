"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Zap, Target, AlertTriangle } from "lucide-react"

export function GoldenBullets() {
  const bullets = [
    {
      category: "Procesos vs Hilos",
      icon: Star,
      color: "text-chart-1",
      bgColor: "bg-chart-1/20",
      items: [
        "Proceso = programa en ejecución con PCB propio",
        "Hilo = unidad de ejecución dentro de un proceso",
        "Hilos comparten: código, datos, archivos abiertos",
        "Hilos NO comparten: registros, pila, contador de programa",
      ],
    },
    {
      category: "Arquitecturas",
      icon: Zap,
      color: "text-chart-2",
      bgColor: "bg-chart-2/20",
      items: [
        "Maestro/Esclavo = cuello de botella en CPU maestro",
        "SMP = todos los CPUs ejecutan SO, auto-planificación",
        "Micronúcleo = solo funciones básicas en kernel",
        "Cluster = nodos interconectados como una máquina",
      ],
    },
    {
      category: "Planificación",
      icon: Target,
      color: "text-chart-3",
      bgColor: "bg-chart-3/20",
      items: [
        "FIFO = no apropiativo, procesos largos retrasan cortos",
        "SJF = más eficiente que FIFO, ejecuta el más corto",
        "Round Robin = quantum fijo, si no termina va al final",
        "SRTF = apropiativo, siempre el menor tiempo restante",
      ],
    },
    {
      category: "IPC",
      icon: AlertTriangle,
      color: "text-chart-4",
      bgColor: "bg-chart-4/20",
      items: [
        "Memoria compartida = espacio común de lectura/escritura",
        "Mensajes = emisor → receptor (síncrono/asíncrono)",
        "Sección crítica = solo un proceso a la vez",
        "Exclusión mutua = garantiza acceso único a recurso",
      ],
    },
    {
      category: "Docker",
      icon: Star,
      color: "text-chart-5",
      bgColor: "bg-chart-5/20",
      items: [
        "Contenedor ≠ VM (no necesita SO guest)",
        "namespaces = aislamiento de procesos, red, FS",
        "cgroups = límites de recursos (CPU, memoria)",
        "OverlayFS = capas read-only + write",
      ],
    },
    {
      category: "Seguridad",
      icon: Zap,
      color: "text-chart-1",
      bgColor: "bg-chart-1/20",
      items: [
        "CIA = Confidencialidad, Integridad, Disponibilidad",
        "Ataque pasivo = no altera (sniffing)",
        "Ataque activo = modifica/bloquea (DoS)",
        "Virus ≠ Gusano (virus necesita huésped)",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-balance flex items-center justify-center gap-2">
          <Star className="h-6 w-6 text-primary" />
          Balas de Oro - Conceptos Clave
        </h2>
        <p className="text-muted-foreground text-pretty">
          Definiciones cortas y diferencias clave para responder rápido en múltiple choice
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bullets.map((section, index) => (
          <Card key={index} className="hover:bg-accent/5 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${section.bgColor}`}>
                  <section.icon className={`h-5 w-5 ${section.color}`} />
                </div>
                <div>
                  <CardTitle className="text-lg">{section.category}</CardTitle>
                  <CardDescription>Palabras ancla</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Estrategia de Examen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Antes de responder:</h4>
              <ul className="text-sm space-y-1">
                <li>• Lee toda la pregunta</li>
                <li>• Identifica palabras clave</li>
                <li>• Descarta opciones obvias</li>
                <li>• Busca diferencias sutiles</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Palabras ancla:</h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">
                  apropiativo
                </Badge>
                <Badge variant="outline" className="text-xs">
                  cuello de botella
                </Badge>
                <Badge variant="outline" className="text-xs">
                  quantum
                </Badge>
                <Badge variant="outline" className="text-xs">
                  exclusión mutua
                </Badge>
                <Badge variant="outline" className="text-xs">
                  namespace
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
