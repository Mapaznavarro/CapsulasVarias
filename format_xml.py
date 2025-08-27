#!/usr/bin/env python3
"""
Script para identar archivos XML y hacerlos más legibles para examinar su contenido.

Usage:
    python format_xml.py <archivo_xml> [archivo_salida]
    
Si no se especifica archivo de salida, se sobrescribe el archivo original.
"""

import sys
import xml.dom.minidom
import argparse
import os

def format_xml_file(input_file, output_file=None):
    """
    Formatea un archivo XML para hacerlo más legible con indentación apropiada.
    
    Args:
        input_file (str): Ruta al archivo XML de entrada
        output_file (str, optional): Ruta al archivo de salida. Si no se especifica, 
                                   se sobrescribe el archivo original.
    """
    try:
        # Leer el archivo XML
        with open(input_file, 'r', encoding='utf-8') as f:
            xml_content = f.read()
        
        # Limpiar comillas escapadas comunes en declaraciones XML mal formadas
        xml_content = xml_content.replace('\\"', '"')
        
        # Parsear el XML
        dom = xml.dom.minidom.parseString(xml_content)
        
        # Formatear con indentación
        formatted_xml = dom.toprettyxml(indent="  ", encoding=None)
        
        # Limpiar líneas vacías extra que puede agregar toprettyxml
        lines = [line for line in formatted_xml.split('\n') if line.strip()]
        formatted_xml = '\n'.join(lines)
        
        # Determinar archivo de salida
        output_path = output_file if output_file else input_file
        
        # Escribir el archivo formateado
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(formatted_xml)
        
        print(f"✓ XML formateado exitosamente: {output_path}")
        
    except xml.parsers.expat.ExpatError as e:
        print(f"✗ Error al parsear el XML: {e}")
        sys.exit(1)
    except FileNotFoundError:
        print(f"✗ Archivo no encontrado: {input_file}")
        sys.exit(1)
    except Exception as e:
        print(f"✗ Error inesperado: {e}")
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(
        description="Formatea archivos XML para hacerlos más legibles",
        epilog="Ejemplo: python format_xml.py prueba prueba_formateado.xml"
    )
    parser.add_argument("input_file", help="Archivo XML de entrada")
    parser.add_argument("output_file", nargs="?", help="Archivo de salida (opcional)")
    
    args = parser.parse_args()
    
    # Verificar que el archivo de entrada existe
    if not os.path.exists(args.input_file):
        print(f"✗ El archivo {args.input_file} no existe")
        sys.exit(1)
    
    # Formatear el archivo
    format_xml_file(args.input_file, args.output_file)

if __name__ == "__main__":
    main()