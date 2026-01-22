"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Cpu, Settings, Hash, Clock, MemoryStick } from "lucide-react"

interface PCBData {
  pid: number
  parentPid: number
  state: string
  priority: number
  cpuTime: number
  memoryUsage: number
  registers: {
    pc: string
    sp: string
    ax: string
    bx: string
  }
}

export function PCBViewer() {
  const [selectedProcess, setSelectedProcess] = useState<number>(1001)

  const processes: PCBData[] = [
    {
      pid: 1001,
      parentPid: 1000,
      state: "Running",
      priority: 20,
      cpuTime: 1250,
      memoryUsage: 2048,
      registers: { pc: "0x4000A0", sp: "0x7FFF00", ax: "0x0042", bx: "0x1337" },
    },
    {
      pid: 1002,
      parentPid: 1001,
      state: "Sleep",
      priority: 15,
      cpuTime: 890,
      memoryUsage: 1024,
      registers: { pc: "0x400120", sp: "0x7FFE80", ax: "0x0000", bx: "0x0001" },
    },
    {
      pid: 1003,
      parentPid: 1000,
      state: "Zombie",
      priority: 0,
      cpuTime: 2100,
      memoryUsage: 0,
      registers: { pc: "0x000000", sp: "0x000000", ax: "0x0000", bx: "0x0000" },
    },
  ]

  const currentProcess = processes.find((p) => p.pid === selectedProcess) || processes[0]

  const getStateColor = (state: string) => {
    switch (state) {
      case "Running":
        return "bg-chart-2 text-chart-2-foreground"
      case "Sleep":
        return "bg-chart-1 text-chart-1-foreground"
      case "Zombie":
        return "bg-chart-3 text-chart-3-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-balance">PCB - Bloque de Control de Proceso</h2>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Explora la estructura clave que contiene toda la información de un proceso
        </p>
      </div>

      {/* Process Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Seleccionar Proceso</CardTitle>
          <CardDescription>Elige un proceso para examinar su PCB</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {processes.map((process) => (
              <Button
                key={process.pid}
                variant={selectedProcess === process.pid ? "default" : "outline"}
                onClick={() => setSelectedProcess(process.pid)}
                className="flex items-center gap-2"
              >
                <Hash className="h-4 w-4" />
                PID {process.pid}
                <Badge className={getStateColor(process.state)}>{process.state}</Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PCB Details */}
      <Tabs defaultValue="identification" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="identification" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Identificación
          </TabsTrigger>
          <TabsTrigger value="state" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            Estado
          </TabsTrigger>
          <TabsTrigger value="control" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Control
          </TabsTrigger>
        </TabsList>

        <TabsContent value="identification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información de Identificación
              </CardTitle>
              <CardDescription>Datos únicos que identifican al proceso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-chart-1/10 border border-chart-1/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">Process ID (PID)</span>
                      <Badge variant="outline">{currentProcess.pid}</Badge>
                    </div>
                    <p className="text-2xl font-bold">{currentProcess.pid}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-chart-2/10 border border-chart-2/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">Parent PID (PPID)</span>
                      <Badge variant="outline">{currentProcess.parentPid}</Badge>
                    </div>
                    <p className="text-2xl font-bold">{currentProcess.parentPid}</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-3">Jerarquía de Procesos</h4>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Padre:</span>
                      <Badge variant="secondary">PID {currentProcess.parentPid}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Actual:</span>
                      <Badge className="bg-primary">PID {currentProcess.pid}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Hijos:</span>
                      <span className="text-xs text-muted-foreground">
                        {processes.filter((p) => p.parentPid === currentProcess.pid).length} procesos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="state" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                Estado del Proceso
              </CardTitle>
              <CardDescription>Registros de CPU y estado actual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-chart-3/10 border border-chart-3/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">Estado Actual</span>
                      <Badge className={getStateColor(currentProcess.state)}>{currentProcess.state}</Badge>
                    </div>
                    <p className="text-lg font-semibold">{currentProcess.state}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-chart-4/10 border border-chart-4/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium text-muted-foreground">Tiempo CPU</span>
                    </div>
                    <p className="text-lg font-semibold">{currentProcess.cpuTime}ms</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Registros de CPU</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(currentProcess.registers).map(([reg, value]) => (
                      <div key={reg} className="p-3 rounded-lg bg-muted/50 border">
                        <div className="text-xs text-muted-foreground uppercase">{reg}</div>
                        <div className="font-mono text-sm font-semibold">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="control" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Información de Control
              </CardTitle>
              <CardDescription>Planificación, memoria y recursos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-chart-1/10 border border-chart-1/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="h-4 w-4" />
                    <span className="text-sm font-medium text-muted-foreground">Prioridad</span>
                  </div>
                  <p className="text-2xl font-bold">{currentProcess.priority}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {currentProcess.priority < 10 ? "Alta" : currentProcess.priority < 20 ? "Media" : "Baja"}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-chart-2/10 border border-chart-2/20">
                  <div className="flex items-center gap-2 mb-2">
                    <MemoryStick className="h-4 w-4" />
                    <span className="text-sm font-medium text-muted-foreground">Memoria</span>
                  </div>
                  <p className="text-2xl font-bold">{currentProcess.memoryUsage}</p>
                  <p className="text-xs text-muted-foreground mt-1">KB utilizados</p>
                </div>

                <div className="p-4 rounded-lg bg-chart-3/10 border border-chart-3/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium text-muted-foreground">CPU Time</span>
                  </div>
                  <p className="text-2xl font-bold">{currentProcess.cpuTime}</p>
                  <p className="text-xs text-muted-foreground mt-1">milisegundos</p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-3">Recursos Asignados</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-3 h-3 p-0 bg-chart-1"></Badge>
                    <span>Archivos abiertos: 3</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-3 h-3 p-0 bg-chart-2"></Badge>
                    <span>Sockets: 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-3 h-3 p-0 bg-chart-3"></Badge>
                    <span>Threads: 2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-3 h-3 p-0 bg-chart-4"></Badge>
                    <span>Pipes: 0</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
