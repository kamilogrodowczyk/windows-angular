import { Component, OnInit } from '@angular/core';
import { BrowserStorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.scss'],
})
export class PersonalizeComponent implements OnInit {
  isTransparent: boolean = true;
  colorAccent: string = '';
  theme: string = 'Dark';
  themeOptions: string[] = ['Dark', 'Light'];

  constructor(private storage: BrowserStorageService) {}

  ngOnInit(): void {
    this.setColorAccent();
  }

  setTransparency() {
    this.isTransparent = !this.isTransparent;
    if (this.isTransparent) {
      document.body.classList.remove('isNotTransparent');
    } else {
      document.body.classList.add('isNotTransparent');
    }
    this.storage.set('options', { isTransparent: this.isTransparent }, true);
  }

  setColorAccent() {
    const optionsJson = this.storage.get('options') || '{}';

    const accent =
      optionsJson !== null ? JSON.parse(optionsJson)['colorAccent'] : '';
    const transparency =
      optionsJson !== null ? JSON.parse(optionsJson)['isTransparent'] : '';
    const theme = optionsJson !== null ? JSON.parse(optionsJson)['theme'] : '';

    this.colorAccent = accent ? `${accent}` : '';
    if (typeof transparency !== 'undefined') {
      this.isTransparent = transparency;
    }
    this.theme = theme ? `${theme}` : 'Dark';
  }

  color(color: string) {
    if (this.colorAccent) {
      document.body.classList.remove(this.colorAccent);
    }
    this.colorAccent = `${color.toLowerCase()}-accent`;
    document.body.classList.add(this.colorAccent);
    this.storage.set('options', { colorAccent: this.colorAccent }, true);
  }

  setTheme(e: Event) {
    const theme = (e.target as HTMLInputElement).value;
    this.theme = theme;
    if (theme === 'Light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    this.storage.set('options', { theme: this.theme }, true);
  }
}
