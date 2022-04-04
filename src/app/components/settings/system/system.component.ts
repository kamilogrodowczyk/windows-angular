import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { windowsSettings } from 'src/app/mocks/windowsSettings';
import { SettingOptions, WindowsSettings } from 'src/app/types/windowsSettings';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnInit {
  faHome = faHome;
  selectedSetting!: WindowsSettings;
  settingOptions?: SettingOptions[] = [];
  selectedOption?: string = '';

  constructor(private location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((p) =>
      this.getSelectedItem(p.get('setting'))
    );
  }

  getSelectedItem(linkName: string | null): void {
    if (!linkName) {
      return;
    }
    this.selectedSetting = windowsSettings.filter(
      (s) => s.name.toLowerCase() === linkName
    )[0];

    this.settingOptions = this.selectedSetting.elements;
    this.selectedOption = this.settingOptions?.length
      ? this.settingOptions[0].name
      : '';
  }

  selectSetting(setting: string) {
    this.selectedOption = setting;
  }

  goBack() {
    this.location.back();
  }
}
