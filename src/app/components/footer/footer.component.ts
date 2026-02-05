import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: false
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  showAcknowledgments: boolean = false;

  openAcknowledgments(): void {
    this.showAcknowledgments = true;
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
  }

  closeAcknowledgments(): void {
    this.showAcknowledgments = false;
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
  }
}
