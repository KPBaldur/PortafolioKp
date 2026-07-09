import { Component } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: false
})
export class AboutComponent {
  isExpanded = false;
  availabilityStatus = 'Disponible para proyectos';

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
}
