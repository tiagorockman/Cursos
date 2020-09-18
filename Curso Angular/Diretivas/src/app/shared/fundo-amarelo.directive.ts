import { Directive, ElementRef, Renderer} from '@angular/core';

@Directive({
  selector: 'p[fundoAmarelo]'  //com o p antes do seletor aplica apenas a tags <p>
})
export class FundoAmareloDirective {

  constructor(private _elementRef: ElementRef,
              private _renderer : Renderer) { 
    //console.log(this._elementRef.nativeElement);
    //this._elementRef.nativeElement.style.backgroundColor = 'yellow';

    //outra forma de fazer com menos risco de segurança a ataque xxs é usar o Renderer
    this._renderer.setElementStyle(
                  this._elementRef.nativeElement,
                  'background-color',
                  'yellow'
      );
  }

}
