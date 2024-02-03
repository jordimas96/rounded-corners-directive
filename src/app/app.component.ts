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

    public roundness:any;

    ngOnInit() {
        // $(".grup1 *").each((i:any, e:any) => {
        //     let h = Math.random() * 360;
        //     let s = Math.random() * 100;
        //     let l = Math.random() * 50;

        //     $(e).css("background", `hsl(${h}, 20%, ${l}%)`);
        // });
    }

    sliderInput() {
        $(".div2").css("border-radius", this.roundness + "px");
    }
}
