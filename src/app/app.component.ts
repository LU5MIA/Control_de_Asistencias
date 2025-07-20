import { Component } from '@angular/core';

interface SideNavToggle {
  screenWidth: number
  collapse: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Proyecto';

  isSidenavCollapse = false;
  screenWidth = 0;


  onTogleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSidenavCollapse = data.collapse
  }
}
