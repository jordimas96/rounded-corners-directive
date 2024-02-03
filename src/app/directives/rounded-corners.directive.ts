import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[roundedCorners]',
    standalone: true
})
export class RoundedCornersDirective {


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
        
        const estilElement = e.computedStyleMap();
        const estilPare = e.parentElement!.computedStyleMap();


        if (radisPare === null) {
            
            unit = (<any>estilElement.get("border-top-left-radius")!).unit;

            radis = [
                (<any>estilElement.get("border-top-left-radius")!).value,
                (<any>estilElement.get("border-top-right-radius")!).value,
                (<any>estilElement.get("border-bottom-right-radius")!).value,
                (<any>estilElement.get("border-bottom-left-radius")!).value,
            ];
        } else {
            
            let marges = this.getSumaMarges(estilElement, estilPare);            
            // espais // border-radius //
            //   0    //     0   1     //
            // 3   1  //               //
            //   2    //     3   2     //
            radis[0] = this.minim0(radisPare[0] - this.mesGran(marges[3], marges[0])); // top left //
            radis[1] = this.minim0(radisPare[1] - this.mesGran(marges[0], marges[1])); // top right //
            radis[2] = this.minim0(radisPare[2] - this.mesGran(marges[1], marges[2])); // bottom right //
            radis[3] = this.minim0(radisPare[3] - this.mesGran(marges[2], marges[3])); // bottom left //
            
            
            this.renderer.setStyle(e, "border-top-left-radius", radis[0] + unit);
            this.renderer.setStyle(e, "border-top-right-radius", radis[1] + unit);
            this.renderer.setStyle(e, "border-bottom-right-radius", radis[2] + unit);
            this.renderer.setStyle(e, "border-bottom-left-radius", radis[3] + unit);
        }
            
        

        // Llancem la funcio pels fills //
        e.childNodes.forEach((e: ChildNode) => {
            if (e.nodeValue) return;

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
