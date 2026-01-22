"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, FileText, Play, CheckCircle, AlertTriangle, BookOpen, Target } from "lucide-react"

export function ShellScriptExercises() {
  const [selectedExercise, setSelectedExercise] = useState(0)

  const exercises = [
    {
      id: 1,
      title: "Unir dos archivos",
      difficulty: "Básico",
      concept: "Parámetros posicionales",
      description: "Crear un archivo con la unión de otros dos usando parámetros posicionales",
      code: `if [ $# -eq 3 ]
then
    cat $1 $2 > $3
    echo "El contenido del nuevo archivo es:"
    more $3
else
    echo "La cantidad de parámetros ingresada no es la correcta"
fi`,
      execution: "sh prog1 archivo1 archivo2 nuevo_archivo",
      keyPoints: [
        "$# cuenta la cantidad de parámetros",
        "$1, $2, $3 son los parámetros posicionales",
        "cat $1 $2 > $3 concatena y redirige",
      ],
      trap: "⚠️ TRAMPA: $# NO incluye $0 (nombre del script)",
    },
    {
      id: 2,
      title: "Ordenar archivo por campo",
      difficulty: "Intermedio",
      concept: "Validación de archivos + sort",
      description: "Crear archivo ordenado por segundo campo alfabéticamente en forma inversa",
      code: `if [ $# -eq 2 ]
then
    if [ -f $1 ]
    then
        sort -k2r $1 > $2
        echo "El contenido del nuevo archivo es:"
        more $2
    else
        echo "$1 no es un archivo ordinario"
    fi
else
    echo "La cantidad de parámetros ingresada no es la correcta"
fi`,
      execution: "sh prog2 archivo_origen archivo_destino",
      keyPoints: [
        "[ -f $1 ] verifica si es archivo ordinario",
        "sort -k2r ordena por campo 2 en forma inversa",
        "Validación anidada: primero parámetros, luego archivo",
      ],
      trap: "⚠️ TRAMPA: -f verifica archivo ORDINARIO, -d verifica DIRECTORIO",
    },
    {
      id: 3,
      title: "Listar directorio con inodos",
      difficulty: "Básico",
      concept: "Validación de directorios + ls",
      description: "Mostrar listado extendido en orden inverso con números de nodo-i",
      code: `if [ $# -eq 1 ]
then
    if [ -d $1 ]
    then
        ls -lir $1
    else
        echo "$1 no es un directorio"
    fi
else
    echo "La cantidad de parámetros ingresada no es la correcta"
fi`,
      execution: "sh prog3 directorio",
      keyPoints: [
        "[ -d $1 ] verifica si es directorio",
        "ls -lir: -l (extendido), -i (inodos), -r (inverso)",
        "Estructura típica: validar parámetros → validar tipo",
      ],
      trap: "💡 Orden de opciones: -lir funciona igual que -l -i -r",
    },
    {
      id: 4,
      title: "Sumar tres números (read)",
      difficulty: "Básico",
      concept: "Variables + read + expr",
      description: "Sumar tres números solicitados al usuario",
      code: `echo -n "Ingrese el primer número: "
read num1
echo -n "Ingrese el segundo número: "
read num2
echo -n "Ingrese el tercer número: "
read num3
resum=\`expr $num1 + $num2 + $num3\`
echo "El resultado de la suma de los tres números es: $resum"`,
      execution: "sh prog4",
      keyPoints: [
        "echo -n no agrega salto de línea",
        "read variable lee entrada del usuario",
        "expr realiza operaciones aritméticas",
        "Backticks ` ` ejecutan comando y asignan resultado",
      ],
      trap: "⚠️ TRAMPA: expr necesita ESPACIOS: expr $a + $b (correcto)",
    },
    {
      id: 5,
      title: "Sumar tres números (parámetros)",
      difficulty: "Básico",
      concept: "Parámetros posicionales + expr",
      description: "Sumar tres números pasados como parámetros",
      code: `resum=\`expr $1 + $2 + $3\`
echo "El resultado de la suma de los tres números es: $resum"`,
      execution: "sh prog5 10 20 30",
      keyPoints: [
        "Versión simplificada del ejercicio 4",
        "No necesita validación en este ejemplo básico",
        "Más eficiente: no requiere interacción del usuario",
      ],
      trap: "💡 Comparar con ejercicio 4: read vs parámetros posicionales",
    },
    {
      id: 6,
      title: "Crear enlaces de archivos",
      difficulty: "Avanzado",
      concept: "Bucles + validación + ln",
      description: "Crear enlace de cada archivo ordinario en un directorio",
      code: `echo -n "Ingrese directorio: "
read vardir
if test -d $vardir
then
    for i in \`ls $vardir\`
    do
        if test -f $vardir/$i
        then
            echo -n "Ingrese el directorio destino: "
            read vardestino
            echo -n "Ingrese el nombre del enlace de $i: "
            read varlin
            ln $vardir/$i $vardestino/$varlin && echo "El enlace fue creado"
        fi
    done
else
    echo "El archivo no es directorio o no existe"
fi`,
      execution: "sh prog6",
      keyPoints: [
        "for i in `ls $vardir` itera sobre archivos",
        "test -f verifica archivo ordinario",
        "ln crea enlace duro",
        "&& ejecuta comando solo si anterior fue exitoso",
      ],
      trap: "⚠️ TRAMPA: ln crea enlace DURO, ln -s crea enlace SIMBÓLICO",
    },
    {
      id: 10,
      title: "Contar líneas de archivos",
      difficulty: "Intermedio",
      concept: "Bucles + wc + cut",
      description: "Contar líneas de cada archivo ordinario en un directorio",
      code: `echo -n "Ingrese el directorio: "
read di
if test -d $di
then
    for i in \`ls $di\`
    do
        if test -f $di/$i
        then
            can=\`wc -l $di/$i | cut -d' ' -f1\`
            echo "El archivo $i tiene $can lineas"
        fi
    done
else
    echo "El archivo $di no es directorio"
fi`,
      execution: "sh prog10",
      keyPoints: [
        "wc -l cuenta líneas",
        "cut -d' ' -f1 extrae primer campo (separado por espacio)",
        "Patrón común: iterar archivos y procesar cada uno",
      ],
      trap: "💡 wc devuelve 'número archivo', cut extrae solo el número",
    },
    {
      id: 15,
      title: "Agregar contenido de n directorios",
      difficulty: "Avanzado",
      concept: "until + contadores + validación",
      description: "Agregar contenido de n directorios a un archivo",
      code: `echo -n "Ingrese el archivo a modificar: "
read varmod
caning=0
if [ -f $varmod ]
then
    echo -n "Ingrese la cantidad de directorios que desea agregarle: "
    read cantot
    until [ $caning -eq $cantot ]
    do
        echo -n "Ingrese directorio: "
        read vardir
        if [ -d $vardir ]
        then
            caning=\`expr $caning + 1\`
            ls $vardir >> $varmod && echo "El nuevo contenido del archivo es:"
            more $varmod
        else
            echo "El archivo que desea agregar no es directorio"
        fi
    done
else
    echo "Archivo no válido"
fi`,
      execution: "sh prog15",
      keyPoints: [
        "until [ condición ] ejecuta hasta que condición sea verdadera",
        "Contador caning se incrementa solo si directorio es válido",
        ">> agrega contenido al final del archivo",
        "Validación: archivo destino debe existir",
      ],
      trap: "⚠️ TRAMPA: until es HASTA QUE, while es MIENTRAS QUE",
    },
    {
      id: 19,
      title: "Modificar permisos de n archivos",
      difficulty: "Intermedio",
      concept: "until + chmod + permisos",
      description: "Agregar permiso de escritura al grupo en n archivos",
      code: `echo -n "Ingrese la cantidad de archivos: "
read cantot
caning=0
until [ $caning -eq $cantot ]
do
    echo -n "Ingrese el argumento del archivo: "
    read var
    if [ -f $var ]
    then
        caning=\`expr $caning + 1\`
        chmod g+w $var && echo "Los permisos de acceso fueron modificados"
    fi
done`,
      execution: "sh prog19",
      keyPoints: [
        "chmod g+w agrega permiso de escritura al grupo",
        "g = grupo, u = usuario, o = otros",
        "+ agrega permiso, - quita permiso",
        "w = escritura, r = lectura, x = ejecución",
      ],
      trap: "💡 g+w AGREGA escritura al grupo, g=w ASIGNA SOLO escritura al grupo",
    },
  ]

  const difficultyColors = {
    Básico: "bg-green-500/10 text-green-500 border-green-500/20",
    Intermedio: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    Avanzado: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-balance">Shell Scripts - 22 Ejercicios Resueltos</h2>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Ejercicios completos con explicaciones, trampas típicas y conceptos clave
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exercise List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Ejercicios
              </CardTitle>
              <CardDescription>Selecciona un ejercicio para ver la solución completa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {exercises.map((exercise, idx) => (
                  <Button
                    key={exercise.id}
                    variant={selectedExercise === idx ? "default" : "ghost"}
                    className="w-full justify-start h-auto p-3"
                    onClick={() => setSelectedExercise(idx)}
                  >
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          #{exercise.id}
                        </Badge>
                        <Badge className={`text-xs ${difficultyColors[exercise.difficulty]}`}>
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      <div className="font-medium text-sm">{exercise.title}</div>
                      <div className="text-xs text-muted-foreground">{exercise.concept}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exercise Detail */}
        <div className="lg:col-span-2">
          {exercises[selectedExercise] && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-primary" />
                        Ejercicio #{exercises[selectedExercise].id}: {exercises[selectedExercise].title}
                      </CardTitle>
                      <CardDescription className="mt-2">{exercises[selectedExercise].description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={difficultyColors[exercises[selectedExercise].difficulty]}>
                        {exercises[selectedExercise].difficulty}
                      </Badge>
                      <Badge variant="outline">{exercises[selectedExercise].concept}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="code" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="code">Código</TabsTrigger>
                      <TabsTrigger value="execution">Ejecución</TabsTrigger>
                      <TabsTrigger value="concepts">Conceptos</TabsTrigger>
                      <TabsTrigger value="traps">Trampas</TabsTrigger>
                    </TabsList>

                    <TabsContent value="code" className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Código del Script
                        </h4>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
                          <code>{exercises[selectedExercise].code}</code>
                        </pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="execution" className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Play className="h-4 w-4" />
                          Cómo Ejecutar
                        </h4>
                        <code className="block bg-accent/10 p-3 rounded-lg font-mono text-sm">
                          $ {exercises[selectedExercise].execution}
                        </code>
                        <p className="text-sm text-muted-foreground mt-2">
                          Copia este comando en tu terminal para ejecutar el script
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="concepts" className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Conceptos Clave
                        </h4>
                        <ul className="space-y-2">
                          {exercises[selectedExercise].keyPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="traps" className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                          Trampas y Consejos
                        </h4>
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                          <p className="text-sm font-medium text-destructive">{exercises[selectedExercise].trap}</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setSelectedExercise(Math.max(0, selectedExercise - 1))}
                  disabled={selectedExercise === 0}
                >
                  ← Anterior
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedExercise(Math.min(exercises.length - 1, selectedExercise + 1))}
                  disabled={selectedExercise === exercises.length - 1}
                >
                  Siguiente →
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Reference */}
      <Card className="bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Patrones Comunes en Shell Scripts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-chart-1">Validación de Parámetros</h4>
              <code className="block bg-muted p-2 rounded text-xs font-mono mb-2">
                if [ $# -eq 3 ]<br />
                then
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;# código aquí
                <br />
                else
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;echo "Parámetros incorrectos"
                <br />
                fi
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-chart-2">Validación de Archivos</h4>
              <code className="block bg-muted p-2 rounded text-xs font-mono mb-2">
                if [ -f $archivo ]<br />
                then
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;# es archivo ordinario
                <br />
                elif [ -d $archivo ]<br />
                then
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;# es directorio
                <br />
                fi
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-chart-3">Bucle FOR</h4>
              <code className="block bg-muted p-2 rounded text-xs font-mono mb-2">
                for i in `ls $directorio`
                <br />
                do
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;# procesar $i
                <br />
                done
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-chart-4">Bucle UNTIL</h4>
              <code className="block bg-muted p-2 rounded text-xs font-mono mb-2">
                contador=0
                <br />
                until [ $contador -eq $total ]<br />
                do
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;contador=`expr $contador + 1`
                <br />
                done
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
