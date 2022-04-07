import { Component, OnInit } from '@angular/core';
import { backgroundLinks } from './backgroundLinks';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit {
  background: string[] = ['Picture', 'Solid color'];
  backgroundFit: string[] = ['Fill', 'Fit', 'Stretch'];
  backgroundLinks: any[] = backgroundLinks;
  selectedBackgroundType: string = 'Picture';

  constructor() {}

  ngOnInit(): void {}

  selectBackgroundType(e: Event) {
    const type = (e.target as HTMLSelectElement).value;
    this.selectedBackgroundType = type;
  }

  setBackground(background: string) {
    document.documentElement.style.setProperty(`--background`, `url(${background})`);
  }
}
