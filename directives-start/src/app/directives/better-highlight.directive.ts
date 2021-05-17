import { 
  HostBinding,
  Directive,
  Renderer2,
  OnInit,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  //NOTE: These inputs binding hooks allow you to bind to the host element as if it had these properties on it
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';

   //NOTE: if all we want to do is change the background color in a directive, we can use the decorator @HostBinding
   //@HostBinding allows to you bind to any property of the host element (e.g. .classList, .className, .style, etc.)
  @HostBinding('style.backgroundColor') backgroundColor: string;

  ngOnInit() {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.highlightColor);
    this.backgroundColor = this.defaultColor;
  }

  //@HostListener allows directives to listen the events that are triggered on the host element
  @HostListener('mouseenter') mouseOver(e: Event) {
    //Using the renderer
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.highlightColor);

    //if using @HostBinding
    this.backgroundColor = this.highlightColor;
  }
  @HostListener('mouseleave') mouseLeave(e: Event) {
    //Using the renderer
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.defaultColor);

    //if using @HostBinding
    this.backgroundColor = this.defaultColor;
  }

 
}
