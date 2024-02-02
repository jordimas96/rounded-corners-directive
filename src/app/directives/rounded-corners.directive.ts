import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[roundedCorners]',
    standalone: true
})
export class RoundedCornersDirective {

    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
    ) {

    }

    ngOnInit() {
        this.roundCorners(this.element.nativeElement, null);
    }

    roundCorners(e: HTMLElement, radiPare: number | null) {
        let radiCalculat: number;
        let unit; // Suposant que tot estigui en les mateixes unitats //
        
        const estilElement = e.computedStyleMap();

        if (radiPare === null) {
            let br: any = estilElement.get("border-top-left-radius")!;
            radiCalculat = br.value;
            unit = br.unit;
        } else {
            
            let sumaMarges = 0;

            const estilPare = e.parentElement!.computedStyleMap();
            

            let pl: any = estilPare.get("padding-left")!;
            let bl: any = estilPare.get("border-left-width")!;
            let ml: any = estilElement.get("margin-left")!;

            sumaMarges += pl.value;
            sumaMarges += bl.value;
            sumaMarges += ml.value;
            
            
            unit = pl.unit;
            radiCalculat = radiPare - sumaMarges;

            this.renderer.setStyle(e, "border-radius", radiCalculat + unit);
        }
            
        

        // Llancem la funcio pels fills
        e.childNodes.forEach((e: ChildNode) => {
            if (!e.nodeValue)
                this.roundCorners(<HTMLElement>e, radiCalculat);
        });
    

    }

}
