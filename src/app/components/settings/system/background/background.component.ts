import { Component, OnInit } from '@angular/core';
import { BrowserStorageService } from 'src/app/services/storage.service';
import { backgroundLinks } from './backgroundLinks';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit {
  background: string[] = ['Picture', 'Solid color'];
  backgroundFit: string[] = ['Fill', 'Fit'];
  backgroundLinks: any[] = backgroundLinks;
  selectedBackgroundType: string = 'Picture';
  selectedBackground: string = '';
  selectedBackgroundFit: string = 'Fill';

  constructor(private storage: BrowserStorageService) {}

  ngOnInit(): void {
    this.getBackground();
  }

  getBackground() {
    const optionsJson = this.storage.get('options') || '{}';

    const background =
      optionsJson !== null ? JSON.parse(optionsJson)['background'] : '';
    const backgroundFit =
      optionsJson !== null ? JSON.parse(optionsJson)['backgroundFit'] : '';

    if (background) {
      this.selectedBackground = background;
    } else {
      this.selectedBackground = this.backgroundLinks[0].link;
    }

    if (backgroundFit) {
      this.selectedBackgroundFit = backgroundFit;
    } else {
      this.selectedBackgroundFit = 'Fill';
    }
  }

  selectBackgroundType(e: Event) {
    const type = (e.target as HTMLSelectElement).value;
    this.selectedBackgroundType = type;
  }

  setBackground(background: string) {
    if (background.startsWith('http')) {
      this.selectedBackground = `url(${background})`;
    } else {
      this.selectedBackground = background.toLowerCase();
    }
    document.documentElement.style.setProperty(
      `--background`,
      this.selectedBackground
    );
    this.storage.set('options', { background: this.selectedBackground }, true);
  }

  setBackgroundFit(e: Event) {
    const fit = (e.target as HTMLSelectElement).value;
    if (fit === 'Fill') {
      this.selectedBackgroundFit = 'cover';
    } else {
      this.selectedBackgroundFit = 'contain';
    }
    document.documentElement.style.setProperty(
      `--background-fit`,
      this.selectedBackgroundFit
    );
    this.storage.set(
      'options',
      { backgroundFit: this.selectedBackgroundFit },
      true
    );
  }
}
