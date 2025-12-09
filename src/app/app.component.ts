import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from './my.validators';

interface CalculationResult {
  digestSoul: number;
  numbers: {
    one: number;
    second: number;
    third: number;
    fourth: number;
  };
  counts: {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
    six: number;
    seven: number;
    eight: number;
    nine: number;
  };
  strings: {
    one: string;
    two: string;
    three: string;
    four: string;
    five: string;
    six: string;
    seven: string;
    eight: string;
    nine: string;
  };
  totals: {
    temperament: number;
    goal: number;
    family: number;
    habits: number;
    life: number;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NumerologY';
  form: FormGroup;

  // Ваши оригинальные переменные
  day: string = '';
  month: string = '';
  year: string = '';
  digestSoul: any;
  oneNumber: number;
  secondNumber: number;
  thirdNumber: number;
  fourthNumber: number;
  resultAr: any[];
  one: string = '';
  two: string = '';
  three: string = '';
  four: string = '';
  five: string = '';
  six: string = '';
  seven: string = '';
  eight: string = '';
  nine: string = '';

  // Объект для хранения всех результатов (для нового интерфейса)
  result: CalculationResult = {
    digestSoul: 0,
    numbers: {
      one: 0,
      second: 0,
      third: 0,
      fourth: 0
    },
    counts: {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      seven: 0,
      eight: 0,
      nine: 0
    },
    strings: {
      one: '',
      two: '',
      three: '',
      four: '',
      five: '',
      six: '',
      seven: '',
      eight: '',
      nine: ''
    },
    totals: {
      temperament: 0,
      goal: 0,
      family: 0,
      habits: 0,
      life: 0
    }
  };

  ngOnInit(): void {
    this.form = new FormGroup({
      day: new FormControl('', [
        Validators.required,
        MyValidators.restrictDay,
        MyValidators.lessDay
      ]),
      month: new FormControl('', [
        Validators.required,
        MyValidators.lessMonth
      ]),
      year: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)
      ])
    });
  }

  // Методы для анимаций
  onInputFocus(event: any): void {
    const input = event.target;
    if (input.parentElement) {
      input.parentElement.style.transform = 'scale(1.02)';
    }
  }

  onInputBlur(event: any): void {
    const input = event.target;
    if (input.parentElement) {
      input.parentElement.style.transform = 'scale(1)';
    }
  }

  addTask(): void {
    if (this.form.invalid) {
      return;
    }

    // Ваша оригинальная логика расчета
    this.day = this.form.get('day').value;
    this.month = this.form.get('month').value;
    this.year = this.form.get('year').value;

    this.digestSoul = this.digestPower(this.day, this.month, this.year);
    this.oneNumber = this.sumBirthDayAndFirstDigest(this.day, this.month, this.year);
    this.secondNumber = this.secondDigest(this.day, this.month, this.year);
    this.thirdNumber = this.thirdDigest(this.day, this.month, this.year);
    this.fourthNumber = this.fourthDigest(this.day, this.month, this.year);

    const allDigits = this.sumAllDigest(
      this.day,
      this.month,
      this.year,
      this.oneNumber,
      this.secondNumber,
      this.thirdNumber,
      this.fourthNumber
    );

    this.one = this.found(allDigits, '1');
    this.two = this.found(allDigits, '2');
    this.three = this.found(allDigits, '3');
    this.four = this.found(allDigits, '4');
    this.five = this.found(allDigits, '5');
    this.six = this.found(allDigits, '6');
    this.seven = this.found(allDigits, '7');
    this.eight = this.found(allDigits, '8');
    this.nine = this.found(allDigits, '9');

    // Также обновляем новый объект result для нового интерфейса
    this.updateResultForNewInterface(allDigits);
  }

  // Ваши оригинальные методы (без изменений)
  private digestPower(a: string, b: string, c: string): number {
    let sum = 0;
    sum = this.sumBirthDayAndFirstDigest(a, b, c);
    while (sum > 11) {
      let arTemp: string[] = [];
      arTemp = sum.toString().split('');
      sum = 0;
      for (let i of arTemp) {
        sum += +i;
      }
      arTemp = [];
    }
    if (this.secondDigest(a, b, c) === 11) {
      return 11;
    }
    if (sum === 11) {
      return 2;
    } else if (sum === 10) {
      return 1;
    } else {
      return sum;
    }
  }

  private sumBirthDayAndFirstDigest(a: string, b: string, c: string): number {
    let temp = a + b + c;
    let arTemp: any[] = temp.split('');
    let sum = 0;
    for (let i of arTemp) {
      sum += +i;
    }
    return sum;
  }

  private secondDigest(a: string, b: string, c: string): number {
    let sum: number = 0;
    for (let i of this.sumBirthDayAndFirstDigest(a, b, c).toString().split('')) {
      sum += +i;
    }
    return sum;
  }

  private thirdDigest(a: string, b: string, c: string): number {
    let arTemp: string[];
    arTemp = a.split('');
    return Math.abs(this.sumBirthDayAndFirstDigest(a, b, c) - 2 * +arTemp[0]);
  }

  private fourthDigest(a: string, b: string, c: string): number {
    let sum: number = 0;
    for (let i of this.thirdDigest(a, b, c).toString().split('')) {
      sum += +i;
    }
    return sum;
  }

  private sumAllDigest(
    a: string,
    b: string,
    c: string,
    first: number,
    second: number,
    third: number,
    fourth: number
  ): string[] {
    this.resultAr = [];
    const temp = a + b + c + first.toString() + second.toString() + third.toString() + fourth.toString();
    return this.resultAr = temp.split('');
  }

  private found(arrStr: string[], number: string): string {
    let result: string[] = [];
    result = arrStr.filter(n => n == number);
    return result.join('');
  }

  // Новый метод для обновления объекта result (для нового интерфейса)
  private updateResultForNewInterface(allDigits: string[]): void {
    // Подсчитываем количество каждой цифры
    const counts: Record<string, number> = {
      '1': 0, '2': 0, '3': 0, '4': 0, '5': 0,
      '6': 0, '7': 0, '8': 0, '9': 0
    };

    allDigits.forEach(digit => {
      if (counts.hasOwnProperty(digit)) {
        counts[digit]++;
      }
    });

    // Обновляем result для нового интерфейса
    this.result.digestSoul = this.digestSoul;
    this.result.numbers = {
      one: this.oneNumber,
      second: this.secondNumber,
      third: this.thirdNumber,
      fourth: this.fourthNumber
    };

    this.result.counts = {
      one: counts['1'],
      two: counts['2'],
      three: counts['3'],
      four: counts['4'],
      five: counts['5'],
      six: counts['6'],
      seven: counts['7'],
      eight: counts['8'],
      nine: counts['9']
    };

    this.result.strings = {
      one: this.one,
      two: this.two,
      three: this.three,
      four: this.four,
      five: this.five,
      six: this.six,
      seven: this.seven,
      eight: this.eight,
      nine: this.nine
    };

    this.result.totals = {
      temperament: this.three.length + this.five.length + this.seven.length,
      goal: this.one.length + this.four.length + this.seven.length,
      family: this.two.length + this.five.length + this.eight.length,
      habits: this.three.length + this.six.length + this.nine.length,
      life: this.four.length + this.five.length + this.six.length
    };
  }

  // Геттеры для нового интерфейса (опционально, можно использовать напрямую)
  get newDigestSoul(): number {
    return this.result.digestSoul;
  }

  get newOneNumber(): number {
    return this.result.numbers.one;
  }

  get newSecondNumber(): number {
    return this.result.numbers.second;
  }

  get newThirdNumber(): number {
    return this.result.numbers.third;
  }

  get newFourthNumber(): number {
    return this.result.numbers.fourth;
  }

  get newOne(): string {
    return this.result.strings.one;
  }

  get newTwo(): string {
    return this.result.strings.two;
  }

  get newThree(): string {
    return this.result.strings.three;
  }

  get newFour(): string {
    return this.result.strings.four;
  }

  get newFive(): string {
    return this.result.strings.five;
  }

  get newSix(): string {
    return this.result.strings.six;
  }

  get newSeven(): string {
    return this.result.strings.seven;
  }

  get newEight(): string {
    return this.result.strings.eight;
  }

  get newNine(): string {
    return this.result.strings.nine;
  }

  get temperamentTotal(): number {
    return this.result.totals.temperament;
  }

  get goalTotal(): number {
    return this.result.totals.goal;
  }

  get familyTotal(): number {
    return this.result.totals.family;
  }

  get habitsTotal(): number {
    return this.result.totals.habits;
  }

  get lifeTotal(): number {
    return this.result.totals.life;
  }
}
