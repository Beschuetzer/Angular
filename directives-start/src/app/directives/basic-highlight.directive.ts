import { Directive, ElementRef, OnInit } from '@angular/core';

//NOTE: This directive can be applied to an element/component due to the selector being an attribute ('[someAttribute]')
@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
  //inject element that directive sits on into by specifying arguments in the constructor;  ANgular will try to provide what we ask for
  constructor(private elementRef: ElementRef) { }
  //change background-color to element on which this directive sits on

  ngOnInit () {
    //WARNING: this not considered best practice
    this.elementRef.nativeElement.style.backgroundColor = 'yellow';
  }
}
