import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgHttpLoaderComponent } from "ng-http-loader";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgHttpLoaderComponent, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }