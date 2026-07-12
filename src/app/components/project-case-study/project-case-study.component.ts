import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-project-case-study',
  templateUrl: './project-case-study.component.html',
  styleUrls: ['./project-case-study.component.css'],
  standalone: false
})
export class ProjectCaseStudyComponent implements OnInit {
  project: Project | null = null;
  nextProject: Project | null = null;

  get challengeParagraphs(): string[] {
    if (!this.project?.challenge) return [];
    return this.project.challenge
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

  loadProject(slug: string): void {
    this.project = this.projectsService.getProjectBySlug(slug);
    if (!this.project) {
      this.router.navigate(['/']);
      return;
    }
    this.nextProject = this.projectsService.getNextProjectWithSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
