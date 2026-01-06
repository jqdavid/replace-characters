# Replace Characters Directive - Angular

## Sitio Web de ejemplo 
👉 **https://jqdavid.github.io/replace-characters/**

## 📋 Descripción del Proyecto

Este proyecto es una **implementación de referencia** de una directiva Angular que reemplaza caracteres especiales en campos de entrada de texto. Está diseñado para servir como ejemplo práctico en documentación técnica y como base para implementaciones en proyectos reales.

La directiva `ReplaceCharactersDirective` permite normalizar automáticamente la entrada de texto del usuario, reemplazando caracteres con tildes (á, é, í, ó, ú) y la letra ñ por sus equivalentes sin acentos, además de validar el contenido según reglas personalizables.

## 📚 Casos de Uso

1. **Formularios de registro**: Normalizar nombres de usuario sin caracteres especiales
2. **Campos de búsqueda**: Facilitar búsquedas sin preocuparse por tildes
3. **Identificadores**: Crear códigos o IDs sin caracteres especiales
4. **Validación de entrada**: Restringir caracteres permitidos en tiempo real

## ✨ Características de la Directiva

- ✅ Reemplazo automático de caracteres especiales (tildes, ñ)
- ✅ Validación personalizable mediante expresiones regulares
- ✅ Control de espacios en el texto
- ✅ Compatible con formularios reactivos de Angular
- ✅ Directiva standalone (no requiere módulos)
- ✅ Altamente configurable mediante inputs



## 💻 Uso de la Directiva

### Importación

```typescript
import { ReplaceCharactersDirective } from './directives/replace-characters.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReplaceCharactersDirective],
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

### Solo Letras

```html
<input 
  type="text" 
  replaceCharacters
  [regexValidation]="'[a-zA-Z\\s]'"
  placeholder="Solo letras"
/>
<!-- Entrada: "Juan123@" → Salida: "Juan" -->
```

### Solo Números (Teléfono)

```html
<input 
  type="tel" 
  replaceCharacters
  [allowSpaces]="false"
  [regexValidation]="'[0-9]'"
  placeholder="Teléfono"
/>
<!-- Entrada: "300-123 4567" → Salida: "3001234567" -->
```

### Alfanumérico

```html
<input 
  type="text" 
  replaceCharacters
  [regexValidation]="'[a-zA-Z0-9\\s]'"
  placeholder="Código"
/>
<!-- Entrada: "ABC-123@#" → Salida: "ABC123" -->
```

### Email

```html
<input 
  type="email" 
  replaceCharacters
  [allowSpaces]="false"
  [regexValidation]="'[a-zA-Z0-9@._-]'"
  placeholder="Email"
/>
<!-- Entrada: "user @ mail . com" → Salida: "user@mail.com" -->
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

## 🧪 Testing

La directiva incluye tests exhaustivos para ambos escenarios: con y sin `NgControl`.

```typescript
import { TestBed } from '@angular/core/testing';
import { FormControl, NgControl } from '@angular/forms';
import { MockProvider } from 'ng-mocks';
import { ReplaceCharactersDirective } from './replace-characters.directive';

describe('ReplaceCharactersDirective', () => {
  let directive: ReplaceCharactersDirective;
  let input: HTMLInputElement;

  beforeEach(() => {
    input = document.createElement('input');
  });

  describe('without NgControl', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ReplaceCharactersDirective],
      });
      directive = TestBed.inject(ReplaceCharactersDirective);
    });

    test('should create an instance', () => {
      expect(directive).toBeTruthy();
    });

    test('should replace special characters and update target value directly', () => {
      input.value = 'Hóla Múndo';
      directive.onInput(input);
      expect(input.value).toBe('Hola Mundo');
    });

    test('should replace multiple special characters', () => {
      input.value = 'ñoño áéíóú ÁÉÍÓÚ';
      directive.onInput(input);
      expect(input.value).toBe('nono aeiou AEIOU');
    });

    test('should filter invalid characters based on regexValidation', () => {
      input.value = 'abc123!@#$%';
      directive.onInput(input);
      expect(input.value).toBe('abc123');
    });

    test('should remove spaces when allowSpaces is false', () => {
      directive.allowSpaces = false;
      input.value = 'hello world test';
      directive.onInput(input);
      expect(input.value).toBe('helloworldtest');
    });

    test('should normalize multiple spaces to single space when allowSpaces is true', () => {
      directive.allowSpaces = true;
      input.value = 'hello    world   test';
      directive.onInput(input);
      expect(input.value).toBe('hello world test');
    });

    test('should not modify value if no changes needed', () => {
      input.value = 'hello world';
      const originalValue = input.value;
      directive.onInput(input);
      expect(input.value).toBe(originalValue);
    });

    test('should use custom regexValidation', () => {
      directive.regexValidation = '[a-z]';
      input.value = 'abcABC123';
      directive.onInput(input);
      expect(input.value).toBe('abc');
    });
  });

  describe('with NgControl', () => {
    let mockControl: FormControl;

    beforeEach(() => {
      mockControl = new FormControl('');
      jest.spyOn(mockControl, 'setValue');

      TestBed.configureTestingModule({
        providers: [ReplaceCharactersDirective, MockProvider(NgControl, { control: mockControl })],
      });
      directive = TestBed.inject(ReplaceCharactersDirective);
    });

    test('should create an instance with NgControl', () => {
      expect(directive).toBeTruthy();
    });

    test('should call control.setValue when ngControl is present', () => {
      input.value = 'Hóla Múndo';
      directive.onInput(input);
      expect(mockControl.setValue).toHaveBeenCalledWith('Hola Mundo', { emitEvent: false });
    });

    test('should call control.setValue with emitEvent false', () => {
      input.value = 'café';
      directive.onInput(input);
      expect(mockControl.setValue).toHaveBeenCalledWith('cafe', { emitEvent: false });
    });

    test('should replace ñ character and call control.setValue', () => {
      input.value = 'Español';
      directive.onInput(input);
      expect(mockControl.setValue).toHaveBeenCalledWith('Espanol', { emitEvent: false });
    });

    test('should not call control.setValue if value does not change', () => {
      input.value = 'hello';
      directive.onInput(input);
      expect(mockControl.setValue).not.toHaveBeenCalled();
    });

    test('should handle spaces with allowSpaces false and call control.setValue', () => {
      directive.allowSpaces = false;
      input.value = 'hello world';
      directive.onInput(input);
      expect(mockControl.setValue).toHaveBeenCalledWith('helloworld', { emitEvent: false });
    });

    test('should normalize multiple spaces and call control.setValue', () => {
      input.value = 'hello     world';
      directive.onInput(input);
      expect(mockControl.setValue).toHaveBeenCalledWith('hello world', { emitEvent: false });
    });

    test('should handle uppercase special characters', () => {
      input.value = 'ÑOÑO ÁÉÍÓÚ';
      directive.onInput(input);
      expect(mockControl.setValue).toHaveBeenCalledWith('NONO AEIOU', { emitEvent: false });
    });

    test('should handle mixed case and special characters', () => {
      input.value = 'CóDíGó';
      directive.onInput(input);
      expect(mockControl.setValue).toHaveBeenCalledWith('CoDiGo', { emitEvent: false });
    });

    test('should filter and replace in combination', () => {
      input.value = 'Hóla!@# Múndo$%^';
      directive.onInput(input);
      expect(mockControl.setValue).toHaveBeenCalledWith('Hola Mundo', { emitEvent: false });
    });
  });

  describe('with NgControl but no control property', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ReplaceCharactersDirective, MockProvider(NgControl, { control: null })],
      });
      directive = TestBed.inject(ReplaceCharactersDirective);
    });

    test('should update target.value when control is null', () => {
      input.value = 'Hóla';
      directive.onInput(input);
      expect(input.value).toBe('Hola');
    });
  });
});

```



## 🚀 Instalación del proyecto ejemplo 
## 🔧 Requisitos del Sistema

### Versiones Requeridas

| Dependencia | Versión Requerida | Descripción |
|------------|-------------------|-------------|
| **Node.js** | `>= 18.19.0` | Runtime de JavaScript |
| **npm** | `>= 10.0.0` | Gestor de paquetes |
| **Angular CLI** | `^18.2.21` | Herramienta de línea de comandos |
| **Angular Core** | `^18.2.0` | Framework principal |
| **TypeScript** | `~5.5.2` | Lenguaje de programación |

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

## 📄 Licencia

Este proyecto es de código abierto y está disponible como ejemplo de implementación.

## 👥 Contribuciones

Este proyecto sirve como referencia y documentación. Las contribuciones son bienvenidas para mejorar los ejemplos y la documentación.

## 📞 Soporte

Para preguntas o problemas relacionados con la implementación de esta directiva, consulta la documentación incluida en el código fuente.

---

**Nota**: Este es un proyecto de ejemplo diseñado específicamente para servir como referencia en documentación técnica. Las versiones de Angular y Node.js especificadas son requeridas para garantizar la compatibilidad completa.