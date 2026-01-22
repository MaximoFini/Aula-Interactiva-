"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Code, CheckCircle, AlertCircle, Lightbulb, Terminal, FileText } from "lucide-react"

export function ShellScriptReference() {
  const [userScript, setUserScript] = useState("")
  const [scriptOutput, setScriptOutput] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const scriptTemplates = [
    {
      id: "basic-params",
      name: "Parámetros Básicos",
      description: "Validación de parámetros posicionales",
      code: `#!/bin/bash
# Validar cantidad de parámetros
if [ $# -eq 2 ]
then
    echo "Parámetro 1: $1"
    echo "Parámetro 2: $2"
    echo "Nombre del script: $0"
    echo "Total de parámetros: $#"
else
    echo "Error: Se requieren exactamente 2 parámetros"
    echo "Uso: $0 param1 param2"
fi`,
      execution: "sh script.sh valor1 valor2",
    },
    {
      id: "file-validation",
      name: "Validación de Archivos",
      description: "Verificar tipos de archivos y directorios",
      code: `#!/bin/bash
echo -n "Ingrese ruta: "
read ruta

if [ -f $ruta ]
then
    echo "$ruta es un archivo ordinario"
    echo "Tamaño: $(wc -c < $ruta) bytes"
    echo "Líneas: $(wc -l < $ruta)"
elif [ -d $ruta ]
then
    echo "$ruta es un directorio"
    echo "Contenido:"
    ls -la $ruta
else
    echo "$ruta no existe o no es archivo/directorio"
fi`,
      execution: "sh script.sh",
    },
    {
      id: "for-loop",
      name: "Bucle FOR",
      description: "Iterar sobre archivos en un directorio",
      code: `#!/bin/bash
echo -n "Ingrese directorio: "
read directorio

if [ -d $directorio ]
then
    echo "Procesando archivos en $directorio:"
    for archivo in \`ls $directorio\`
    do
        if [ -f $directorio/$archivo ]
        then
            lineas=\`wc -l $directorio/$archivo | cut -d' ' -f1\`
            echo "  $archivo: $lineas líneas"
        fi
    done
else
    echo "Error: $directorio no es un directorio válido"
fi`,
      execution: "sh script.sh",
    },
    {
      id: "until-loop",
      name: "Bucle UNTIL",
      description: "Procesar n elementos con contador",
      code: `#!/bin/bash
echo -n "¿Cuántos números quiere sumar? "
read cantidad
contador=0
suma=0

until [ $contador -eq $cantidad ]
do
    echo -n "Ingrese número $((contador + 1)): "
    read numero
    suma=\`expr $suma + $numero\`
    contador=\`expr $contador + 1\`
done

echo "La suma total es: $suma"`,
      execution: "sh script.sh",
    },
    {
      id: "advanced-example",
      name: "Ejemplo Avanzado",
      description: "Combina múltiples conceptos",
      code: `#!/bin/bash
# Script que procesa archivos con múltiples validaciones
if [ $# -ne 1 ]
then
    echo "Uso: $0 <directorio>"
    exit 1
fi

directorio=$1
if [ ! -d $directorio ]
then
    echo "Error: $directorio no es un directorio"
    exit 1
fi

echo "=== Análisis de $directorio ==="
total_archivos=0
total_lineas=0

for item in \`ls $directorio\`
do
    ruta_completa="$directorio/$item"
    if [ -f $ruta_completa ]
    then
        lineas=\`wc -l < $ruta_completa\`
        bytes=\`wc -c < $ruta_completa\`
        echo "📄 $item: $lineas líneas, $bytes bytes"
        total_archivos=\`expr $total_archivos + 1\`
        total_lineas=\`expr $total_lineas + $lineas\`
    elif [ -d $ruta_completa ]
    then
        echo "📁 $item/ (directorio)"
    fi
done

echo "=== Resumen ==="
echo "Total archivos: $total_archivos"
echo "Total líneas: $total_lineas"`,
      execution: "sh script.sh /ruta/al/directorio",
    },
  ]

  const syntaxReference = [
    {
      category: "Condicionales",
      items: [
        { syntax: "[ -f archivo ]", description: "Verifica si es archivo ordinario" },
        { syntax: "[ -d directorio ]", description: "Verifica si es directorio" },
        { syntax: "[ $# -eq 3 ]", description: "Verifica cantidad de parámetros" },
        { syntax: "[ $a -gt $b ]", description: "Verifica si a > b" },
        { syntax: "[ $a -lt $b ]", description: "Verifica si a < b" },
        { syntax: "[ $a -eq $b ]", description: "Verifica si a = b" },
      ],
    },
    {
      category: "Variables",
      items: [
        { syntax: "$0", description: "Nombre del script" },
        { syntax: "$1, $2, $3...", description: "Parámetros posicionales" },
        { syntax: "$#", description: "Cantidad de parámetros" },
        { syntax: "variable=valor", description: "Asignación (sin espacios)" },
        { syntax: "$variable", description: "Uso de variable" },
        { syntax: "`comando`", description: "Sustitución de comando" },
      ],
    },
    {
      category: "Bucles",
      items: [
        { syntax: "for i in lista", description: "Itera sobre elementos de lista" },
        { syntax: "until [ condición ]", description: "Ejecuta hasta que condición sea verdadera" },
        { syntax: "while [ condición ]", description: "Ejecuta mientras condición sea verdadera" },
      ],
    },
    {
      category: "Operaciones",
      items: [
        { syntax: "expr $a + $b", description: "Suma aritmética" },
        { syntax: "wc -l archivo", description: "Cuenta líneas" },
        { syntax: "cut -d' ' -f1", description: "Extrae primer campo" },
        { syntax: "comando && echo ok", description: "Ejecuta si comando exitoso" },
        { syntax: "comando > archivo", description: "Redirige salida" },
        { syntax: "comando >> archivo", description: "Agrega a archivo" },
      ],
    },
  ]

  const simulateScript = () => {
    // Simulación básica de ejecución
    if (!userScript.trim()) {
      setScriptOutput("Error: No hay código para ejecutar")
      return
    }

    let output = "=== Simulación de Ejecución ===\n"

    // Análisis básico del script
    if (userScript.includes("$#")) {
      output += "✓ Detectada validación de parámetros\n"
    }
    if (userScript.includes("[ -f") || userScript.includes("[ -d")) {
      output += "✓ Detectada validación de archivos/directorios\n"
    }
    if (userScript.includes("for") && userScript.includes("in")) {
      output += "✓ Detectado bucle FOR\n"
    }
    if (userScript.includes("until")) {
      output += "✓ Detectado bucle UNTIL\n"
    }
    if (userScript.includes("read")) {
      output += "✓ Detectada entrada de usuario\n"
    }
    if (userScript.includes("echo")) {
      output += "✓ Detectada salida de texto\n"
    }

    output += "\n=== Resultado Simulado ===\n"
    output += "Script ejecutado correctamente\n"
    output += "(Esta es una simulación - ejecuta en terminal real para resultados reales)"

    setScriptOutput(output)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-balance">Práctica de Shell Scripts</h2>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Crea, modifica y practica shell scripts con plantillas y referencia de sintaxis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Script Editor */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Editor de Scripts
              </CardTitle>
              <CardDescription>Escribe tu shell script aquí o usa una plantilla</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Template Selector */}
              <div>
                <label className="text-sm font-medium mb-2 block">Plantillas:</label>
                <div className="flex flex-wrap gap-2">
                  {scriptTemplates.map((template) => (
                    <Button
                      key={template.id}
                      variant={selectedTemplate === template.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedTemplate(template.id)
                        setUserScript(template.code)
                      }}
                    >
                      {template.name}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTemplate("")
                      setUserScript("")
                    }}
                  >
                    Limpiar
                  </Button>
                </div>
              </div>

              {/* Script Editor */}
              <div>
                <label className="text-sm font-medium mb-2 block">Código del Script:</label>
                <Textarea
                  placeholder="#!/bin/bash&#10;echo 'Hola mundo'"
                  value={userScript}
                  onChange={(e) => setUserScript(e.target.value)}
                  className="font-mono text-sm min-h-[300px]"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button onClick={simulateScript} className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Simular Ejecución
                </Button>
                <Button variant="outline" onClick={() => setScriptOutput("")}>
                  Limpiar Salida
                </Button>
              </div>

              {/* Output */}
              {scriptOutput && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Salida:</label>
                  <pre className="bg-muted p-3 rounded-lg text-sm font-mono whitespace-pre-wrap">{scriptOutput}</pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Reference and Templates */}
        <div className="space-y-4">
          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="templates">Plantillas</TabsTrigger>
              <TabsTrigger value="syntax">Sintaxis</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Plantillas de Scripts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scriptTemplates.map((template) => (
                      <div key={template.id} className="border rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{template.name}</h4>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedTemplate(template.id)
                              setUserScript(template.code)
                            }}
                          >
                            Usar
                          </Button>
                        </div>
                        <code className="text-xs bg-accent/10 p-2 rounded block">{template.execution}</code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="syntax" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="h-5 w-5" />
                    Referencia de Sintaxis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {syntaxReference.map((category) => (
                      <div key={category.category}>
                        <h4 className="font-semibold mb-3 text-primary">{category.category}</h4>
                        <div className="space-y-2">
                          {category.items.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-2 rounded-lg bg-accent/5">
                              <code className="bg-accent/20 px-2 py-1 rounded text-xs font-mono flex-shrink-0">
                                {item.syntax}
                              </code>
                              <span className="text-sm text-muted-foreground">{item.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Tips Card */}
          <Card className="bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Consejos para el Parcial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Siempre valida la cantidad de parámetros con <code>[ $# -eq n ]</code>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Usa <code>[ -f archivo ]</code> para archivos y <code>[ -d directorio ]</code> para directorios
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Recuerda espacios en <code>expr</code>: <code>expr $a + $b</code>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <code>until</code> ejecuta HASTA QUE la condición sea verdadera
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <code>$#</code> NO incluye <code>$0</code> (nombre del script)
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
