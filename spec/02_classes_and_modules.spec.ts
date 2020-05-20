import { Employee, Retiree, IProvideInformation } from '../src/hr';

describe('using classes and stuff', () => {

    it('an example', () => {
        const bob = new Employee(1_000_000);
        bob.firstName = 'Robert';
        bob.lastName = 'Smith';
        bob.department = 'DEV';

        expect(bob.firstName).toBe('Robert');
        expect(bob.getInfo()).toBe('Robert Smith is a DEV');
        expect(bob.currentSalary).toBe(1_000_000);
        bob.giveRaise(100);
        expect(bob.currentSalary).toBe(1_000_100);
    });

    it('a retiree', () => {
        const sue = new Retiree(50_000);
        sue.firstName = 'Susan';
        sue.lastName = 'Homer';
        expect(sue.currentPension).toBe(50_000);

        showInformation(sue);
        function showInformation(thing: IProvideInformation) {
            console.log(thing.getInfo());
        }
    });
});