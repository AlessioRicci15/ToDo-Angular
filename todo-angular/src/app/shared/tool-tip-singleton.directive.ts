import { AfterViewInit, ContentChildren, Directive, QueryList } from '@angular/core';
import { createSingleton } from 'tippy.js';
import { ToolTipDirective } from './tool-tip.directive';

@Directive({
  selector: '[ToolTipSingleton]'
})
export class TollTipSingletonDirective implements AfterViewInit {

  @ContentChildren(ToolTipDirective, { descendants: true })
  elementsWithTooltips!: QueryList<ToolTipDirective>;

  constructor() { }

  ngAfterViewInit(): void {
    createSingleton(this.getTippyInstances(), {
      delay: [150, 0],
      moveTransition: 'transform 0.5s ease-out'
    })
  }

  getTippyInstances(){
    return this.elementsWithTooltips?.toArray().map((t) => {
      return t.tippyInstance
    })
  }

}
