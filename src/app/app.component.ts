import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RoundedCornersDirective } from './directives/rounded-corners.directive';
import { FormsModule } from '@angular/forms';

declare var $: any;


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RoundedCornersDirective, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'rounded-corners-test';

    public eachRoundness = [60, 60, 60, 60];
    
    public divRoundness = 30;
    

    ngOnInit() {
        // $(".grup1 *").each((i:any, e:any) => {
        //     let h = Math.random() * 360;
        //     let s = Math.random() * 100;
        //     let l = Math.random() * 50;

        //     $(e).css("background", `hsl(${h}, 20%, ${l}%)`);
        // });
    }

    sliderInput() {
        // $(".div2").css("border-radius", this.roundness + "px");
        $(".div2").css("border-radius",
            this.eachRoundness[0] + "px " +
            this.eachRoundness[1] + "px " +
            this.eachRoundness[2] + "px " +
            this.eachRoundness[3] + "px "
        );
    }
}
