import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';

describe('HerosComponent', () => {

    let component: HeroesComponent;
    let HEROS;
    let mockHeroService;

    beforeEach(() => {
        HEROS = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 1, name: 'Wonderful Woman', strength: 24 },
            { id: 1, name: 'SuperDude', strength: 55 },
        ];
        mockHeroService = jasmine.createSpyObj(['getHeros', 'addHero', 'deleteHero']);
        component = new HeroesComponent(mockHeroService);
    });

    describe('delete', () => {

        it('should remove the indicated hero from the heros list', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROS;

            component.delete(HEROS[2]);

            expect(component.heroes.length).toBe(2); 
        });

        it('should call deleteHero', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROS;

            component.delete(HEROS[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROS[2]);
        })
    })

})