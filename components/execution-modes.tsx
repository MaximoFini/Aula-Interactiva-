"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Shield, ArrowRight, Zap } from "lucide-react"

export function ExecutionModes() {
  const [currentMode, setCurrentMode] = useState<"user" | "kernel">("user")
  const [showTransition, setShowTransition] = useState(false)

  const handleModeChange = () => {
    setShowTransition(true)
    setTimeout(() => {
      setCurrentMode(currentMode === "user" ? "kernel" : "user")
      setShowTransition(false)
    }, 500)
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-balance">Modos de Ejecución</h2>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Comprende las diferencias entre modo usuario y modo kernel
        </p>
      </div>

      {/* Mode Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className={`transition-all duration-300 ${currentMode === "user" ? "border-chart-1 bg-chart-1/5" : ""}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-1/20">
                <User className="h-5 w-5 text-chart-1" />
              </div>
              Modo Usuario
            </CardTitle>
            <CardDescription>Privilegios limitados para aplicaciones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-muted/50">
                <h4 className="font-semibold text-sm mb-2">Características:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Acceso limitado al hardware</li>
                  <li>• No puede ejecutar instrucciones privilegiadas</li>
                  <li>• Protegido de otros procesos</li>
                  <li>• Debe usar system calls para servicios del SO</li>
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-chart-1/10 border border-chart-1/20">
                <h4 className="font-semibold text-sm mb-2">Ejemplos:</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    Navegador web
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Editor de texto
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Juegos
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Calculadora
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`transition-all duration-300 ${currentMode === "kernel" ? "border-chart-2 bg-chart-2/5" : ""}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/20">
                <Shield className="h-5 w-5 text-chart-2" />
              </div>
              Modo Kernel
            </CardTitle>
            <CardDescription>Acceso total al hardware y sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-muted/50">
                <h4 className="font-semibold text-sm mb-2">Características:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Acceso completo al hardware</li>
                  <li>• Puede ejecutar cualquier instrucción</li>
                  <li>• Gestiona recursos del sistema</li>
                  <li>• Maneja interrupciones y excepciones</li>
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-chart-2/10 border border-chart-2/20">
                <h4 className="font-semibold text-sm mb-2">Funciones:</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    Drivers
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Scheduler
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Memory Manager
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    File System
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mode Transition Simulator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Simulador de Cambios de Modo
          </CardTitle>
          <CardDescription>Observa cómo cambia el modo de ejecución</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  currentMode === "user" ? "border-chart-1 bg-chart-1/10 scale-110" : "border-border"
                }`}
              >
                <div className="flex items-center gap-2">
                  <User className="h-6 w-6 text-chart-1" />
                  <span className="font-semibold">Modo Usuario</span>
                </div>
              </div>

              <div className={`transition-all duration-300 ${showTransition ? "scale-125 text-primary" : ""}`}>
                <ArrowRight className="h-8 w-8" />
              </div>

              <div
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  currentMode === "kernel" ? "border-chart-2 bg-chart-2/10 scale-110" : "border-border"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-chart-2" />
                  <span className="font-semibold">Modo Kernel</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button onClick={handleModeChange} disabled={showTransition}>
                {showTransition ? "Cambiando..." : `Cambiar a Modo ${currentMode === "user" ? "Kernel" : "Usuario"}`}
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2">Estado Actual:</h4>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={currentMode === "user" ? "bg-chart-1" : "bg-chart-2"}>
                  {currentMode === "user" ? "MODO USUARIO" : "MODO KERNEL"}
                </Badge>
                <span className="text-sm">
                  {currentMode === "user"
                    ? "Ejecutando aplicación con privilegios limitados"
                    : "Ejecutando código del sistema con acceso completo"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cambio de Modo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">El mismo proceso cambia sus privilegios de ejecución</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Trigger</Badge>
                <span>System call, interrupción, excepción</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Proceso</Badge>
                <span>Mismo PID, diferente nivel de privilegios</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cambio de Proceso</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Cambio de contexto completo entre procesos diferentes</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Trigger</Badge>
                <span>Scheduler, tiempo de CPU agotado</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Proceso</Badge>
                <span>Diferente PID, cambio completo de contexto</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
