describe('types in typescript', () => {
    describe('declaring variables and constants', () => {

        it('implicitly any', () => {
            // No Typescript in this example
            let x;

            x = 'Tacos';
            expect(typeof x).toBe('string');

            x = 3.19;
            expect(typeof x).toBe('number');

            x = function () { }
            expect(typeof x).toBe('function');

            x = ['dog', 'cat', 'mouse', 99, 'tacos'];
            expect(typeof x).toBe('object');
        });

        it('implicit typing', () => {
            let x: string | number = 'Tacos'; // Union type

            x = 3.19;

            let y: number | number[];

            y = 99;
            y = [1, 2, 3];
        });

        it('has const', () => {
            // const does not allow reassignment. that's it.

            const x = 3.15; // YOU MUST INITIALIZE IT

            const favoriteNumbers = [9, 20, 108];
            // CANNOT DO:
            // favoriteNumbers = [1, 2, 3];
            // But you can change the object. simply cannot reassign the variable to a NEW object
            favoriteNumbers[0] = 10;

            expect(favoriteNumbers).toEqual([10, 20, 108]);

            const movie = { title: 'Jaws', yearReleased: 1978 };
            // CANNOT DO:
            // movie = { title: 'Star Wars', yearReleased: 2000 };

            movie.yearReleased = 1977;

            expect(movie).toEqual({ title: 'Jaws', yearReleased: 1977 });
        });

        it('has var but it is bad and you are a bad person if you use it', () => {
            const age = 22;

            if (age > 21) {
                // tslint:disable-next-line: no-var-keyword prefer-const
                var message = 'Old enough';
            } else {
                // tslint:disable-next-line: no-var-keyword no-shadowed-variable
                const message = 'Too young';
            }

            // Notice that this variable should be scoped to the block that it was declared in, but it is not
            expect(message).toBe('Old enough');
        });
    });

    describe('literals in Typescript', () => {

        it('has string literals', () => {
            const n1 = 'Bob';
            // tslint:disable-next-line: quotemark
            const n2 = 'Bob';

            expect(n1).toEqual(n2);

            // tslint:disable-next-line: quotemark
            const someHtml = "<h1 class=\"pretty\">Hello</h1>";
        });
        it('has template strings', () => {
            // Backticks work as normal single quotes, but with superpowers
            const n1 = `Bob`;
            const n2 = `Bob`;
            expect(n1).toEqual(n2);

            // Tabs and newlines are included in the string
            const story = `Chapter 1

I was born at midnight in Akron.

It was all downhill from there.

The end.`;

            console.log(story);

            // concatenating strings in JS/TS

            const name = 'Joe';
            const age = 51;
            const job = 'DEV';

            // With single quote [']
            const description1 = 'The name is ' + name + ' and ' + name + ' is ' + age + ' and works as a ' + job;
            expect(description1).toBe('The name is Joe and Joe is 51 and works as a DEV');

            // With backtick [`]
            const description2 = `The name is ${name} and ${name} is ${age} and works as a ${job}`;
            expect(description2).toBe('The name is Joe and Joe is 51 and works as a DEV');

        });
    });
});