import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {MyValidators} from './my.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  title = 'NumerologY';
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
  form: UntypedFormGroup;

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      day: new UntypedFormControl('', [Validators.required,
        MyValidators.restrictDay, MyValidators.lessDay]),
      month: new UntypedFormControl('',[Validators.required,
      MyValidators.lessMonth]),
      year: new UntypedFormControl('',[Validators.required,
      Validators.minLength(4)])
    });
  }

  addTask() {
    this.day = this.form.get('day').value;
    this.month = this.form.get('month').value;
    this.year = this.form.get('year').value;

    this.digestSoul = this.digestPower(this.day, this.month, this.year);
    this.oneNumber = this.sumBirthDayAndFirstDigest(this.day, this.month, this.year);
    this.secondNumber = this.secondDigest(this.day, this.month, this.year);
    this.thirdNumber = this.thirdDigest(this.day, this.month, this.year);
    this.fourthNumber = this.fourthDigest(this.day, this.month, this.year);
    this.sumAllDigest(this.day, this.month, this.year, this.sumBirthDayAndFirstDigest(this.day, this.month, this.year),
      this.secondNumber, this.thirdNumber, this.fourthNumber);
    this.one = this.found(this.sumAllDigest(this.day, this.month, this.year, this.sumBirthDayAndFirstDigest(this.day, this.month, this.year),
      this.secondNumber, this.thirdNumber, this.fourthNumber), '1');
    this.two = this.found(this.sumAllDigest(this.day, this.month, this.year, this.sumBirthDayAndFirstDigest(this.day, this.month, this.year),
      this.secondNumber, this.thirdNumber, this.fourthNumber), '2');
    this.three = this.found(this.sumAllDigest(this.day, this.month, this.year, this.sumBirthDayAndFirstDigest(this.day, this.month, this.year),
      this.secondNumber, this.thirdNumber, this.fourthNumber), '3');
    this.four = this.found(this.sumAllDigest(this.day, this.month, this.year, this.sumBirthDayAndFirstDigest(this.day, this.month, this.year),
      this.secondNumber, this.thirdNumber, this.fourthNumber), '4');
    this.five = this.found(this.sumAllDigest(this.day, this.month, this.year, this.sumBirthDayAndFirstDigest(this.day, this.month, this.year),
      this.secondNumber, this.thirdNumber, this.fourthNumber), '5');
    this.six = this.found(this.sumAllDigest(this.day, this.month, this.year, this.sumBirthDayAndFirstDigest(this.day, this.month, this.year),
      this.secondNumber, this.thirdNumber, this.fourthNumber), '6');
    this.seven = this.found(this.sumAllDigest(this.day, this.month, this.year, this.sumBirthDayAndFirstDigest(this.day, this.month, this.year),
      this.secondNumber, this.thirdNumber, this.fourthNumber), '7');
    this.eight = this.found(this.sumAllDigest(this.day, this.month, this.year, this.sumBirthDayAndFirstDigest(this.day, this.month, this.year),
      this.secondNumber, this.thirdNumber, this.fourthNumber), '8');
    this.nine = this.found(this.sumAllDigest(this.day, this.month, this.year, this.sumBirthDayAndFirstDigest(this.day, this.month, this.year),
      this.secondNumber, this.thirdNumber, this.fourthNumber), '9');
  }

  private digestPower(a: string, b: string, c: string): number {
    let sum = 0;
    sum = this.sumBirthDayAndFirstDigest(a, b, c)
    while (sum > 11) {
      // console.log('Start do While');
      let arTemp: string [] = [];
      arTemp = sum.toString().split('');
      // console.log('Массив из вайла ', arTemp);
      sum = 0;
      for (let i of arTemp) {
        sum += +i;
        console.log('From while sum = ', sum);
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
    // console.log('Сумма чисел рождения', sum);
    return sum;
  }

  private secondDigest(a: string, b: string, c: string): number {
    let sum: number = 0

    for (let i of this.sumBirthDayAndFirstDigest(a, b, c).toString().split('')) {
      sum += +i;
    }
    return sum;
  }

  private thirdDigest(a: string, b: string, c: string): number {
    let arTemp: string[]
    arTemp = a.split('')
    return  Math.abs(this.sumBirthDayAndFirstDigest(a, b, c) - (2 * +arTemp[0]))
  }

  private fourthDigest(a: string, b: string, c: string): number {
    let sum: number = 0
    for (let i of this.thirdDigest(a, b, c).toString().split('')) {
      sum += +i;
    }
    return sum;
  }

  private sumAllDigest(a: string, b: string, c: string, first: number,
                       second: number, third: number, fourth: number): string[] {
    this.resultAr = []
    const temp = a + b + c + first.toString() + second.toString() + third.toString() + fourth.toString();
    console.log('Massiv from sum all digest', temp)
    return this.resultAr = temp.split('');
  }

  private found(arrStr: string[], number: string): string {
    console.log('START')
    let result: string[] = [];
    result = arrStr.filter(n => n == number)
    return result.join('');
  }

}



