import { Component, OnInit } from '@angular/core';
import { faDumpster } from '@fortawesome/free-solid-svg-icons';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  faDumpster = faDumpster;
  faDesktop = faDesktop;

  constructor() { }

  ngOnInit(): void {
  }

}
