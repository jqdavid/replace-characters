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
