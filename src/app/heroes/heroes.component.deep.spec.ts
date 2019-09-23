import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { NO_ERRORS_SCHEMA, Input, Component, Directive } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";


@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()' }
})

export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

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
            declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            //    schemas: [NO_ERRORS_SCHEMA]
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

    it(`should call heroService.deleteHero when the Hero Component's
            delte button is clicked`, () => {
        const index = 1;
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROS));
        fixture.detectChanges();

        let heroComponentdebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponentdebugElements[index].query(By.css('button')).triggerEventHandler('click', { stopPropagation: () => { } });

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROS[index]);
    });

    it(`should call heroService.deleteHero when the Hero Component's
    delte button is clicked V(2)`, () => {
        const index = 1;
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROS));
        fixture.detectChanges();

        let heroComponentdebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
        (<HeroComponent>heroComponentdebugElements[index].componentInstance).delete.emit(undefined);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROS[index]);
    });

    it(`should call heroService.deleteHero when the Hero Component's
    delte button is clicked V(3)`, () => {
        const index = 1;
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROS));
        fixture.detectChanges();

        let heroComponentdebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponentdebugElements[index].triggerEventHandler('delete', null);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROS[index]);
    });

    it(`should add new hero in the hero list when add button clicked`, () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROS));
        fixture.detectChanges();
        const name = "Mr. Ice";
        mockHeroService.addHero.and.returnValue(of({ id: 5, name: name, strength: 4 }));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value = name;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        const heroesText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

        expect(heroesText).toContain(name);
    });

    it(`should have the correct route for the first hero`, () => {

        mockHeroService.getHeroes.and.returnValue(of(HEROS));
        fixture.detectChanges(); 
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        const routerLink = heroComponents[0]
            .query(By.directive(RouterLinkDirectiveStub))
            .injector.get(RouterLinkDirectiveStub);

        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);
        expect(routerLink.navigatedTo).toBe('/detail/1');
    });


})