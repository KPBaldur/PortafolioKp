import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectCaseStudyComponent } from './components/project-case-study/project-case-study.component';

const routes: Routes = [
  { path: 'portafolio/:slug', component: ProjectCaseStudyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    anchorScrolling: 'enabled', 
    scrollPositionRestoration: 'enabled' 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
