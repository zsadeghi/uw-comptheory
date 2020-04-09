const StateMachine = require("../statemachine");

let machine = new StateMachine(['0', '1']);
machine.addTerminal({
    '0': 1,
    '1': 3
});
machine.addTerminal({
    '0': 2,
    '1': 4
});
machine.addTerminal({
    '0': 3,
    '1': 4
});
machine.addTerminal({
    '0': 3,
    '1': 3
});
machine.addTerminal({
    '0': 3,
    '1': 3
});

console.log(machine.test("0011"));
