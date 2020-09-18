import { Directive, HostListener, ElementRef, Renderer, HostBinding } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  //assim que passar o mouse sobre a tag onMouseOver é um nome genérico
@HostListener('mouseenter') onMouseOver(){
  /*this._renderer.setElementStyle(
    this._elementRef.nativeElement,
    'background-color', 'green'
  )
  */
  this.backgroundColor = 'yellow'
}

@HostListener('mouseleave') onMouseLeave(){
  /*this._renderer.setElementStyle(
    this._elementRef.nativeElement,
    'background-color', 'white'
  )*/
  this.backgroundColor = 'white'
}

//outra forma de fazer onmouseOver e onmouseLeave
@HostBinding('style.backgroundColor') backgroundColor: string;



  constructor(
    //private _elementRef: ElementRef,
    //  private _renderer: Renderer
    ) 
      { 
       
     }

}
