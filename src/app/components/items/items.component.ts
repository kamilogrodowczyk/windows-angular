import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { faDumpster } from '@fortawesome/free-solid-svg-icons';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { RightClickMenuComponent } from '../right-click-menu/right-click-menu.component';
import { RightClickDirective } from 'src/app/directives/right-click.directive';
import { RightClick } from '../RightClick';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  faDumpster = faDumpster;
  faDesktop = faDesktop;

  @ViewChild(RightClickDirective, { static: true })
  rightClickHost!: RightClickDirective;

  @Input() ads = new RightClickMenuComponent();

  constructor() {}

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent() {
    const adItem = this.ads;
    const viewContainerRef = this.rightClickHost.viewContainerRef;
    viewContainerRef.clear();
    let componentRef;

    // if (adItem.component != undefined) {
    //   componentRef =
    //     viewContainerRef.createComponent<RightClickMenuComponent>(
    //       adItem.component
    //     );
    // }
    console.log(adItem);
    // componentRef.instance.data = adItem.data;
  }
}
