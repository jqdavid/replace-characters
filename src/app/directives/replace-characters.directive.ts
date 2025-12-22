import { Directive, HostListener, inject, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Mapa de caracteres para reemplazar caracteres especiales por sus equivalentes.
 * Por ejemplo, 'á' se reemplaza por 'a', 'ñ' por 'n', etc.
 */
const CHAR_MAP: Record<string, string> = {
  á: 'a',
  Á: 'A',
  é: 'e',
  É: 'E',
  í: 'i',
  Í: 'I',
  ó: 'o',
  Ó: 'O',
  ú: 'u',
  Ú: 'U',
  ñ: 'n',
  Ñ: 'N',
};

/**
 * Directiva que reemplaza caracteres especiales en un campo de entrada (input) y valida el contenido.
 *
 * ### Propósito:
 * - Reemplazar caracteres especiales (como tildes y la letra ñ) por sus equivalentes sin acentos.
 * - Validar que el contenido del campo cumpla con un conjunto de reglas definidas por expresiones regulares.
 * - Opcionalmente, controlar si se permiten espacios en el contenido.
 *
 * ### Ejemplo de uso:
 * ```html
 * <input type="text" replaceCharacters [regexReplace]="'[áéíóúÁÉÍÓÚñÑ]'"
 *        [regexValidation]="'[a-zA-Z0-9\\s]'" [allowSpaces]="false">
 * ```
 */
@Directive({
  selector: '[replaceCharacters]',
  standalone: true,
})
export class ReplaceCharactersDirective {
  /**
   * Referencia al control de formulario asociado (si existe).
   */
  private readonly ngControl = inject(NgControl, { optional: true });

  /**
   * Expresión regular para identificar los caracteres que deben ser reemplazados.
   * Por defecto, incluye caracteres con tildes y la letra ñ.
   */
  @Input('svnReplaceCharacters') regexReplace: string = '[áéíóúÁÉÍÓÚñÑ]';

  /**
   * Expresión regular para validar los caracteres permitidos en el campo.
   * Por defecto, permite letras, números y espacios.
   */
  @Input() regexValidation: string = '[a-zA-Z0-9\\s]';

  /**
   * Flags para las expresiones regulares (como 'g' para búsqueda global).
   * Por defecto, se utiliza el flag 'g'.
   */
  @Input() regexFlags: string = 'g';

  /**
   * Indica si se permiten espacios en el contenido del campo.
   * Por defecto, los espacios están permitidos.
   */
  @Input() allowSpaces: boolean = true;

  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement) {
    const value: string = target.value;
    const replaceRegex = new RegExp(this.regexReplace, this.regexFlags);
    const validateRegex = new RegExp(this.regexValidation);
    let normalized = value.replace(replaceRegex, (match) => CHAR_MAP[match] || match);
    normalized = normalized
      .split('')
      .filter((char) => validateRegex.test(char))
      .join('');
    normalized = normalized.replace(/\s+/g, this.allowSpaces ? ' ' : '');

    if (normalized !== value) {
      if (this.ngControl?.control) {
        this.ngControl.control?.setValue(normalized, { emitEvent: false });
      } else {
        target.value = normalized;
      }
    }
  }
}