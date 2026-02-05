import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

// Project interface matching the one in PortfolioComponent
interface Project {
  title: string;
  tech: string;
  description: string;
  images: string[];
  repo?: string;
  demo?: string;
}

@Component({
    selector: 'app-project-detail-modal',
    templateUrl: './project-detail-modal.component.html',
    styleUrls: ['./project-detail-modal.component.css'],
    standalone: false
})
export class ProjectDetailModalComponent implements OnInit, OnDestroy {
  @Input() isOpen: boolean = false;
  @Input() project: Project | null = null;
  @Output() close = new EventEmitter<void>();

  currentImageIndex: number = 0;
  currentImage: string = '';

  ngOnInit(): void {
    if (this.project && this.project.images.length > 0) {
      this.currentImage = this.project.images[0];
    }
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  ngOnChanges(): void {
    if (this.isOpen && this.project && this.project.images.length > 0) {
      this.currentImageIndex = 0;
      this.currentImage = this.project.images[0];
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen) {
      this.closeModal();
    }
  }

  previousImage(): void {
    if (this.project && this.project.images.length > 0) {
      this.currentImageIndex = this.currentImageIndex > 0 
        ? this.currentImageIndex - 1 
        : this.project.images.length - 1;
      this.currentImage = this.project.images[this.currentImageIndex];
    }
  }

  nextImage(): void {
    if (this.project && this.project.images.length > 0) {
      this.currentImageIndex = this.currentImageIndex < this.project.images.length - 1 
        ? this.currentImageIndex + 1 
        : 0;
      this.currentImage = this.project.images[this.currentImageIndex];
    }
  }

  goToImage(index: number): void {
    if (this.project && this.project.images.length > 0) {
      this.currentImageIndex = index;
      this.currentImage = this.project.images[this.currentImageIndex];
    }
  }

  openLink(event: Event, url?: string): void {
    if (url) {
      event.preventDefault();
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
}