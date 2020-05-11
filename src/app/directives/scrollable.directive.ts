import { Directive, Output, ElementRef, HostListener, EventEmitter } from '@angular/core';


@Directive({
  selector: '[scrollable]'
})
export class ScrollableDirective {
  @Output() public scrollPosition = new EventEmitter();

  constructor( public el: ElementRef) {  
  }

  @HostListener('scroll', ['$event'])
  onScrollEvent($event) {
    try {
      const top = $event.target.scrollTop;
      const height = this.el.nativeElement.scrollHeight;
      const offset = this.el.nativeElement.offsetHeight;

      if( top > height - offset -1){
        this.scrollPosition.emit('bottom');
      }

      if( top === 0){
        this.scrollPosition.emit('top');
      }

    } catch (error) {
      
    }
  }

}
