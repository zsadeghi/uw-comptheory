class StateMachine {

    #states;
    #terminals;
    #alphabet;
    #debug;

    constructor(alphabet, debug = false) {
        if (!Array.isArray(alphabet)) {
            throw Error("Alphabet must be an array");
        }
        alphabet.forEach(letter => {
            if (typeof letter !== "string" || letter.length !== 1) {
                throw Error("Invalid alphabet letter" + letter);
            }
        });
        this.#states = [];
        this.#terminals = [];
        this.#alphabet = alphabet;
        this.#debug = debug;
    }

    add(state) {
        if (typeof state !== "object") {
            throw Error("State must be an object");
        }
        if (Object.keys(state).length !== this.#alphabet.length) {
            throw Error("Expected all letters to have a mapping.");
        }
        Object.keys(state).forEach(letter => {
            if (this.#alphabet.indexOf(letter) === -1) {
                throw Error("Unexpected letter in state: " + letter);
            }
        });
        this.#states.push(state);
    }

    addTerminal(state) {
        this.add(state);
        this.#terminals.push(this.#states.length - 1);
    }

    test(word) {
        if (typeof word !== 'string') {
            throw Error("expected a word");
        }
        if (word.length === 0) {
            if (this.#terminals.indexOf(0) !== -1) {
                return {
                    success: true,
                    error: 'Unexpected end of input'
                };
            }
        }
        let state = 0;
        for (let letter = 0; letter < word.length; letter++) {
            let next = this.#states[state][word[letter]];
            if (this.#debug) {
                console.log(word[letter] + ':' + state + ' -> ' + next);
            }
            if (typeof next === 'undefined') {
                return {
                    success: false,
                    error: 'Unexpected letter ${word[letter]} at ${letter} in ${word}'
                }
            } else if (letter === word.length - 1) {
                if (this.#terminals.indexOf(next) !== -1) {
                    return {
                        success: true,
                        error: ''
                    };
                } else {
                    return {
                        success: false,
                        error: 'Unexpected end of input'
                    };
                }
            } else {
                state = next;
            }
        }
    }
}