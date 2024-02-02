import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RoundedCornersDirective } from './directives/rounded-corners.directive';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RoundedCornersDirective],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'rounded-corners-test';


    ngOnInit() {
        // document.querySelectorAll("*").forEach((e: any) => {
        //     let h = Math.random() * 360;
        //     let s = Math.random() * 100;
        //     let l = Math.random() * 50;

        //     e.style.background = `hsl(${h}, 20%, ${l}%)`
            
        //     e.style.padding=`${Math.random()*10}px ${Math.random()*10}px ${Math.random()*10}px ${Math.random()*10}px`
        //     e.style.margin=`${Math.random()*10}px ${Math.random()*10}px ${Math.random()*10}px ${Math.random()*10}px`
            
        // })
    }
}
