import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsComponent } from './skills.component';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have skills data', () => {
    expect(component.skills).toBeDefined();
    expect(component.skills.frontend).toBeDefined();
    expect(component.skills.backend).toBeDefined();
    expect(component.skills.database).toBeDefined();
    expect(component.skills.gameDev).toBeDefined();
    expect(component.skills.tools).toBeDefined();
  });

  it('should return correct level class', () => {
    expect(component.getLevelClass('Avanzado')).toBe('level-advanced');
    expect(component.getLevelClass('Intermedio')).toBe('level-intermediate');
    expect(component.getLevelClass('Básico')).toBe('level-basic');
  });
});