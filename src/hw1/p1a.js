const StateMachine = require("../statemachine");

let machine = new StateMachine(['0', '1']);
machine.add({
    '0': 1,
    '1': 'E'
});

machine.add({
    '0': 'E',
    '1': 2
});

machine.add({
    '0': 3,
    '1': 2
});

machine.addTerminal({
    '0': 3,
    '1': 2
});
console.log(machine.test("0110"));

