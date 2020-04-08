class StateMachine {

    #states;
    #terminals;
    #alphabet;
    #debug;

    constructor(alphabet, debug  = false) {
        if (!Array.isArray(alphabet)) {
            throw Error("Alphabet must be an array");
        }
        alphabet.forEach(letter => {
            if (typeof letter !== "string" || letter.length !==1) {
                throw Error("Invalid alphabet letter" + letter);
            }
        });
        this.#states = [];
        this.#terminals = [];
        this.#alphabet = alphabet;
        this.#debug = debug;
    }

    add(state) {
        this._add(state, false);
    }

    addTerminal(state) {
        this._add(state, true);
    }

    _add(state, terminal = false) {
        if (typeof state !== "object") {
            throw Error("State must be an object");
        }
        if (object.keys(state).length !== this.#alphabet.length){
            throw Error("Expected all letters to have a mapping.");
        }
        object.keys(state).forEach(letter => {
            if (this.#alphabet.indexOf(letter) === -1) {
                throw Error("Unexpected letter in state: " + letter);
            }
        });
        this.#states.push(state);
        if (terminal) {
            this.#terminals.push(this.#states.length-1);
        }
    }

}
