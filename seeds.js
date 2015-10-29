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
var lansell = unibears.id(),
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
            unibears.insert({_id: lansell, name:'Lansell'}),
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

    wsContract.remove().then(function(){
        return Promise.all([
            wsContract.insert({colonyId: lanisters, unibear_id: lansell, duration: 1, honeypots: 10}),
            wsContract.insert({colonyId: lanisters, unibear_id: cersei, duration: 1, honeypots: 600}),
            wsContract.insert({colonyId: tyrells, unibear_id: mace, duration: 1, honeypots: 300}),
            wsContract.insert({colonyId: tyrells, unibear_id: loras, duration: 1, honeypots: 200}),
            wsContract.insert({colonyId: starks, unibear_id: bran, duration: 1, honeypots: 100}),
            wsContract.insert({colonyId: starks, unibear_id: hodor, duration: 1, honeypots: 200}),
            wsContract.insert({colonyId: targaryens, unibear_id: jorah, duration: 1, honeypots: 360}),
            wsContract.insert({colonyId: targaryens, unibear_id: dario, duration: 1, honeypots: 800})
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
            wsStats.insert({weresquirrelId: tywin, duelId: lanVtyr, meat: 55, garlic: 30}),
            wsStats.insert({weresquirrelId: tyrion, duelId: lanVtyr, meat: 0, garlic: 100}),
            wsStats.insert({weresquirrelId: olenna, duelId: lanVtyr, meat: 60, garlic: 10}),
            wsStats.insert({weresquirrelId: tyrion, duelId: lanVtyr, meat: 30, garlic: 20}),
            wsStats.insert({weresquirrelId: tywin, duelId: lanVsta, meat: 60, garlic: 30}),
            wsStats.insert({weresquirrelId: tyrion, duelId: lanVsta, meat: 20, garlic: 80}),
            wsStats.insert({weresquirrelId: sansa, duelId: lanVsta, meat: 10, garlic: 10}),
            wsStats.insert({weresquirrelId: arya, duelId: lanVsta, meat: 70, garlic: 0}),
            wsStats.insert({weresquirrelId: tywin, duelId: lanVtarg, meat: 50, garlic: 10}),
            wsStats.insert({weresquirrelId: tyrion, duelId: lanVtarg, meat: 80, garlic: 40}),
            wsStats.insert({weresquirrelId: dani, duelId: lanVtarg, meat: 100, garlic: 70}),
            wsStats.insert({weresquirrelId: jon, duelId: lanVtarg, meat: 50, garlic: 50}),
            wsStats.insert({weresquirrelId: olenna, duelId: tyrVtarg, meat: 60, garlic: 10}),
            wsStats.insert({weresquirrelId: margaery, duelId: tyrVtarg, meat: 40, garlic: 20}),
            wsStats.insert({weresquirrelId: dani, duelId: tyrVtarg, meat: 100, garlic: 80}),
            wsStats.insert({weresquirrelId: jon, duelId: tyrVtarg, meat: 60, garlic: 40}),
            wsStats.insert({weresquirrelId: olenna, duelId: tyrVsta, meat: 20, garlic: 50}),
            wsStats.insert({weresquirrelId: margaery, duelId: tyrVsta, meat: 50, garlic: 50}),
            wsStats.insert({weresquirrelId: sansa, duelId: tyrVsta, meat: 20, garlic: 30}),
            wsStats.insert({weresquirrelId: arya, duelId: tyrVsta, meat: 30, garlic: 40}),
            wsStats.insert({weresquirrelId: dani, duelId: staVtarg, meat: 100, garlic: 100}),
            wsStats.insert({weresquirrelId: jon, duelId: staVtarg, meat: 0, garlic: 0}),
            wsStats.insert({weresquirrelId: sansa, duelId: staVtarg, meat: 0, garlic: 0}),
            wsStats.insert({weresquirrelId: arya, duelId: staVtarg, meat: 20, garlic: 50})
        ])
    })
]).then(function(){
    db.close();
});
