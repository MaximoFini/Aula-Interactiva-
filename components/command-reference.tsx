"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Archive, HardDrive, Scissors, Activity, Clock, Variable, FileText, Search, Terminal, Play } from "lucide-react"

export function CommandReference() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const commandCategories = [
    {
      id: "compression",
      name: "Compresión",
      icon: Archive,
      color: "text-blue-500",
      commands: [
        {
          name: "gzip",
          syntax: "gzip [opciones] archivo",
          description: "Comprime archivos y devuelve un archivo.gz",
          examples: [
            "gzip -9 devcom → devcom.gz (máxima compresión)",
            "gzip -1 archivo → archivo.gz (compresión rápida)",
          ],
          options: ["-1 a -9: Factor de compresión (1=rápido/grande, 9=lento/pequeño)"],
          trap: "⚠️ TRAMPA: -1 es MÁS RÁPIDO pero archivo MÁS GRANDE",
        },
        {
          name: "zcat",
          syntax: "zcat archivo.gz",
          description: "Visualiza contenido de archivo comprimido sin descomprimir",
          examples: ["zcat devcom.gz"],
          trap: "💡 No necesitas descomprimir para ver el contenido",
        },
        {
          name: "gunzip",
          syntax: "gunzip archivo.gz",
          description: "Descomprime un archivo",
          examples: ["gunzip devcom.gz → devcom"],
          trap: "⚠️ El archivo .gz se elimina después de descomprimir",
        },
      ],
    },
    {
      id: "backup",
      name: "Respaldos",
      icon: HardDrive,
      color: "text-green-500",
      commands: [
        {
          name: "tar",
          syntax: "tar [opciones] archivo_respaldo archivos",
          description: "Crea, visualiza y extrae copias de seguridad",
          examples: [
            "tar cvf res.tar d1 → crea respaldo de directorio d1",
            "tar tvf res.tar → visualiza contenido del respaldo",
            "tar xvf ../res.tar → extrae archivos del respaldo",
          ],
          options: [
            "c: crear archivo",
            "v: verbose (mostrar progreso)",
            "f: especificar archivo",
            "t: listar contenido",
            "x: extraer archivos",
          ],
          trap: "⚠️ TRAMPA: cvf para CREAR, tvf para VER, xvf para EXTRAER",
        },
      ],
    },
    {
      id: "split",
      name: "División",
      icon: Scissors,
      color: "text-orange-500",
      commands: [
        {
          name: "split",
          syntax: "split -l líneas archivo prefijo",
          description: "Divide archivos en partes más pequeñas",
          examples: ["split -l 4 disco dis- → divide disco en archivos de 4 líneas c/u"],
          trap: "💡 El prefijo se agrega al inicio de cada archivo dividido",
        },
      ],
    },
    {
      id: "processes",
      name: "Procesos",
      icon: Activity,
      color: "text-purple-500",
      commands: [
        {
          name: "ps",
          syntax: "ps [opciones]",
          description: "Muestra procesos activos (información estática)",
          examples: [
            "ps → procesos de la sesión actual",
            "ps -e → todos los procesos del sistema",
            "ps -a → procesos con terminal excepto líderes de sesión",
            "ps -ef → información adicional (UID, PPID, STIME)",
            "ps -l → incluye prioridad de procesos",
          ],
          trap: "⚠️ TRAMPA: ps es ESTÁTICO, top es DINÁMICO",
        },
        {
          name: "top",
          syntax: "top",
          description: "Muestra procesos en TIEMPO REAL",
          examples: ["top → vista dinámica de procesos"],
          trap: "💡 Se actualiza automáticamente, usa 'q' para salir",
        },
        {
          name: "pstree",
          syntax: "pstree",
          description: "Muestra procesos en forma jerárquica",
          examples: ["pstree → árbol de procesos"],
          trap: "💡 Útil para ver relaciones padre-hijo entre procesos",
        },
      ],
    },
    {
      id: "execution",
      name: "Ejecución",
      icon: Play,
      color: "text-red-500",
      commands: [
        {
          name: "Foreground",
          syntax: "comando",
          description: "Ejecución en primer plano (bloquea terminal)",
          examples: ["./script.sh"],
          controls: ["Ctrl+Z → suspender proceso", "fg num_tarea → reanudar proceso", "Ctrl+C → terminar proceso"],
          trap: "⚠️ El prompt NO aparece hasta que termine el comando",
        },
        {
          name: "Background",
          syntax: "comando &",
          description: "Ejecución en segundo plano (no bloquea terminal)",
          examples: ["./script.sh & → ejecuta en background", "./script.sh > salida.txt & → redirige salida"],
          controls: [
            "kill -2 PID → suspender proceso",
            "bg num_tarea → reanudar proceso",
            "kill -9 PID → terminar proceso",
          ],
          trap: "💡 El prompt aparece inmediatamente",
        },
        {
          name: "jobs",
          syntax: "jobs",
          description: "Muestra trabajos suspendidos con su número de tarea",
          examples: ["jobs → lista trabajos con estado (running/stopped)"],
          trap: "💡 Los números de tarea se usan con fg y bg",
        },
      ],
    },
    {
      id: "priority",
      name: "Prioridad",
      icon: Clock,
      color: "text-yellow-500",
      commands: [
        {
          name: "nice",
          syntax: "nice -n NI comando",
          description: "Lanza proceso con prioridad específica",
          examples: ["nice -n 10 ./script.sh"],
          trap: "⚠️ NI entre -20 y 20. Menor NI = Mayor prioridad",
        },
        {
          name: "renice",
          syntax: "renice NI PID",
          description: "Modifica prioridad de proceso en ejecución",
          examples: ["renice 5 1234"],
          trap: "💡 Solo superusuario puede AUMENTAR prioridad (bajar NI)",
        },
      ],
    },
    {
      id: "scheduling",
      name: "Programación",
      icon: Clock,
      color: "text-indigo-500",
      commands: [
        {
          name: "cron",
          syntax: "min hora día_mes mes día_semana comando",
          description: "Programa tareas periódicas",
          examples: ["0 8 * * 1 backup.sh → cada lunes a las 8:00", "*/15 * * * * check.sh → cada 15 minutos"],
          ranges: ["min: 0-59", "hora: 0-23", "día_mes: 1-31", "mes: 1-12", "día_semana: 0-6 (0=domingo)"],
          steps: ["1. Crear archivo con periodicidad", "2. crontab archivo → cargar en crontab"],
          trap: "⚠️ cron envía resultado por correo interno de Linux",
        },
      ],
    },
    {
      id: "variables",
      name: "Variables",
      icon: Variable,
      color: "text-cyan-500",
      commands: [
        {
          name: "Asignación",
          syntax: "variable=valor",
          description: "Asigna valor a variable (sin espacios alrededor del =)",
          examples: ["color=blanco", "ruta=/home/user/docs", "resultado=`pwd` → asigna salida de comando"],
          trap: "⚠️ NO usar espacios: variable=valor (correcto) vs variable = valor (error)",
        },
        {
          name: "Uso",
          syntax: "$variable",
          description: "Accede al valor de la variable",
          examples: ["echo $color", "cd $ruta"],
        },
        {
          name: "read",
          syntax: "read var1 var2 var3",
          description: "Lee entrada del usuario y separa en variables",
          examples: ["read dia mes año → entrada: '15 Julio 2003' → dia=15, mes=Julio, año=2003"],
          trap: "💡 Separa automáticamente por espacios",
        },
        {
          name: "Parámetros posicionales",
          syntax: "$0 $1 $2 ...",
          description: "Variables que almacenan argumentos del script",
          examples: ["$0 → nombre del script", "$1 → primer argumento", "$# → cantidad de argumentos"],
          trap: "⚠️ $# NO incluye $0 (nombre del script)",
        },
      ],
    },
    {
      id: "files",
      name: "Archivos",
      icon: FileText,
      color: "text-emerald-500",
      commands: [
        {
          name: "ls",
          syntax: "ls [opciones] [directorio]",
          description: "Lista contenido de directorios",
          examples: [
            "ls d1 → contenido de d1",
            "ls -l d1 → formato extendido con permisos",
            "ls -li d1 → incluye número de nodo-i",
            "ls -R d1 → recursivo (subdirectorios)",
          ],
          trap: "💡 -l muestra permisos, -i muestra inodos, -R es recursivo",
        },
        {
          name: "cat",
          syntax: "cat [archivo] / cat > archivo",
          description: "Visualiza o crea archivos",
          examples: [
            "cat archivo → muestra contenido",
            "cat > nuevo → crea archivo (Ctrl+D para terminar)",
            "cat archivo1 archivo2 → concatena archivos",
          ],
        },
        {
          name: "more",
          syntax: "more [opciones] archivo",
          description: "Visualiza archivo página por página",
          examples: ["more -5 archivo → 5 líneas por página", "more +10 archivo → desde línea 10"],
        },
        {
          name: "head/tail",
          syntax: "head/tail [opciones] archivo",
          description: "Muestra inicio o final de archivo",
          examples: [
            "head -10 archivo → primeras 10 líneas",
            "tail -5 archivo → últimas 5 líneas",
            "tail +20 archivo → desde línea 20 hasta el final",
          ],
        },
      ],
    },
  ]

  const filteredCommands = commandCategories.filter((category) => {
    if (selectedCategory !== "all" && category.id !== selectedCategory) return false
    if (searchTerm) {
      return category.commands.some(
        (cmd) =>
          cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cmd.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    return true
  })

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-balance">Comandos Linux - Referencia Completa</h2>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Todos los comandos del parcial con sintaxis, ejemplos y trampas típicas
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar comandos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            Todos
          </Button>
          {commandCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <category.icon className="h-4 w-4" />
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Command Categories */}
      <div className="space-y-8">
        {filteredCommands.map((category) => (
          <div key={category.id} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20`}>
                <category.icon className={`h-5 w-5 ${category.color}`} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.commands.length} comando{category.commands.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {category.commands.map((command, idx) => (
                <Card key={idx} className="border-l-4 border-l-primary/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Terminal className="h-5 w-5 text-primary" />
                          <code className="text-lg font-mono bg-accent/20 px-2 py-1 rounded">{command.name}</code>
                        </CardTitle>
                        <CardDescription className="mt-2">{command.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Syntax */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-chart-1">Sintaxis:</h4>
                      <code className="block bg-muted p-3 rounded-lg font-mono text-sm">{command.syntax}</code>
                    </div>

                    {/* Examples */}
                    {command.examples && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-chart-2">Ejemplos:</h4>
                        <div className="space-y-2">
                          {command.examples.map((example, exIdx) => (
                            <code key={exIdx} className="block bg-accent/10 p-2 rounded text-sm font-mono">
                              $ {example}
                            </code>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Options */}
                    {command.options && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-chart-3">Opciones:</h4>
                        <ul className="space-y-1">
                          {command.options.map((option, optIdx) => (
                            <li key={optIdx} className="text-sm flex items-start gap-2">
                              <Badge variant="outline" className="text-xs">
                                OPT
                              </Badge>
                              {option}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Controls */}
                    {command.controls && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-chart-4">Controles:</h4>
                        <ul className="space-y-1">
                          {command.controls.map((control, ctrlIdx) => (
                            <li key={ctrlIdx} className="text-sm flex items-start gap-2">
                              <Badge variant="outline" className="text-xs">
                                CTRL
                              </Badge>
                              {control}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Ranges */}
                    {command.ranges && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-chart-5">Rangos:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {command.ranges.map((range, rngIdx) => (
                            <Badge key={rngIdx} variant="secondary" className="text-xs">
                              {range}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Steps */}
                    {command.steps && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-chart-1">Pasos:</h4>
                        <ol className="space-y-1">
                          {command.steps.map((step, stepIdx) => (
                            <li key={stepIdx} className="text-sm flex items-start gap-2">
                              <Badge variant="outline" className="text-xs">
                                {stepIdx + 1}
                              </Badge>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Trap */}
                    {command.trap && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                        <p className="text-sm font-medium text-destructive">{command.trap}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredCommands.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No se encontraron comandos</h3>
          <p className="text-muted-foreground">
            Intenta con otros términos de búsqueda o selecciona una categoría diferente
          </p>
        </div>
      )}
    </div>
  )
}
