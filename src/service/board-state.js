function BoardStateFactory(...options) {
    const stateHistory = [[...'rnbqkbnrpppppppp................................PPPPPPPPRNBQKBNR']];
    const validPieces = '.pbnrqkPBNRQK';

    function lastState() {
        return stateHistory.slice(-1)[0];
    }

    function isEqual(baseState, compareState) {
        return baseState.join('') === compareState.join('');
    }

    function hasInvalidSymbol(state) {
        return !state.reduce((carry, current) => {
            const isCurrentValid = validPieces.indexOf(current) >= 0;

            if ('boolean' !== typeof(carry)) {
                return isCurrentValid && validPieces.indexOf(carry) >= 0;
            }

            return isCurrentValid && carry;
        });
    }

    return Object.freeze({
        push(state) {
            if ('function' !== typeof(state[Symbol.iterator])) {
                throw new Error('only iterable objects could be pushed to board state');
            }

            const stateCopy = [...state];

            if (stateCopy.length !== 64) {
                throw new Error('state size must be exactly 64')
            }

            if (isEqual(lastState(), stateCopy)) {
                throw new Error('pushing a state equals to previous one is not allowed');
            }

            if (hasInvalidSymbol(stateCopy)) {
                throw new Error('invalid symbol was found in pushed state');
            }

            stateHistory.push(stateCopy);

            return true;
        },

        getCurrentState() {
            return [...lastState()];
        },
    });
}

module.exports = BoardStateFactory;
