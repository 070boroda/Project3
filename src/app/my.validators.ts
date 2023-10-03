import {UntypedFormControl} from "@angular/forms";

export class MyValidators {

  static restrictDay(control: UntypedFormControl): { [key: string]: boolean } {
    if (['01','02','03','04','06','05','07','08','08','09'].includes(control.value)){
      return {'restrictDay': true};
    }
      return null;
  }

  static lessDay(control: UntypedFormControl): { [key: string]: boolean } {
    if (+control.value > 31) {
      return {'lessDay': true};
    }
    return null;
  }

  static lessMonth(control: UntypedFormControl): { [key: string]: boolean } {
    if (+control.value > 12) {
      return {'lessMonth': true};
    }
    return null;
  }
}
