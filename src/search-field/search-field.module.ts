import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchFieldComponent } from './search-field.component';
import { SearchFieldInputDirective } from './search-field-input.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchFieldComponent, SearchFieldInputDirective],
  imports: [CommonModule, FormsModule],
  exports: [SearchFieldComponent, SearchFieldInputDirective],
})
export class SapphireSearchFieldModule {}
