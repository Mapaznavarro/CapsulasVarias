# Herramienta de Formateo XML

Esta herramienta permite identar archivos XML para poder examinar su contenido de manera más fácil y legible.

## Uso

### Formatear un archivo XML creando una nueva versión formateada:

```bash
python3 format_xml.py archivo_original.xml archivo_formateado.xml
```

### Formatear un archivo XML sobrescribiendo el original:

```bash
python3 format_xml.py archivo_original.xml
```

## Ejemplos

### Formatear los archivos XML no indentados del repositorio:

```bash
# Crear versiones formateadas de los archivos XML no indentados
python3 format_xml.py prueba prueba_formateado.xml
python3 format_xml.py prueba4 prueba4_formateado.xml
python3 format_xml.py prueba7 prueba7_formateado.xml
```

### Ver la ayuda:

```bash
python3 format_xml.py --help
```

### Ejecutar la demostración completa:

```bash
./demo.sh
```

Este script automáticamente detecta qué archivos XML necesitan formateo y los procesa, mostrando el antes y después.

## Características

- ✅ Mantiene el contenido XML original intacto
- ✅ Aplica indentación consistente con 2 espacios
- ✅ Maneja archivos XML de cualquier tamaño
- ✅ Detecta y reporta errores de formato XML
- ✅ Permite crear archivos nuevos o sobrescribir los originales
- ✅ Soporte para codificación UTF-8

## Archivos en el repositorio

| Archivo | Estado | Descripción |
|---------|--------|-------------|
| `prueba` | ❌ No formateado | XML en una sola línea, difícil de leer |
| `prueba2` | ✅ Ya formateado | XML con indentación apropiada |
| `prueba4` | ❌ No formateado | XML en una sola línea, difícil de leer |
| `prueba6` | ✅ Ya formateado | XML con indentación apropiada |
| `prueba7` | ❌ No formateado | XML en una sola línea, difícil de leer |

## Requisitos

- Python 3.x (incluye la librería xml.dom.minidom por defecto)