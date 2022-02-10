import {
  BaseHarnessFilters,
  ComponentHarness,
  HarnessPredicate,
} from '@angular/cdk/testing';

export class AppHarness extends ComponentHarness {
  static hostSelector = 'app-root';

  static with(options: BaseHarnessFilters): HarnessPredicate<AppHarness> {
    return new HarnessPredicate(AppHarness, options);
  }

  private div = this.locatorFor('div');

  async getDiv() {
    return await this.div()
  }
  //   async getDiv() {
  //     return await this.div();
  //   }
}
