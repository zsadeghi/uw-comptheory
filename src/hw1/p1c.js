const StateMachine = require("../statemachine");

let machine = new StateMachine(['0', '1']);
machine.add({
    '0': 1,
    '1': 1
});
machine.addTerminal({
    '0': 'E',
    '1': 2
});
machine.addTerminal({
    '0': 1,
    '1': 1
});

console.log(machine.test("01"));
