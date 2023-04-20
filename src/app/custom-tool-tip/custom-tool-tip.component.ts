import { ContentChild, Directive, ElementRef, QueryList } from '@angular/core';
function getCoord( elementParent:HTMLElement,tooltip:HTMLElement){
  const boxParent = elementParent.getBoundingClientRect()
  const boxToolTip = tooltip.getBoundingClientRect()
  let left = (boxParent.left  + (boxParent.width/2)) - (boxToolTip.width/2)
  left = (boxParent.left - (boxToolTip.width/2)) + ((boxParent.width-boxToolTip.width)/2)
  let top = 0;
  if(boxParent.y > boxToolTip.height){
    top = boxParent.top - boxToolTip.height
  }
  else{
    top = boxParent.top + boxParent.height
  }
  return [left,top]
    
}


@Directive({
  selector: '[customToolTip]'})
export class CustomToolTipComponent {
  @ContentChild('customToolTip') 
  element !: ElementRef
  parent : HTMLElement
  constructor(private eleRef: ElementRef) {
    this.parent = eleRef.nativeElement
}



ngAfterViewInit(){
  const currentElement = this.element.nativeElement;
  const pos = getCoord(this.parent,currentElement)
  currentElement.style.position = "absolute";
  currentElement.style.left = `${pos[0]}px`
  currentElement.style.top = `${pos[1]}px`
  currentElement.hidden = true;
  this.parent.addEventListener("mouseover",function t(e:any){
    currentElement.hidden = false;
  })
  this.parent.addEventListener("mouseout",function t(e:any){
    currentElement.hidden = true;
  })
  
  
}


}
