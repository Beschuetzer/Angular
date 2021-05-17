import { Directive, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  //Attachs 'open' class to the host element on click of host element and removes it when clicking again (toggle)
  @HostBinding('class.open') isOpen: any = false;
  ngOnInit() {
  }

  @HostListener('click') toggleOpen(e: Event) {
    this.isOpen = !this.isOpen;
  }
}
