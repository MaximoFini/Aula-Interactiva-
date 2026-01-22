"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Target, AlertTriangle, X, Check } from "lucide-react"

export function MCTraps() {
  const traps = [
    {
      category: "Procesos vs Hilos",
      traps: [
        {
          wrong: "Los hilos tienen su propio PCB",
          correct: "Los hilos comparten el PCB del proceso padre",
          explanation: "Solo el proceso tiene PCB. Los hilos tienen TCB (Thread Control Block) más liviano.",
        },
        {
          wrong: "Los hilos no comparten memoria",
          correct: "Los hilos SÍ comparten código y datos",
          explanation: "Solo tienen privados: registros, pila y contador de programa.",
        },
      ],
    },
    {
      category: "Arquitecturas",
      traps: [
        {
          wrong: "SMP tiene un CPU maestro que controla todo",
          correct: "En SMP todos los CPUs son iguales y auto-planifican",
          explanation: "Eso es Maestro/Esclavo. SMP = Symmetric = todos iguales.",
        },
        {
          wrong: "Micronúcleo es más rápido que núcleo monolítico",
          correct: "Micronúcleo es más lento pero más confiable",
          explanation: "Paso de mensajes es más lento que llamadas directas.",
        },
      ],
    },
    {
      category: "Planificación",
      traps: [
        {
          wrong: "SJF es apropiativo",
          correct: "SJF es NO apropiativo, SRTF es apropiativo",
          explanation: "SJF espera que termine. SRTF puede interrumpir si llega uno más corto.",
        },
        {
          wrong: "Round Robin con quantum grande es eficiente",
          correct: "Quantum grande se parece a FIFO",
          explanation: "Quantum muy chico = overhead. Muy grande = pierde ventajas de RR.",
        },
      ],
    },
    {
      category: "IPC",
      traps: [
        {
          wrong: "Comunicación síncrona usa buffer",
          correct: "Comunicación asíncrona usa buffer",
          explanation: "Síncrona = emisor espera respuesta. Asíncrona = usa buffer, no espera.",
        },
        {
          wrong: "Exclusión mutua solo se usa con memoria compartida",
          correct: "También se necesita con cualquier recurso compartido",
          explanation: "Impresora, archivos, etc. también necesitan exclusión mutua.",
        },
      ],
    },
    {
      category: "Docker",
      traps: [
        {
          wrong: "Docker es una máquina virtual",
          correct: "Docker usa contenedores, no VMs",
          explanation: "Contenedores comparten kernel del host. VMs tienen SO guest completo.",
        },
        {
          wrong: "cgroups proporcionan aislamiento",
          correct: "namespaces dan aislamiento, cgroups limitan recursos",
          explanation: "namespaces = aislamiento. cgroups = límites de CPU/memoria.",
        },
      ],
    },
    {
      category: "Seguridad",
      traps: [
        {
          wrong: "Virus y gusanos son lo mismo",
          correct: "Virus necesita huésped, gusano se propaga solo",
          explanation: "Virus = dentro de programa. Gusano = se propaga por red independiente.",
        },
        {
          wrong: "Ataque de sniffing es activo",
          correct: "Sniffing es ataque pasivo",
          explanation: "Pasivo = solo observa. Activo = modifica o bloquea.",
        },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-balance flex items-center justify-center gap-2">
          <Target className="h-6 w-6 text-destructive" />
          Trampas Típicas de Multiple Choice
        </h2>
        <p className="text-muted-foreground text-pretty">Confusiones comunes en exámenes y cómo evitarlas</p>
      </div>

      <Alert className="border-destructive/20 bg-destructive/5">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <AlertDescription className="text-destructive">
          <strong>¡Atención!</strong> Estas son las confusiones más frecuentes. Lee cada opción cuidadosamente.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        {traps.map((section, index) => (
          <Card key={index} className="hover:bg-accent/5 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg text-chart-1">{section.category}</CardTitle>
              <CardDescription>Errores frecuentes en esta unidad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.traps.map((trap, trapIndex) => (
                  <div key={trapIndex} className="space-y-3 p-4 rounded-lg bg-muted/30">
                    <div className="flex items-start gap-3">
                      <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-destructive">TRAMPA:</p>
                        <p className="text-sm">{trap.wrong}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-green-600">CORRECTO:</p>
                        <p className="text-sm">{trap.correct}</p>
                      </div>
                    </div>

                    <div className="pl-8 pt-2 border-l-2 border-primary/20">
                      <p className="text-xs text-muted-foreground">
                        <strong>Por qué:</strong> {trap.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <Check className="h-5 w-5" />
            Consejos para Evitar Trampas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Técnicas de lectura:</h4>
              <ul className="text-sm space-y-1">
                <li>• Subraya palabras clave (NO, SIEMPRE, NUNCA)</li>
                <li>• Busca diferencias sutiles entre opciones</li>
                <li>• Cuidado con generalizaciones absolutas</li>
                <li>• Lee todas las opciones antes de elegir</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Señales de alerta:</h4>
              <div className="space-y-1">
                <Badge variant="destructive" className="text-xs mr-1">
                  SIEMPRE
                </Badge>
                <Badge variant="destructive" className="text-xs mr-1">
                  NUNCA
                </Badge>
                <Badge variant="destructive" className="text-xs mr-1">
                  TODOS
                </Badge>
                <Badge variant="destructive" className="text-xs mr-1">
                  NINGUNO
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  Estas palabras suelen indicar respuestas incorrectas
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
