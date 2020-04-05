const BoardStateFactory = require('service/board-state');
const InitialState = [...'rnbqkbnrpppppppp................................PPPPPPPPRNBQKBNR'];

describe('testing BoardState positive behavior', () => {
    
    describe('testing BoardState.push', () => {
        const boardState = BoardStateFactory();

        [
            [...'rnbqkbnrp.pppppp.p..............................PPPPPPPPRNBQKBNR'],
            [...'rnbqkbnrp.pppppp.p...........................P..PPPPP.PPRNBQKBNR'],
        ].forEach((c, n) => {
            it(`case ${n + 1}`, () => {
                expect(boardState.push(c)).toBe(true);
            });
        });
    });

    describe('testing BoardState.getCurrentState', () => {
        const boardState = BoardStateFactory();

        it('testing first board state', () => {
            expect(boardState.getCurrentState()).toStrictEqual(InitialState);
        });

        [
            [...'rnbqkbnrp.pppppp.p..............................PPPPPPPPRNBQKBNR'],
            [...'rnbqkbnrp.pppppp.p..........................P...PPPP.PPPRNBQKBNR'],
        ].forEach((c, n) => {
            it(`case ${n + 1}`, () => {
                boardState.push(c);
                expect(boardState.getCurrentState()).toStrictEqual(c);
            });
        });
    });

});

describe('testing board state negative behavior', () => {
    describe('testing BoardState.push', () => {
        const boardState = BoardStateFactory();

        [
            {
                state: 0x1000,
                error: 'only iterable objects could be pushed to board state',
            },
            {
                state: ' ',
                error: 'state size must be exactly 64',
            },
            {
                state: InitialState,
                error: 'pushing a state equals to previous one is not allowed',
            },
            {
                state: [...'rnbqkbnrp.pppppp.x..............................PPPPPPPPRNBQKBNR'],
                error: 'invalid symbol was found in pushed state',
            },
        ].forEach((c, n) => {
            it(`case ${n + 1}: test if ${c.error}`, () => {
                expect(() => {
                    return boardState.push(c.state);
                }).toThrowError(c.error);
            });
        });
    });
});
