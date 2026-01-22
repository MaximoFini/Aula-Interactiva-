"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, AlertTriangle, Bug, Zap } from "lucide-react"

export function SystemSecurity() {
  const [activeSection, setActiveSection] = useState("pillars")

  const sections = {
    pillars: {
      name: "Pilares de Seguridad",
      icon: Shield,
      color: "text-chart-1",
      bgColor: "bg-chart-1/20",
    },
    threats: {
      name: "Amenazas y Ataques",
      icon: AlertTriangle,
      color: "text-chart-2",
      bgColor: "bg-chart-2/20",
    },
    protection: {
      name: "Protección",
      icon: Lock,
      color: "text-chart-3",
      bgColor: "bg-chart-3/20",
    },
    malware: {
      name: "Malware y Antivirus",
      icon: Bug,
      color: "text-chart-4",
      bgColor: "bg-chart-4/20",
    },
  }

  const pillars = [
    {
      name: "Confidencialidad",
      icon: Eye,
      color: "text-chart-1",
      bgColor: "bg-chart-1/20",
      description: "Acceso solo autorizado",
      details: "Solo usuarios autorizados pueden acceder a la información",
    },
    {
      name: "Integridad",
      icon: Shield,
      color: "text-chart-2",
      bgColor: "bg-chart-2/20",
      description: "Solo usuarios autorizados modifican datos",
      details: "Los datos no pueden ser alterados sin autorización",
    },
    {
      name: "Disponibilidad",
      icon: Zap,
      color: "text-chart-3",
      bgColor: "bg-chart-3/20",
      description: "Acceso cuando se necesita",
      details: "Los recursos están disponibles cuando se requieren",
    },
    {
      name: "Autenticidad",
      icon: Lock,
      color: "text-chart-4",
      bgColor: "bg-chart-4/20",
      description: "Verificar identidad",
      details: "Algo que sé, tengo, soy",
    },
  ]

  const threats = [
    {
      name: "Interrupción",
      affects: "Disponibilidad",
      color: "text-chart-3",
      description: "Bloquea o destruye recursos",
      examples: ["DoS", "Destrucción de hardware", "Corte de comunicaciones"],
    },
    {
      name: "Interceptación",
      affects: "Confidencialidad",
      color: "text-chart-1",
      description: "Acceso no autorizado a información",
      examples: ["Sniffing", "Escucha telefónica", "Copia de archivos"],
    },
    {
      name: "Modificación",
      affects: "Integridad",
      color: "text-chart-2",
      description: "Alteración no autorizada",
      examples: ["Cambio de datos", "Alteración de programas", "Modificación de mensajes"],
    },
    {
      name: "Fabricación",
      affects: "Autenticidad",
      color: "text-chart-4",
      description: "Inserción de datos falsos",
      examples: ["Mensajes falsos", "Archivos espurios", "Suplantación de identidad"],
    },
  ]

  const attackTypes = [
    {
      type: "Ataques Pasivos",
      color: "text-orange-500",
      description: "No alteran recursos",
      characteristics: ["Solo observan", "Difíciles de detectar", "No modifican datos"],
      examples: ["Sniffing", "Monitoreo de tráfico", "Análisis de patrones"],
    },
    {
      type: "Ataques Activos",
      color: "text-destructive",
      description: "Modifican o bloquean recursos",
      characteristics: ["Alteran el sistema", "Más fáciles de detectar", "Causan daño directo"],
      examples: ["DoS", "Suplantación", "Modificación de datos", "Inyección de código"],
    },
  ]

  const malwareTypes = [
    {
      name: "Backdoor",
      description: "Acceso oculto al sistema",
      characteristics: "Puerta trasera para acceso no autorizado",
    },
    {
      name: "Bomba Lógica",
      description: "Se activa bajo condición específica",
      characteristics: "Permanece dormante hasta trigger",
    },
    {
      name: "Troyano",
      description: "Parece útil pero daña",
      characteristics: "Se disfraza de software legítimo",
    },
    {
      name: "Virus",
      description: "Se propaga dentro de otro programa",
      characteristics: "Necesita programa huésped para propagarse",
    },
    {
      name: "Gusano",
      description: "Se propaga por red independientemente",
      characteristics: "No necesita huésped, se replica solo",
    },
    {
      name: "Zombie/Botnet",
      description: "PC controlada a distancia",
      characteristics: "Forma redes de computadoras infectadas",
    },
  ]

  const antivirusMethods = [
    {
      name: "Firmas",
      description: "Comparar con base de datos de patrones conocidos",
      effectiveness: "Alta para malware conocido",
    },
    {
      name: "Heurística",
      description: "Buscar patrones sospechosos de comportamiento",
      effectiveness: "Detecta variantes y malware nuevo",
    },
    {
      name: "Comportamiento",
      description: "Monitorear anomalías en tiempo real",
      effectiveness: "Detecta malware de día cero",
    },
    {
      name: "Sandbox",
      description: "Ejecutar en VM aislada para análisis",
      effectiveness: "Análisis seguro de archivos sospechosos",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-balance">Seguridad de Sistemas</h2>
        <p className="text-muted-foreground text-pretty">Pilares, amenazas, protección y malware</p>
      </div>

      {/* Section Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(sections).map(([key, section]) => (
          <Button
            key={key}
            variant={activeSection === key ? "default" : "outline"}
            onClick={() => setActiveSection(key)}
            className="h-auto p-3 flex flex-col items-center gap-2"
          >
            <section.icon className="h-5 w-5" />
            <span className="text-xs text-center">{section.name}</span>
          </Button>
        ))}
      </div>

      {activeSection === "pillars" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Los 4 Pilares de la Seguridad
              </CardTitle>
              <CardDescription>CIA + Autenticidad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pillars.map((pillar, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${pillar.bgColor}`}>
                        <pillar.icon className={`h-5 w-5 ${pillar.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold">{pillar.name}</h4>
                        <p className="text-sm text-muted-foreground">{pillar.description}</p>
                      </div>
                    </div>
                    <p className="text-sm pl-13">{pillar.details}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle>Recordatorio CIA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Badge variant="outline" className="bg-chart-1/20 text-chart-1 border-chart-1/20 mb-2">
                    C - Confidencialidad
                  </Badge>
                  <p className="text-xs text-muted-foreground">Solo autorizados ven</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="bg-chart-2/20 text-chart-2 border-chart-2/20 mb-2">
                    I - Integridad
                  </Badge>
                  <p className="text-xs text-muted-foreground">Solo autorizados modifican</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="bg-chart-3/20 text-chart-3 border-chart-3/20 mb-2">
                    A - Disponibilidad
                  </Badge>
                  <p className="text-xs text-muted-foreground">Acceso cuando se necesita</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeSection === "threats" && (
        <div className="space-y-6">
          {/* Threat Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Tipos de Amenazas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {threats.map((threat, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{threat.name}</h4>
                      <Badge variant="outline" className={`${threat.color} border-current/20`}>
                        {threat.affects}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{threat.description}</p>
                    <div className="space-y-1">
                      <p className="text-xs font-medium">Ejemplos:</p>
                      {threat.examples.map((example, i) => (
                        <Badge key={i} variant="outline" className="text-xs mr-1">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attack Types */}
          <Card>
            <CardHeader>
              <CardTitle>Ataques Pasivos vs Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {attackTypes.map((attack, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-semibold ${attack.color}`}>{attack.type}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{attack.description}</p>

                    <div>
                      <p className="text-sm font-medium mb-2">Características:</p>
                      <ul className="text-sm space-y-1">
                        {attack.characteristics.map((char, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Ejemplos:</p>
                      <div className="flex flex-wrap gap-1">
                        {attack.examples.map((example, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeSection === "protection" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Mecanismos de Protección
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Técnicas básicas:</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="font-medium text-sm">Aislamiento</p>
                        <p className="text-xs text-muted-foreground">Un proceso no pisa a otro</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="font-medium text-sm">Permisos de acceso</p>
                        <p className="text-xs text-muted-foreground">rwx (read, write, execute)</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="font-medium text-sm">Memoria virtual</p>
                        <p className="text-xs text-muted-foreground">Separar espacios de procesos</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="font-medium text-sm">Matriz de acceso</p>
                        <p className="text-xs text-muted-foreground">Quién puede hacer qué sobre qué recurso</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Contraseñas:</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                        <p className="font-medium text-sm mb-2">Almacenamiento seguro:</p>
                        <p className="text-xs text-muted-foreground">
                          No se guardan en texto plano → versión cifrada con salt
                        </p>
                      </div>

                      <div>
                        <p className="font-medium text-sm mb-2">Estrategias:</p>
                        <div className="space-y-2">
                          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 mr-2">
                            Educación del usuario
                          </Badge>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20 mr-2">
                            Proactivas
                          </Badge>
                          <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/20">
                            Reactivas
                          </Badge>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <p>• Proactivas: sistema valida fuerza antes de aceptar</p>
                          <p>• Reactivas: sistema prueba adivinarlas y las bloquea</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeSection === "malware" && (
        <div className="space-y-6">
          {/* Malware Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5" />
                Tipos de Malware
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {malwareTypes.map((malware, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">{malware.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{malware.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {malware.characteristics}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Differences */}
          <Card>
            <CardHeader>
              <CardTitle>Diferencias Clave para MC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <h4 className="font-semibold mb-2 text-destructive">¡TRAMPA COMÚN!</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-sm">Virus:</p>
                      <p className="text-xs text-muted-foreground">Necesita programa huésped para propagarse</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Gusano:</p>
                      <p className="text-xs text-muted-foreground">Se propaga solo por la red</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="font-medium text-sm">Intrusión:</p>
                    <p className="text-xs text-muted-foreground">Detectar patrones distintos al usuario normal</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="font-medium text-sm">Botnet:</p>
                    <p className="text-xs text-muted-foreground">Red de PCs zombie controladas remotamente</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Antivirus Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Métodos de Antivirus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {antivirusMethods.map((method, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">{method.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{method.description}</p>
                    <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                      {method.effectiveness}
                    </Badge>
                  </div>
                ))}
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
              <h4 className="font-semibold mb-2">Pilares CIA:</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    confidencialidad
                  </Badge>
                  <span className="text-sm">→ solo autorizados ven</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    integridad
                  </Badge>
                  <span className="text-sm">→ solo autorizados modifican</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    disponibilidad
                  </Badge>
                  <span className="text-sm">→ acceso cuando se necesita</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Trampas comunes:</h4>
              <ul className="text-sm space-y-1">
                <li>• Virus ≠ Gusano (huésped vs independiente)</li>
                <li>• Sniffing = ataque pasivo</li>
                <li>• DoS = ataque activo</li>
                <li>• Salt = seguridad en contraseñas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
