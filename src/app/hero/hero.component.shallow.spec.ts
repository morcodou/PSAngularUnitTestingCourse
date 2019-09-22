import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";



describe('HeroComponemt (shallow tests)', () => {
    let fixture: ComponentFixture<HeroComponent>;
    let component: HeroComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroComponent);
        component = fixture.componentInstance;
    });

    it('should have the correct hero', () => {
        component.hero = { id: 1, name: 'SuperDude', strength: 3 };

        expect(component.hero.name).toEqual('SuperDude');
    });

    it('should render the hero name in an anchor tag', () => {
        component.hero = { id: 1, name: 'SuperDude', strength: 3 };
        fixture.detectChanges();

        let debugElement = fixture.debugElement.query(By.css('a'));
        expect(debugElement.nativeElement.textContent).toContain('SuperDude');
        // expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    });

})