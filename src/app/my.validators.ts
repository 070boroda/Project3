import { AbstractControl, ValidatorFn } from '@angular/forms';

export class MyValidators {
  static restrictDay: ValidatorFn = (control: AbstractControl) => {
    const value = control.value;
    if (!value) return null;

    // Проверка на число, начинающееся с нуля (01, 02 и т.д.)
    if (value.startsWith('0')) {
      return { restrictDay: true };
    }

    return null;
  };

  static lessDay: ValidatorFn = (control: AbstractControl) => {
    const value = control.value;
    if (!value) return null;

    const day = parseInt(value, 10);
    if (isNaN(day) || day < 1 || day > 31) {
      return { lessDay: true };
    }

    return null;
  };

  static lessMonth: ValidatorFn = (control: AbstractControl) => {
    const value = control.value;
    if (!value) return null;

    const month = parseInt(value, 10);
    if (isNaN(month) || month < 1 || month > 12) {
      return { lessMonth: true };
    }

    return null;
  };

  // Дополнительный валидатор для проверки реальных дат
  static validDate: ValidatorFn = (control: AbstractControl) => {
    const day = control.get('day')?.value;
    const month = control.get('month')?.value;
    const year = control.get('year')?.value;

    if (!day || !month || !year) return null;

    const date = new Date(`${year}-${month}-${day}`);
    if (isNaN(date.getTime())) {
      return { invalidDate: true };
    }

    return null;
  };
}
