describe('functions', () => {

    describe('how to declare them', () => {

        it('type types', () => {
            // Anonymous Functions
            const add = (a: number, b: number) => a + b; // arrow function
            // tslint:disable-next-line: only-arrow-functions
            const multiply = function (a: number, b: number) { // old skool anonymous function
                return a * b;
            }

            // Named Functions
            function subtract(a: number, b: number): number {
                return a - b;
            }
        });

        it('a bit more about arrow functions', () => {
            // an arrow function that takes no arguments
            const doIt = () => console.log('Doing it.');
            doIt();

            // an arrow function that has to do more than one thing
            const logIt = (thing: { message: string }) => {
                console.log('getting ready to run your function');
                console.log(`Here's the message: ${thing.message}`);
                return true; // When you have a block, you have to use the "return" keyword
            }

            // an arrow function that jsut returns the result of an expression
            const changeIt = (what: string) => what.toUpperCase().trim();
            expect(changeIt('      hello   ')).toBe('HELLO');

        });

        it('a function that takes a function', () => {
            type MathOp = (a: number, b: number) => number;
            const addition: MathOp = (a, b) => a + b;
            const subtraction: MathOp = (a, b) => a - b;
            const multiplication: MathOp = (a, b) => a * b;
            function doubleAndApply(n1: number, n2: number, op: MathOp) {
                n1 *= 2;
                n2 *= 2;
                return op(n1, n2);
            }
            expect(doubleAndApply(2, 2, addition)).toBe(8);
            expect(doubleAndApply(3, 3, multiplication)).toBe(36);
            expect(doubleAndApply(2, 2, (a, b) => a / b)).toBe(1);
            const logIt = (message: string, decorator: (x: string) => string): void => {
                console.log(decorator(message));
            }
            logIt('hello', (y) => `***${y}***`);
            logIt('boring', y => y); // identity
        });

        it('just using an old skool function like a non-crazy person', () => {
            function makeElement(tag: string, content: string): string {
                return `<${tag}>${content}</${tag}>`;
            }
            expect(makeElement('h1', 'Tacos')).toBe('<h1>Tacos</h1>');
            expect(makeElement('h1', 'Beer')).toBe('<h1>Beer</h1>');
            expect(makeElement('p', 'body')).toBe('<p>body</p>');
        });
        it('an oop person would make a class!', () => {
            class TagMaker {
                constructor(private tag: string) { }
                make(content: string) {
                    return `<${this.tag}>${content}</${this.tag}>`
                }
            }
            const h1Maker = new TagMaker('h1');
            const pMaker = new TagMaker('p');
            expect(h1Maker.make('Tacos')).toBe('<h1>Tacos</h1>');
            expect(h1Maker.make('Beer')).toBe('<h1>Beer</h1>');
            expect(pMaker.make('body')).toBe('<p>body</p>');
        });
        it('how a functional programmer would do it.', () => {
            function tagMaker(tag: string): (content: string) => string {
                return (content) => `<${tag}>${content}</${tag}>`
            }
            const h1Maker = tagMaker('h1');
            const pMaker = tagMaker('p');
            expect(h1Maker('Tacos')).toBe('<h1>Tacos</h1>');
            expect(h1Maker('Beer')).toBe('<h1>Beer</h1>');
            expect(pMaker('body')).toBe('<p>body</p>');
        });
    });

    describe('array methods', () => {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        it('to visit each element of an array', () => {
            numbers.forEach((val, indx, coll) => console.log(val, indx, coll));
        });

        describe('array methods that return a new array', () => {

            it('can return elements that only pass a predicate', () => {
                const isEven = (n: number): boolean => n % 2 === 0;
                const evens = numbers.filter(isEven);

                expect(evens).toEqual([2, 4, 6, 8]);
            });

            it('convert each item in the array into something new', () => {
                const doubled = numbers.map(n => n * 2); // LINQ .Select

                expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
                expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });
        });

        describe('array methods that return a single, scalar value', () => {

            it('testing the members of an array', () => {
                const allEven = numbers.every(n => n % 2 === 0); // LINQ .All
                expect(allEven).toBeFalse();

                const anyEven = numbers.some(n => n % 2 === 0); // LINQ .Any
                expect(anyEven).toBeTrue();
            });

            it('has reducer (and reduce right)', () => {
                const sum = numbers.reduce((s, n) => s + n);
                expect(sum).toBe(45);

                const sumBig = numbers.reduce((s, n) => s + n, 100);
                expect(sumBig).toBe(145);
            });
        });

        describe('a couple of practices', () => {
            describe('shopping cart', () => {
                it('the practice', () => {
                    interface CartItem {
                        name: string;
                        qty: number;
                        price: number;
                    }
                    const cart: CartItem[] = [
                        { name: 'Eggs', qty: 1, price: 2.99 },
                        { name: 'Bread', qty: 3, price: 3.57 },
                        { name: 'Shampoo', qty: 2, price: 7.25 }
                    ];
                    interface Bill {
                        totalQty: number;
                        totalPrice: number;
                    }

                    // tslint:disable-next-line: max-line-length
                    const finalBill: Bill = cart.reduce((s: Bill, c: CartItem) => ({ totalQty: s.totalQty + c.qty, totalPrice: s.totalPrice + c.price * c.qty }), { totalQty: 0, totalPrice: 0 })

                    expect(finalBill.totalPrice).toBe(28.20);
                    expect(finalBill.totalQty).toBe(6);
                });
            });
            describe('bowling game', () => {

                it('practice 2', () => {
                    interface BowlingGame {
                        playerName: string;
                        score: number;
                    }
                    const scores: BowlingGame[] = [
                        { playerName: 'Jeff', score: 122 },
                        { playerName: 'Henry', score: 227 },
                        { playerName: 'Stacey', score: 212 },
                        { playerName: 'Violet', score: 118 }
                    ]
                    interface Results {
                        highScore: number;
                        highScorer: string;
                        lowScore: number;
                        lowScorer: string;
                    }

                    // Your Code Here
                    const initialState: Results = {
                        highScore: -1,
                        highScorer: null,
                        lowScore: 301,
                        lowScorer: null
                    }

                    const answer: Results = scores.reduce((state: Results, next: BowlingGame) => ({
                        highScore: next.score > state.highScore ? next.score : state.highScore,
                        highScorer: next.score > state.highScore ? next.playerName : state.highScorer,
                        lowScore: next.score < state.lowScore ? next.score : state.lowScore,
                        lowScorer: next.score < state.lowScore ? next.playerName : state.lowScorer
                    } as Results), initialState)

                    expect(answer.highScore).toBe(227);
                    expect(answer.highScorer).toBe('Henry');
                    expect(answer.lowScore).toBe(118);
                    expect(answer.lowScorer).toBe('Violet');

                    const expected = ['Henry Got 227', 'Stacey Got 212'];

                    // your code here.
                    const playersOver200 = scores.filter(s => s.score > 200).map(s => `${s.playerName} Got ${s.score}`);
                    expect(playersOver200).toEqual(expected);
                });
            });

        });
    });
});