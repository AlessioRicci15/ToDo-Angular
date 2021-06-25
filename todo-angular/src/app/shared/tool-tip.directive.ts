import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import tippy from 'tippy.js';

@Directive({
  selector: '[ToolTip]'
})
export class ToolTipDirective implements AfterViewInit {

  @Input('ToolTip') tooltipContent: string = "";
  public tippyInstance: any;

  constructor(private elRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.tippyInstance = tippy(this.elRef.nativeElement, {
      content: this.tooltipContent
    })
  }

}
