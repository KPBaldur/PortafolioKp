import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PortfolioComponent } from './portfolio.component';

// Mock component for ProjectDetailModalComponent
@Component({
    selector: 'app-project-detail-modal',
    template: '',
    standalone: false
})
class MockProjectDetailModalComponent {}

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PortfolioComponent,
        MockProjectDetailModalComponent
      ]
    });
    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.isModalOpen).toBe(false);
    expect(component.selectedProjectForModal).toBe(null);
    expect(component.selectedCategory).toBe('web');
  });

  it('should open modal with selected project', () => {
    const mockProject = {
      title: 'Test Project',
      tech: 'Angular - TypeScript',
      description: 'Test description',
      images: ['test.jpg']
    };
    
    component.openModal(mockProject);
    expect(component.isModalOpen).toBe(true);
    expect(component.selectedProjectForModal).toBe(mockProject);
  });

  it('should close modal', () => {
    component.isModalOpen = true;
    component.selectedProjectForModal = {
      title: 'Test Project',
      tech: 'Angular - TypeScript',
      description: 'Test description',
      images: ['test.jpg']
    };
    
    component.closeModal();
    expect(component.isModalOpen).toBe(false);
    expect(component.selectedProjectForModal).toBe(null);
  });
});
