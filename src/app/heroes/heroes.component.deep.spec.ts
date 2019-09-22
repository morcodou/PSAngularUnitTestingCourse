import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { NO_ERRORS_SCHEMA, Input, Component } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";


describe('HeroesComponent (deep test)', () => {

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
            declarations: [HeroesComponent, HeroComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);

        //component = fixture.componentInstance;

    });

    it('it should render each hero as HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROS));
        fixture.detectChanges();

        let heroComponentdebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentdebugElements.length).toBe(3);
       
        for (let index = 0; index < HEROS.length; index++) {
            expect(heroComponentdebugElements[index].componentInstance.hero).toBe(HEROS[index]);
        }

        // expect(heroComponentdebugElements[0].componentInstance.hero.name).toBe(HEROS[0].name);
        // expect(heroComponentdebugElements[1].componentInstance.hero.name).toBe(HEROS[1].name);
        // expect(heroComponentdebugElements[2].componentInstance.hero.name).toBe(HEROS[2].name);
    });






})