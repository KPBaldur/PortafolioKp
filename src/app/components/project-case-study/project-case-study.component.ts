import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-project-case-study',
  templateUrl: './project-case-study.component.html',
  styleUrls: ['./project-case-study.component.css'],
  standalone: false
})
export class ProjectCaseStudyComponent implements OnInit, OnDestroy {
  project: Project | null = null;
  nextProject: Project | null = null;
  isLightboxOpen = false;
  activeImageIndex = 0;

  get challengeParagraphs(): string[] {
    if (!this.project?.challenge) return [];
    return this.project.challenge
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(p => p.length > 0);
  }

  get architectureNoteParagraphs(): string[] {
    if (!this.project?.architectureNote) return [];
    return this.project.architectureNote
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(p => p.length > 0);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadProject(slug);
      }
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('modal-open');
  }

  loadProject(slug: string): void {
    this.project = this.projectsService.getProjectBySlug(slug);
    if (!this.project) {
      this.router.navigate(['/']);
      return;
    }
    this.nextProject = this.projectsService.getNextProjectWithSlug(slug);
    this.isLightboxOpen = false; // Reset lightbox on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openLightbox(index: number): void {
    this.activeImageIndex = index;
    this.isLightboxOpen = true;
    document.body.classList.add('modal-open');
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
    document.body.classList.remove('modal-open');
  }

  prevImage(): void {
    if (this.project && this.project.images.length > 0) {
      this.activeImageIndex = (this.activeImageIndex - 1 + this.project.images.length) % this.project.images.length;
    }
  }

  nextImage(): void {
    if (this.project && this.project.images.length > 0) {
      this.activeImageIndex = (this.activeImageIndex + 1) % this.project.images.length;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.isLightboxOpen) return;
    if (event.key === 'Escape') {
      this.closeLightbox();
    } else if (event.key === 'ArrowLeft') {
      this.prevImage();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
    }
  }
}
