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
        this.observer = new MutationObserver(() => { this.roundCorners(this.element.nativeElement, null); });
    }

    ngOnInit() {
        this.roundCorners(this.element.nativeElement, null);
        
        this.observeChanges();
    }

    

    roundCorners(e: HTMLElement, radisPare: Array<number> | null) {
        
        let unit; // Suposant que tot estigui en les mateixes unitats //
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

            unit = (<any>estilPare.get("padding-top")!).unit;
            
            let sumesMarges = [
                (<any>estilPare.get("padding-top")!).value    + (<any>estilPare.get("border-top-width")!).value    + (<any>estilElement.get("margin-top")!).value,
                (<any>estilPare.get("padding-left")!).value   + (<any>estilPare.get("border-left-width")!).value   + (<any>estilElement.get("margin-left")!).value,
                (<any>estilPare.get("padding-bottom")!).value + (<any>estilPare.get("border-bottom-width")!).value + (<any>estilElement.get("margin-bottom")!).value,
                (<any>estilPare.get("padding-right")!).value  + (<any>estilPare.get("border-right-width")!).value  + (<any>estilElement.get("margin-right")!).value,
            ];

            // espais // border-radius //
            //   0    //     0   1     //
            // 3   1  //               //
            //   2    //     3   2     //
            
            // top left //
            radis[0] = this.minim0(radisPare[0] - this.mesGran(sumesMarges[3], sumesMarges[0]));

            // top right //
            radis[1] = this.minim0(radisPare[1] - this.mesGran(sumesMarges[0], sumesMarges[1]));

            // bottom right //
            radis[2] = this.minim0(radisPare[2] - this.mesGran(sumesMarges[1], sumesMarges[2]));

            // bottom left //
            radis[3] = this.minim0(radisPare[3] - this.mesGran(sumesMarges[2], sumesMarges[3]));


            
            this.renderer.setStyle(e, "border-top-left-radius", radis[0] + unit);
            this.renderer.setStyle(e, "border-top-right-radius", radis[1] + unit);
            this.renderer.setStyle(e, "border-bottom-right-radius", radis[2] + unit);
            this.renderer.setStyle(e, "border-bottom-left-radius", radis[3] + unit);
        }
            
        

        // Llancem la funcio pels fills //
        e.childNodes.forEach((e: ChildNode) => {
            if (!e.nodeValue)
                this.roundCorners(<HTMLElement>e, radis);
        });
    

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
