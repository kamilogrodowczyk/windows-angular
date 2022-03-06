import { Component, OnInit } from '@angular/core';
import { BrowserStorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-display-settings',
  templateUrl: './display-settings.component.html',
  styleUrls: ['./display-settings.component.scss'],
})
export class DisplaySettingsComponent implements OnInit {
  isDisabled!: boolean;
  range: string = '';

  constructor(private storage: BrowserStorageService) {}

  ngOnInit(): void {
    this.getDisplay();
  }

  setDisplay() {
    this.storage.set('options', { nightDisplay: this.isDisabled });
    this.isDisabled = !this.isDisabled;
  }

  getDisplay() {
    const optionsJson = this.storage.get('options') || '{}';
    const isNightDisplay = JSON.parse(optionsJson)['nightDisplay'] as boolean;
    this.isDisabled = optionsJson !== null ? !isNightDisplay : false;
    this.range =
      optionsJson !== null ? JSON.parse(optionsJson)['nightDisplayValue'] : '';
  }

  setNightDisplayRange(e: Event): string {
    this.storage.set('options', { nightDisplayValue: this.range });
    return (e.target as HTMLInputElement).value;
  }
}
