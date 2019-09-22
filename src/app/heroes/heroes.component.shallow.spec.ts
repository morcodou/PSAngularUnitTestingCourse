import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { NO_ERRORS_SCHEMA, Input, Component } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

@Component({
    selector: 'app-hero',
    template: '<div></div>',
})
class FakeHeroComponent {
    @Input() hero: Hero;
}

describe('HeroesComponent', () => {

    let fixture: ComponentFixture<HeroesComponent>;
    let component: HeroesComponent;
    let mockHeroService;
    let HEROS;

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['addHero', 'deleteHero', 'getHeroes']);
        HEROS = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 1, name: 'Wonderful Woman', strength: 24 },
            { id: 1, name: 'SuperDude', strength: 55 },
        ];

        TestBed.configureTestingModule({
            declarations: [HeroesComponent , FakeHeroComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
        //component = fixture.componentInstance;

    });

    it('should set heroes correctely from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROS));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

    it('should create on li for each hero', () =>{
        mockHeroService.getHeroes.and.returnValue(of(HEROS));
        fixture.detectChanges();

        let de = fixture.debugElement.queryAll(By.css('li'));
        expect(de.length).toBe(3);
    });



})