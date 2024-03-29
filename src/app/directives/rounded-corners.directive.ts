import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[roundedCorners]',
    standalone: true
})
export class RoundedCornersDirective {

    // Parametres //
    @Input() roundAllCorners: boolean = false;
    // @Input() addMargin: boolean = false;

    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
    ) {
        this.observer = new MutationObserver(() => { this.roundCorners(this.element.nativeElement); });
    }

    ngOnInit() {
        this.roundCorners(this.element.nativeElement);
        
        this.observeChanges();
    }

    

    roundCorners(e: HTMLElement, radisPare: Array<number> | null = null, unit: string = "px") {
        
        // let unit; // Suposant que tot estigui en les mateixes unitats //
        let radis: Array<any> = [];
        
        const rectElement = e.getBoundingClientRect();
        const rectPare = e.parentElement!.getBoundingClientRect();

        const estilElement = e.computedStyleMap();
        
        // border-radius que té l'element //
        radis = [
            (<any>estilElement.get("border-top-left-radius")!).value,
            (<any>estilElement.get("border-top-right-radius")!).value,
            (<any>estilElement.get("border-bottom-right-radius")!).value,
            (<any>estilElement.get("border-bottom-left-radius")!).value,
        ];


        if (radisPare === null) {
            
            unit = (<any>estilElement.get("border-top-left-radius")!).unit;

            
        } else {

            // border-radius que tenia l'element abans de roundedCorners //
            let radisOriginals = JSON.parse(e.getAttribute('aria-radius-originals') || '[]');
            if (!radisOriginals.length) {
                e.setAttribute('aria-radius-originals', JSON.stringify(radis));
                radisOriginals = radis;
            }

            // Diferència posició del fill respecte el pare //
            let marges = [
                Math.abs(rectPare.top - rectElement.top),
                Math.abs(rectPare.right - rectElement.right),
                Math.abs(rectPare.bottom - rectElement.bottom),
                Math.abs(rectPare.left - rectElement.left),
            ];
            
            // marges // border-radius //
            //   0    //     0   1     //
            // 3   1  //               //
            //   2    //     3   2     //

            // Si l'espai d'un element a la paret contrària és més gran de 1/3 de la mida de l'element, no s'aplica l'arrodoniment //
            radis[0] = this.mesGran(radisOriginals[0], this.minim0(radisPare[0] - this.mesGran(marges[3], marges[0]))); // top left //
            radis[1] = this.mesGran(radisOriginals[1], this.minim0(radisPare[1] - this.mesGran(marges[0], marges[1]))); // top right //
            radis[2] = this.mesGran(radisOriginals[2], this.minim0(radisPare[2] - this.mesGran(marges[1], marges[2]))); // bottom right //
            radis[3] = this.mesGran(radisOriginals[3], this.minim0(radisPare[3] - this.mesGran(marges[2], marges[3]))); // bottom left //

            if (this.roundAllCorners)
                radis.fill(Math.max(...radis));
            
            
            this.renderer.setStyle(e, "border-top-left-radius", (radis[0] !== undefined ? radis[0] : radisOriginals[0]) + unit);
            this.renderer.setStyle(e, "border-top-right-radius", (radis[1] !== undefined ? radis[1] : radisOriginals[1]) + unit);
            this.renderer.setStyle(e, "border-bottom-right-radius", (radis[2] !== undefined ? radis[2] : radisOriginals[2]) + unit);
            this.renderer.setStyle(e, "border-bottom-left-radius", (radis[3] !== undefined ? radis[3] : radisOriginals[3]) + unit);

            // if (this.addMargin) {

            //     // margins que tenia l'element abans de roundedCorners //
            //     let marginsOriginals = JSON.parse(e.getAttribute('aria-margins-originals') || '[]');
            //     if (!marginsOriginals.length) {
            //         marginsOriginals = [
            //             (<any>estilElement.get("margin-top")!).value,
            //             (<any>estilElement.get("margin-right")!).value,
            //             (<any>estilElement.get("margin-bottom")!).value,
            //             (<any>estilElement.get("margin-left")!).value,
            //         ];
            //         e.setAttribute('aria-margins-originals', JSON.stringify(marginsOriginals));
            //     }
                
                
            //     let margins = [
            //         (this.mesGran(radis[0], radis[1]) - marges[0]) - (rectElement.height / 2),
            //         (this.mesGran(radis[1], radis[2]) - marges[1]) - (rectElement.width / 2),
            //         (this.mesGran(radis[2], radis[3]) - marges[2]) - (rectElement.height / 2),
            //         (this.mesGran(radis[3], radis[0]) - marges[3]) - (rectElement.width / 2),
            //     ];
            //     // console.log(margins);
                
            //     if (margins[0] > 0) this.renderer.setStyle(e, "margin-top", (marginsOriginals[0] + margins[0]) + unit);
            //     if (margins[1] > 0) this.renderer.setStyle(e, "margin-right", (marginsOriginals[1] + margins[1]) + unit);
            //     if (margins[2] > 0) this.renderer.setStyle(e, "margin-bottom", (marginsOriginals[2] + margins[2]) + unit);
            //     if (margins[3] > 0) this.renderer.setStyle(e, "margin-left", (marginsOriginals[3] + margins[3]) + unit);
            // }
        }
            
        

        // Llancem la funcio pels fills //
        e.childNodes.forEach((e: ChildNode) => {
            if (e.nodeType == Node.ELEMENT_NODE)
                this.roundCorners(<HTMLElement>e, radis, unit);
        });
    

    }

    getSumaMarges(estilElement: StylePropertyMapReadOnly, estilPare: StylePropertyMapReadOnly) {
        // Distancies calculades només en marges, no funcionarà si es position absolute, hi ha un transform, etc.
        return [
            (<any>estilPare.get("padding-top")!).value    + (<any>estilPare.get("border-top-width")!).value    + (<any>estilElement.get("margin-top")!).value,
            (<any>estilPare.get("padding-right")!).value  + (<any>estilPare.get("border-right-width")!).value  + (<any>estilElement.get("margin-right")!).value,
            (<any>estilPare.get("padding-bottom")!).value + (<any>estilPare.get("border-bottom-width")!).value + (<any>estilElement.get("margin-bottom")!).value,
            (<any>estilPare.get("padding-left")!).value   + (<any>estilPare.get("border-left-width")!).value   + (<any>estilElement.get("margin-left")!).value,
        ];
    }

    // Utils //
    mesPetit(n1: number, n2: number) { return n1 < n2 ? n1 : n2; }
    mesGran(n1: number, n2: number) { return n1 > n2 ? n1 : n2; }
    minim0(n: number) { return n > 0 ? n : 0; }


    // Observar canvis //
    private readonly observer: MutationObserver;
    private observeChanges() {
        const config = { attributes: true, childList: true, subtree: true };
        this.observer.observe(this.element.nativeElement, config);
    }


}
