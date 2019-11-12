import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  HostListener,
  HostBinding,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // @HostListener('click') toggleDropdown() {
  //   this.dropdownToggled = !this.dropdownToggled;
  // }

  @HostBinding('class.open') private dropdownToggled: boolean;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.dropdownToggled = this.elRef.nativeElement.contains(event.target)
      ? !this.dropdownToggled
      : false;
  }
  constructor(private elRef: ElementRef) {}
}
