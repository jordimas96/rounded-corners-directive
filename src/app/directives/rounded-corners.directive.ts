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
        
        const estilElement = e.computedStyleMap();
        let radis: Array<any> = [];

        if (radisPare === null) {
            
            unit = (<any>estilElement.get("border-top-left-radius")!).unit;

            radis = [
                (<any>estilElement.get("border-top-left-radius")!).value,
                (<any>estilElement.get("border-top-right-radius")!).value,
                (<any>estilElement.get("border-bottom-left-radius")!).value,
                (<any>estilElement.get("border-bottom-right-radius")!).value,
            ];
        } else {

            const estilPare = e.parentElement!.computedStyleMap();

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
            radis[0] = radisPare[0] - this.mesGran(sumesMarges[3], sumesMarges[0]);

            // top right //
            radis[1] = radisPare[0] - this.mesGran(sumesMarges[0], sumesMarges[1]);

            // bottom right //
            radis[2] = radisPare[0] - this.mesGran(sumesMarges[1], sumesMarges[2]);

            // bottom left //
            radis[3] = radisPare[0] - this.mesGran(sumesMarges[2], sumesMarges[3]);

            this.renderer.setStyle(e, "border-radius",
                radis[0] + unit + " " +
                radis[1] + unit + " " +
                radis[2] + unit + " " +
                radis[3] + unit + " "
            );
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



    // Observar canvis //
    private readonly observer: MutationObserver;
    private observeChanges() {
        const config = { attributes: true, childList: true, subtree: true };
        this.observer.observe(this.element.nativeElement, config);
    }


}
