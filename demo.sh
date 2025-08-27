#!/bin/bash

# Demostración del formateo de archivos XML
# Este script muestra el antes y después del formateo

echo "========================================"
echo "  DEMOSTRACIÓN DE FORMATEO XML"
echo "========================================"
echo

echo "📁 Archivos XML encontrados en el repositorio:"
for file in prueba prueba2 prueba4 prueba6 prueba7; do
    if [ -f "$file" ]; then
        file_type=$(file "$file" | grep -o "XML")
        if [ "$file_type" = "XML" ]; then
            # Verificar si ya está formateado (más de 2 líneas)
            lines=$(wc -l < "$file")
            if [ "$lines" -gt 2 ]; then
                status="✅ Ya formateado"
            else
                status="❌ No formateado"
            fi
            echo "  $file - $status"
        fi
    fi
done

echo
echo "🔧 Formateando archivos XML no indentados..."
echo

# Formatear archivos que no están formateados
for file in prueba prueba4 prueba7; do
    if [ -f "$file" ]; then
        echo "Formateando $file..."
        
        # Mostrar primeras líneas del archivo original
        echo "  📋 ANTES (primeras 100 caracteres):"
        echo "     $(head -c 100 "$file")..."
        
        # Formatear
        python3 format_xml.py "$file" "${file}_formatted.xml"
        
        # Mostrar primeras líneas del archivo formateado
        echo "  ✨ DESPUÉS (primeras 10 líneas):"
        head -10 "${file}_formatted.xml" | sed 's/^/     /'
        echo
    fi
done

echo "✅ Demostración completada!"
echo
echo "📚 Para más información, consulta el README.md"