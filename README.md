# Replace Characters Directive - Angular

## 📋 Descripción del Proyecto

Este proyecto es una **implementación de referencia** de una directiva Angular que reemplaza caracteres especiales en campos de entrada de texto. Está diseñado para servir como ejemplo práctico en documentación técnica y como base para implementaciones en proyectos reales.

La directiva `ReplaceCharactersDirective` permite normalizar automáticamente la entrada de texto del usuario, reemplazando caracteres con tildes (á, é, í, ó, ú) y la letra ñ por sus equivalentes sin acentos, además de validar el contenido según reglas personalizables.

## 🎯 Propósito

Este proyecto sirve como:
- **Proyecto implementador**: Ejemplo completo y funcional de la directiva
- **Referencia de documentación**: Base para documentación técnica
- **Demostración práctica**: Proyecto desplegable para pruebas y ejemplos
- **Plantilla reutilizable**: Base para implementar en otros proyectos

## ✨ Características de la Directiva

- ✅ Reemplazo automático de caracteres especiales (tildes, ñ)
- ✅ Validación personalizable mediante expresiones regulares
- ✅ Control de espacios en el texto
- ✅ Compatible con formularios reactivos de Angular
- ✅ Directiva standalone (no requiere módulos)
- ✅ Altamente configurable mediante inputs

## 🔧 Requisitos del Sistema

### Versiones Requeridas

| Dependencia | Versión Requerida | Descripción |
|------------|-------------------|-------------|
| **Node.js** | `>= 18.19.0` | Runtime de JavaScript |
| **npm** | `>= 10.0.0` | Gestor de paquetes |
| **Angular CLI** | `^18.2.21` | Herramienta de línea de comandos |
| **Angular Core** | `^18.2.0` | Framework principal |
| **TypeScript** | `~5.5.2` | Lenguaje de programación |

### Verificar Versiones Instaladas

```bash
# Verificar Node.js
node --version  # Debe ser >= 18.19.0

# Verificar npm
npm --version   # Debe ser >= 10.0.0

# Verificar Angular CLI
ng version      # Debe ser ^18.2.x
```

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd replace-characters
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Ejecutar el Proyecto

```bash
# Modo desarrollo
npm start

# El servidor estará disponible en http://localhost:4200
```

## 📦 Estructura del Proyecto

```
replace-characters/
├── src/
│   ├── app/
│   │   ├── directives/
│   │   │   └── replace-characters.directive.ts  # Directiva principal
│   │   ├── app.component.ts                     # Componente raíz
│   │   ├── app.component.html                   # Template de ejemplo
│   │   └── app.config.ts                        # Configuración de la app
│   ├── index.html
│   └── main.ts
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## 💻 Uso de la Directiva

### Importación

```typescript
import { ReplaceCharactersDirective } from './directives/replace-characters.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReplaceCharactersDirective, ReactiveFormsModule],
  // ...
})
export class AppComponent {}
```

### Ejemplo Básico

```html
<!-- Reemplazo automático de tildes y ñ -->
<input 
  type="text" 
  replaceCharacters
  placeholder="Escribe con tildes o ñ"
/>
```

### Ejemplo con Configuración Personalizada

```html
<!-- Sin permitir espacios -->
<input 
  type="text" 
  replaceCharacters
  [allowSpaces]="false"
  [regexReplace]="'[áéíóúÁÉÍÓÚñÑ]'"
  [regexValidation]="'[a-zA-Z0-9]'"
  placeholder="Solo letras y números"
/>
```

### Ejemplo con Formularios Reactivos

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReplaceCharactersDirective } from './directives/replace-characters.directive';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, ReplaceCharactersDirective],
  template: `
    <form [formGroup]="form">
      <input 
        formControlName="username"
        replaceCharacters
        [allowSpaces]="false"
        placeholder="Usuario sin caracteres especiales"
      />
    </form>
  `
})
export class FormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['']
    });
  }
}
```

## ⚙️ Configuración de la Directiva

### Inputs Disponibles

| Input | Tipo | Valor por Defecto | Descripción |
|-------|------|-------------------|-------------|
| `regexReplace` | `string` | `'[áéíóúÁÉÍÓÚñÑ]'` | Expresión regular para caracteres a reemplazar |
| `regexValidation` | `string` | `'[a-zA-Z0-9\\s]'` | Expresión regular para caracteres válidos |
| `regexFlags` | `string` | `'g'` | Flags de las expresiones regulares |
| `allowSpaces` | `boolean` | `true` | Permite o bloquea espacios en el texto |

### Mapa de Caracteres

La directiva reemplaza los siguientes caracteres:

| Carácter Original | Reemplazo |
|------------------|-----------|
| á, Á | a, A |
| é, É | e, E |
| í, Í | i, I |
| ó, Ó | o, O |
| ú, Ú | u, U |
| ñ, Ñ | n, N |


## 🏗️ Compilación para Producción

```bash
# Compilar el proyecto
npm run build

# Los archivos compilados estarán en dist/replace-characters/
```

## 📚 Casos de Uso

1. **Formularios de registro**: Normalizar nombres de usuario sin caracteres especiales
2. **Campos de búsqueda**: Facilitar búsquedas sin preocuparse por tildes
3. **Identificadores**: Crear códigos o IDs sin caracteres especiales
4. **Validación de entrada**: Restringir caracteres permitidos en tiempo real

## 🔄 Comandos Disponibles

```bash
npm start          # Inicia el servidor de desarrollo
npm run build      # Compila el proyecto para producción
npm test           # Ejecuta las pruebas unitarias
npm run watch      # Compila en modo observación
```

## 📄 Licencia

Este proyecto es de código abierto y está disponible como ejemplo de implementación.

## 👥 Contribuciones

Este proyecto sirve como referencia y documentación. Las contribuciones son bienvenidas para mejorar los ejemplos y la documentación.

## 📞 Soporte

Para preguntas o problemas relacionados con la implementación de esta directiva, consulta la documentación incluida en el código fuente.

---

**Nota**: Este es un proyecto de ejemplo diseñado específicamente para servir como referencia en documentación técnica. Las versiones de Angular y Node.js especificadas son requeridas para garantizar la compatibilidad completa.