import { FormsModule } from "@angular/forms";
import { SapphireSearchFieldModule } from "./search-field.module";

const example = /* HTML */ `<sp-search-field>
  <input spSearchFieldInput aria-label="Search" placeholder="Search" />
</sp-search-field>`;

describe("SearchField", () => {
  it("clears the input when Escape is pressed", () => {
    cy.mount(example);
    cy.get("input").type("search query");
    cy.realPress("Escape");
    cy.get("input").should("have.value", "");
  });

  it("submits the search when Enter is pressed", () => {
    const onSubmit = cy.stub();
    cy.mount(
      `<sp-search-field>
          <input
            spSearchFieldInput
            (spSearchFieldSubmitted)="onSubmit($event)"
            aria-label="Search"
            placeholder="Search"
          />
        </sp-search-field>`,
      { componentProperties: { onSubmit } }
    );
    cy.get("input").type("s");
    cy.realPress("Enter");
    cy.wrap(onSubmit).should("be.calledOnceWith", "s");
  });

  it("clears the input when clear button is pressed", () => {
    cy.mount(example);
    cy.get("input").type("search query");
    cy.findByRole("button").click();
    cy.get("input").should("have.value", "");
  });


  it("clears the model value when the clear button is pressed (ngModelChange)", () => {
    const onSubmit = cy.stub();
    const onModelChanged = cy.stub();
    cy.mount(
      `<sp-search-field>
          <input
            spSearchFieldInput
            (spSearchFieldSubmitted)="onSubmit($event)"
            (ngModelChange)="onModelChanged($event)"
            aria-label="Search"
            placeholder="Search"          
          />
        </sp-search-field> 
       `,
      { 
        componentProperties: { onModelChanged, onSubmit  }
      },
      
    );  
    cy.get("input").type("123");
    cy.realPress("Enter")
    cy.findByRole("button").click();
    cy.wrap(onModelChanged).should("be.calledWith", "");
    cy.get("input").realPress("Enter")
    cy.wrap(onSubmit).should("be.calledWith", "");
  })

  /**
   * 
   */
  it("clears the model value when the clear button is pressed [(ngModel)]", () => {
    const onSubmit = cy.stub();

    let value: string = ""
    cy.mount(
      `<sp-search-field>
          <input
            spSearchFieldInput
            (spSearchFieldSubmitted)="onSubmit($event)"
            [(ngModel)]="value"
            aria-label="Search"
            placeholder="Search"          
          />
       </sp-search-field>`,
      { 
        componentProperties: { value, onSubmit  }
      },
      
    );  
    cy.get("input").type("123");
    cy.realPress("Enter")
    cy.wrap(onSubmit).should("be.calledWith", "123");
    onSubmit.resetHistory()  
    cy.findByRole("button").click();
    cy.realPress("Enter")
    cy.wrap(onSubmit).should("be.calledWith", "");

  })




  it("keeps the focus after the clear button is pressed", () => {
    cy.mount(example);
    cy.get("input").type("search query");
    cy.findByRole("button").click();
    cy.get("input").should("be.focused");
  });

  it("sets the expected aria-label on the clear button", () => {
    cy.mount(example);
    cy.get("input").type("search query");
    cy.findByRole("button", { name: "Clear search" });
  });

  it("focuses the input when the box (including the search icon) is clicked", () => {
    cy.mount(example);
    cy.root().realClick({ x: 8, y: 15 });
    cy.get("input").should("be.focused").blur();
    cy.root().realClick({ x: 18, y: 15 });
    cy.get("input").should("be.focused").blur();
    cy.root().realClick({ x: 290, y: 15 });
    cy.get("input").should("be.focused");
  });
});
