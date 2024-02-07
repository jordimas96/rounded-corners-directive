import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RoundedCornersDirective } from './directives/rounded-corners.directive';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';


declare var $: any;


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RoundedCornersDirective, FormsModule, DragDropModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'rounded-corners-test';

    public freeTest_roundness = 60;



    public eachRoundness = [60, 60, 60, 60];
    
    public divRoundness = 30;
    

    ngOnInit() { }

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
