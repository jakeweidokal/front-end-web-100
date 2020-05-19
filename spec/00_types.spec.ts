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

        it('has various ways to express numeric literals', () => {
            let age: number;
            age = 51;

            const n1 = 1.2;
            const n2 = 0xff // Base 16
            const n4 = 0b010101 // Base 2 (binary)
            const n5 = 0o23 // Base 8

            // Can separate large numbers with underscores for readability, but they are not included in the actual value
            const reallyBigNumber = 1_222_333_444;
            expect(reallyBigNumber).toBe(1222333444);
        });

        describe('arrays and array literals', () => {

            it('has two ays to declare an array', () => {
                let stuff: (number | string)[];
                stuff = ['dog', 'cat', 'mouse', 99];
                expect(stuff[0]).toBe('dog');
                expect(stuff[999]).toBeUndefined();

                let otherStuff: Array<number | string>;
                otherStuff = [1, 'bird', 99];
            });

            it('has array destructuring and a rest operator', () => {
                const friends = ['sean', 'amy', 'david', 'henry'];

                // const friend1 = friends[0]
                // const friend3 = friends[2]
                const [friend1, , friend3] = friends;

                expect(friend1).toBe('sean');
                expect(friend3).toBe('david');

                // the rest operator
                const [first, ...allTheOthers] = friends;

                expect(first).toBe('sean');
                expect(allTheOthers).toEqual(['amy', 'david', 'henry']);

                const numbers = [1, 2, 3, 4, 5];
                const newNumbers = [0, ...numbers, 6];

                expect(newNumbers).toEqual([0, 1, 2, 3, 4, 5, 6]);

                function addThemAll(...nums: number[]) {
                    return nums.reduce((s, n) => s + n);
                }

                expect(addThemAll(1)).toBe(1);
                expect(addThemAll(2, 2)).toBe(4);
                expect(addThemAll(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
            });

            it('tuples', () => {
                // typed arrays
                const stuff: [string, number, string] = ['Cat', 13, 'Dog'];
                const first = stuff[0];
                const second = stuff[1];

                type QuoteMarkRule = [boolean, 'single' | 'double'];

                const myQuoteRule: QuoteMarkRule = [true, 'double'];
                if (myQuoteRule[0]) {
                    console.log(`You are enforcing quote marks and using ${myQuoteRule[1]} quotes`);
                }
            });

            describe('a practical example of what you might use a tuple for (but probably would not)', () => {
                it('an oop approach', () => {
                    // string FormatName(string first, string last)
                    interface FormattedName { formattedName: string; numberOfLettersInName: number; }
                    function formatName(first: string, last: string): FormattedName {
                        const formattedName = `${last}, ${first}`
                        return {
                            formattedName,
                            numberOfLettersInName: formattedName.length
                        }
                    }
                    function formatNameCasually(first: string, last: string): FormattedName {
                        const formattedName = `${first} ${last}`;
                        return {
                            formattedName,
                            numberOfLettersInName: formattedName.length
                        }
                    }
                    const result = formatName('Han', 'Solo');
                    expect(result.formattedName).toBe('Solo, Han');
                    expect(result.numberOfLettersInName).toBe(9);
                    // const result2 = formatNameCasually('Luke', 'Skywalker');
                    // expect(result2.formattedName).toBe('Luke Skywalker');
                    const { formattedName: n } = formatNameCasually('Luke', 'Skywalker');
                    expect(n).toBe('Luke Skywalker');
                });

                it('if that wasn\'t confusing enough, here is tuples', () => {
                    function formatName(first: string, last: string): [string, number] {
                        const formattedName = `${last}, ${first}`;
                        return [formattedName, formattedName.length]
                    }
                    const results = formatName('Han', 'Solo');
                    expect(results[0]).toBe('Solo, Han');
                    expect(results[1]).toBe(9);
                    // but wait! We have destructuring
                    const [fullName] = formatName('Luke', 'Skywalker');
                    expect(fullName).toBe('Skywalker, Luke');
                });

                it('destructuring an object', () => {
                    const movie = { title: 'A New Hope', director: 'Lucas', yearReleased: 1977 };

                    // Old Skool
                    const t1 = movie.title;
                    const y1 = movie.yearReleased;
                    expect(t1).toBe('A New Hope');
                    expect(y1).toBe(1977);

                    // new Skool
                    const { title: t2, yearReleased: y2 } = movie;
                    expect(t2).toBe('A New Hope');
                    expect(y2).toBe(1977);
                });

                it('anonymous types are implicitly defined by an interface', () => {
                    const thor: any = {
                        title: 'Thor: Ragnarok',
                        director: 'Taika Waititi',
                        yearReleased: 2017
                    };
                    thor.title = 'Thor Ragnorok';
                    expect(thor.title).toBe('Thor Ragnorok');
                    // tslint:disable-next-line: no-string-literal
                    expect(thor['title']).toBe('Thor Ragnorok');
                    thor.yearreleased = 2017;
                    thor.nicehair = true;
                });

                it('has duck typing (aka structural typing)', () => {
                    interface MessageHaver { message: string }
                    function logMessage(item: MessageHaver) {
                        console.log(`At ${new Date().toLocaleTimeString()} you got the message ${item.message}`);
                    }

                    logMessage({ message: 'Call your mom' });

                    const phoneCall = {
                        from: 'Jenny',
                        number: '867-5309',
                        message: 'For a good time...'
                    };
                    logMessage(phoneCall);
                });
            });
        });
    });
});