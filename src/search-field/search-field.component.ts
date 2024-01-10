import { Component, ContentChild, ViewEncapsulation } from "@angular/core";
import { SearchFieldInputDirective } from "./search-field-input.directive";

/**
 * Sapphire search input field.
 */
@Component({
  selector: "sp-search-field",
  templateUrl: "./search-field.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./search-field.component.css"],
  host: {
    class: "sapphire-search-field",
    "[class.is-disabled]": "searchInput?.disabled",
  },
})
export class SearchFieldComponent {
  @ContentChild(SearchFieldInputDirective)
  searchInput?: SearchFieldInputDirective;
}
