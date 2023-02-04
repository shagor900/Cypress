/// <reference types="cypress-xpath" />
/// <reference types="cypress" />


describe('Assignment task', ()=>{

    let flag = true;

    beforeEach(function(){
        cy.visit("https://computer-database.gatling.io/computers ")
    })

    it('Locate Commodore 64 computer and update some of the fields and verify updation', ()=>{
        Cypress._.times(11, ()=>{
            
            cy.get("[class='next']>a").click();
            cy.get('body').find('a[href]').each(($el, index, $list)=>{
                debugger
                if($el.text().includes("Commodore 64")){
                    cy.log("Commodore 64 computer was found on page");
                }  
            })
        })
        
    })

    it('Locate Commodore 64 computer and update some of the fields and verify error message', ()=>{
        cy.get('[id="searchbox"]').type("Commodore 64")
        cy.get('[value="Filter by name"]').click()
        cy.get('td>a').contains("Commodore 64").eq(0).click()
        cy.get('[id="name"]').click().clear();
        cy.get('[value="Save this computer"]').click()
        cy.contains("Failed to refine type : Predicate isEmpty() did not fail.").should('be.visible');

        cy.get('[id="name"]').click().clear().type("Commodore 64 Name");
        cy.get('[value="Save this computer"]').click()
        cy.contains("Name has been updated").should('be.visible');

    })

    it('Filter computer list by HP and print the map of all results', ()=>{
        let map = new Array();;
        cy.get('[id="searchbox"]').type("HP")
        cy.get('[value="Filter by name"]').click()

        cy.get('td>a').each(($el, index, $list)=>{
            cy.log($el.text())
        })
    })

    it('Filter computer list by IBM and print the map of all results which displays on last page', ()=>{
        cy.get('[id="searchbox"]').type("IBM")
        cy.get('[value="Filter by name"]').click()

        Cypress._.times(4, ()=>{
            cy.get('[id="pagination"]>ul>li').eq(2).invoke('attr', 'class').then(e=>{
                debugger
                if(!e.includes("disabled")){
                    cy.get('[id="pagination"]>ul>li>a').eq(2).click();
                    cy.wait(2000)
                }
                else{
                    cy.get('td>a').each(($el, index, $list)=>{
                        cy.log($el.text())
                    })
                }
                    
            })
        })
    })

    it('Add a new computer and verify the addition', ()=>{
        cy.get('[id="add"]').click()
        cy.get('[id="name"]').click().clear().type("Testing name");
        cy.get('[id="introduced"]').click().clear().type("2023-02-05")
        cy.get('[id="discontinued"]').click().clear().type("2023-02-28")
        cy.get('[id="company"]').select(1);
        cy.get('[value="Create this computer"]').click()

        cy.contains("Computer Testing name has been created").should('be.visible');
    })
})