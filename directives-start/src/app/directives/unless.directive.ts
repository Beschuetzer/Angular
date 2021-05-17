import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[unless]'
})
export class UnlessDirective {
  //Setter is a method that gets executed whenever the property 'unless' changes in this case
  @Input() set unless(condition: boolean) {
    if (!condition) {
      //inserting the template into the ViewContainer
      this.vcRef.createEmbeddedView(this.templateRef);
    } 
    else {
      //Clearing ViewContainer
      this.vcRef.clear();
    }
  }

  //NOTE: need to get access to the template that the directive will sit on (remember *ngSomeDirective means that it sits on a template)
  //the ViewContainerRef is where we put the directive in the document
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
