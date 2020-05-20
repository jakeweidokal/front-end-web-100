import { Person } from './person';
import { IProvideInformation } from './interfaces';

export class Retiree extends Person implements IProvideInformation {
    constructor(private pension: number) {
        super();
    }
    get currentPension() {
        return this.pension;
    }
    getInfo() {
        return `${this.firstName} ${this.lastName} is a retiree.`;
    }
}