import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngElse]'
})
export class NgElseDirective {
  mostrarCursos: boolean = false;
  
  @Input() set ngElse(condition: boolean){
    if (!condition){
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    } else {
      this._viewContainerRef.clear();
    }
  }

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainerRef: ViewContainerRef
  ) { }


  onMostrarCursos(){
    this.mostrarCursos =!this.mostrarCursos;
  }
}
