import { Component, OnInit } from '@angular/core';
import { BrowserStorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-display-settings',
  templateUrl: './display-settings.component.html',
  styleUrls: ['./display-settings.component.scss'],
})
export class DisplaySettingsComponent implements OnInit {
  isDisabled: boolean = false;
  range!: number;
  isMouseEnter: boolean = false;

  constructor(private storage: BrowserStorageService) {}

  ngOnInit(): void {
    this.getDisplay();
  }

  setDisplay() {
    this.storage.set('options', { nightDisplay: this.isDisabled }, true);
    this.isDisabled = !this.isDisabled;
  }

  getDisplay() {
    const optionsJson = this.storage.get('options') || '{}';
    const isNightDisplay = JSON.parse(optionsJson)['nightDisplay'] as boolean;
    this.isDisabled = optionsJson !== null ? !isNightDisplay : false;
    this.range =
      optionsJson !== null ? JSON.parse(optionsJson)['nightDisplayValue'] : '';
  }

  setNightDisplayRange(e: Event): number {
    const rangeValue = parseInt((e.target as HTMLInputElement).value);
    this.storage.set('options', { nightDisplayValue: rangeValue }, true);
    return rangeValue;
  }

  onMouseDown() {
    if(!this.isDisabled) return;
    this.storage.set('options', { nightDisplay: true }, true);
  }

  onMouseUp() {
    if(!this.isDisabled) return;
    const test = this.isDisabled === true ? !this.isDisabled : true;
    this.storage.set('options', { nightDisplay: test }, true);
  }
}
