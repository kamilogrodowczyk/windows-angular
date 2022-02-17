import { IconProp } from '@fortawesome/fontawesome-svg-core';

export class newItem {
  constructor(
    public icon: IconProp,
    public name: string,
    public linkName: string,
    public elements: []
  ) {}
}
