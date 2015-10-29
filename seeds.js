var db = require('monk')('localhost/weresquirrels-unibears');

var colonies = db.get('colonies');
var unibears = db.get('unibears');
var weresquirrels = db.get('weresquirrels');
var ubContract = db.get('ubContract');
var wsContract = db.get('wsContract');
var duels = db.get('duels');
var wsStats = db.get('wsStats');

// Seed the colonies
var lanisters = colonies.id(),
    tyrells = colonies.id(),
    starks = colonies.id(),
    targaryens = colonies.id();

// Seed the WERESQUIRRELS
    // lanisters
var tywin = weresquirrels.id(),
    tyrion = weresquirrels.id(),
    // tyrells
    olenna = weresquirrels.id(),
    margaery = weresquirrels.id(),
    // starks
    sansa = weresquirrels.id(),
    arya = weresquirrels.id(),
    // targaryens
    dani = weresquirrels.id(),
    jon = weresquirrels.id();

// Seed the UNIBEARS
    // lanisters
var jaime = unibears.id(),
    cersei = unibears.id(),
    // tyrells
    mace = unibears.id(),
    loras = unibears.id(),
    // starks
    bran = unibears.id(),
    hodor = unibears.id(),
    // targaryens
    jorah = unibears.id(),
    dario = unibears.id();

// Seed the duels
var lanVtyr = duels.id(),
    lanVsta = duels.id(),
    lanVtarg = duels.id(),
    tyrVtarg = duels.id(),
    tyrVsta = duels.id(),
    staVtarg = duels.id();

Promise.all([
    colonies.remove().then(function(){
        return Promise.all([
            colonies.insert({_id: lanisters, name: 'Lanisters'}),
            colonies.insert({_id: tyrells, name:'Tyrells'}),
            colonies.insert({_id: starks, name: 'Starks'}),
            colonies.insert({_id: targaryens, name: 'Targaryens'})
        ])
    }),

    weresquirrels.remove().then(function(){
        return Promise.all([
            weresquirrels.insert({_id: tywin, name:'Tywin'}),
            weresquirrels.insert({_id: tyrion, name: 'Tyrion'}),
            weresquirrels.insert({_id: olenna, name: 'Olenna'}),
            weresquirrels.insert({_id: margaery, name: 'Margaery'}),
            weresquirrels.insert({_id: sansa, name:'Sansa'}),
            weresquirrels.insert({_id: arya, name: 'Ayra'}),
            weresquirrels.insert({_id: dani, name: 'Dani'}),
            weresquirrels.insert({_id: jon, name: 'Jon'})
        ])
    }),

    unibears.remove().then(function(){
        return Promise.all([
            unibears.insert({_id: jaime, name:'Jaime'}),
            unibears.insert({_id: cersei, name: 'Cersei'}),
            unibears.insert({_id: mace, name: 'Mace'}),
            unibears.insert({_id: loras, name:'Loras'}),
            unibears.insert({_id: bran, name: 'Bran'}),
            unibears.insert({_id: hodor, name:'Hodor'}),
            unibears.insert({_id: jorah, name: 'Jorah'}),
            unibears.insert({_id: dario, name: 'Dario'})
        ])
    }),

    wsContract.remove().then(function(){
        return Promise.all([
            wsContract.insert({colonyId: lanisters, weresquirrel_id: tywin, duration: 1, peanuts: 1000}),
            wsContract.insert({colonyId: lanisters, weresquirrel_id: tyrion, duration: 1, peanuts: 400}),
            wsContract.insert({colonyId: tyrells, weresquirrel_id: olenna, duration: 1, peanuts: 1000}),
            wsContract.insert({colonyId: tyrells, weresquirrel_id: margaery, duration: 1, peanuts: 600}),
            wsContract.insert({colonyId: starks, weresquirrel_id: sansa, duration: 1, peanuts: 360}),
            wsContract.insert({colonyId: starks, weresquirrel_id: arya, duration: 1, peanuts: 100}),
            wsContract.insert({colonyId: targaryens, weresquirrel_id: dani, duration: 1, peanuts: 1500}),
            wsContract.insert({colonyId: targaryens, weresquirrel_id: jon, duration: 1, peanuts: 0})
        ])
    }),

    ubContract.remove().then(function(){
        return Promise.all([
            ubContract.insert({colonyId: lanisters, unibear_id: jaime, duration: 1, honeypots: 10}),
            ubContract.insert({colonyId: lanisters, unibear_id: cersei, duration: 1, honeypots: 600}),
            ubContract.insert({colonyId: tyrells, unibear_id: mace, duration: 1, honeypots: 300}),
            ubContract.insert({colonyId: tyrells, unibear_id: loras, duration: 1, honeypots: 200}),
            ubContract.insert({colonyId: starks, unibear_id: bran, duration: 1, honeypots: 100}),
            ubContract.insert({colonyId: starks, unibear_id: hodor, duration: 1, honeypots: 200}),
            ubContract.insert({colonyId: targaryens, unibear_id: jorah, duration: 1, honeypots: 360}),
            ubContract.insert({colonyId: targaryens, unibear_id: dario, duration: 1, honeypots: 800})
        ])
    }),

    duels.remove().then(function(){
        return Promise.all([
            duels.insert({_id: lanVtyr, challengerId: lanisters, defenderId: tyrells, winner: lanisters}),
            duels.insert({_id: lanVsta, challengerId: lanisters, defenderId: starks, winner: lanisters}),
            duels.insert({_id: lanVtarg, challengerId: lanisters, defenderId: targaryens, winner: targaryens}),
            duels.insert({_id: tyrVtarg, challengerId: tyrells, defenderId: targaryens, winner: targaryens}),
            duels.insert({_id: tyrVsta, challengerId: tyrells, defenderId: starks, winner: tyrells}),
            duels.insert({_id: staVtarg, challengerId: starks, defenderId: targaryens, winner: targaryens})
        ])
    }),

    wsStats.remove().then(function(){
        return Promise.all([
            wsStats.insert({weresquirrel_id: tywin, duelId: lanVtyr, meat: 55, garlic: 30}),
            wsStats.insert({weresquirrel_id: tyrion, duelId: lanVtyr, meat: 0, garlic: 100}),
            wsStats.insert({weresquirrel_id: olenna, duelId: lanVtyr, meat: 60, garlic: 10}),
            wsStats.insert({weresquirrel_id: tyrion, duelId: lanVtyr, meat: 30, garlic: 20}),
            wsStats.insert({weresquirrel_id: tywin, duelId: lanVsta, meat: 60, garlic: 30}),
            wsStats.insert({weresquirrel_id: tyrion, duelId: lanVsta, meat: 20, garlic: 80}),
            wsStats.insert({weresquirrel_id: sansa, duelId: lanVsta, meat: 10, garlic: 10}),
            wsStats.insert({weresquirrel_id: arya, duelId: lanVsta, meat: 70, garlic: 0}),
            wsStats.insert({weresquirrel_id: tywin, duelId: lanVtarg, meat: 50, garlic: 10}),
            wsStats.insert({weresquirrel_id: tyrion, duelId: lanVtarg, meat: 80, garlic: 40}),
            wsStats.insert({weresquirrel_id: dani, duelId: lanVtarg, meat: 100, garlic: 70}),
            wsStats.insert({weresquirrel_id: jon, duelId: lanVtarg, meat: 50, garlic: 50}),
            wsStats.insert({weresquirrel_id: olenna, duelId: tyrVtarg, meat: 60, garlic: 10}),
            wsStats.insert({weresquirrel_id: margaery, duelId: tyrVtarg, meat: 40, garlic: 20}),
            wsStats.insert({weresquirrel_id: dani, duelId: tyrVtarg, meat: 100, garlic: 80}),
            wsStats.insert({weresquirrel_id: jon, duelId: tyrVtarg, meat: 60, garlic: 40}),
            wsStats.insert({weresquirrel_id: olenna, duelId: tyrVsta, meat: 20, garlic: 50}),
            wsStats.insert({weresquirrel_id: margaery, duelId: tyrVsta, meat: 50, garlic: 50}),
            wsStats.insert({weresquirrel_id: sansa, duelId: tyrVsta, meat: 20, garlic: 30}),
            wsStats.insert({weresquirrel_id: arya, duelId: tyrVsta, meat: 30, garlic: 40}),
            wsStats.insert({weresquirrel_id: dani, duelId: staVtarg, meat: 100, garlic: 100}),
            wsStats.insert({weresquirrel_id: jon, duelId: staVtarg, meat: 0, garlic: 0}),
            wsStats.insert({weresquirrel_id: sansa, duelId: staVtarg, meat: 0, garlic: 0}),
            wsStats.insert({weresquirrel_id: arya, duelId: staVtarg, meat: 20, garlic: 50})
        ])
    })
]).then(function(){
    db.close();
});
