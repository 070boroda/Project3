import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'NumerologiC';
  day: string = '';
  month: string = '';
  year: string = '';
  arDay: any [] = [];
  res: number = 0;
  oneNumber: any;


  addTask() {
    console.log(this.day)
    console.log(this.month)
    console.log(this.year)
    this.arDay = this.day.split("")
    this.oneNumber = this.oneValue(this.day, this.month, this.year)
    console.log(this.oneNumber)
  }

  private oneValue(a: string, b: string, c: string): number {
    let temp = a + b + c
    let arTemp: any[] = temp.split('')
    let sum = 0
    let result = 0

    for (let i of arTemp) {
      sum += +i
      console.log(sum)
    }
    while (sum > 11){
      console.log("Start do While")
      let arTemp: string [] = []
      arTemp = sum.toString().split('')
      console.log("Массив из вайла", arTemp)
      sum = 0
      for (let i of arTemp) {
        sum += +i
        console.log("From while sum = ", sum)
        }
      arTemp = []
      }

        if (sum === 11) {
          return sum
        } else if (sum === 10) {
          return 1
        } else {
          return sum
        }
    }
  }


