

//utils is osmething which provide to main files ....utils provide external resouces to main files.

const adjectives=[
    'boundless',
    'carefree',
    'lunatic',
    'bluerain',
    'sleepyeyes',
    'demonlaugh',
    'sweet',
    'pinkdays',
    'silverknight',
    'bluespring',
    'nodebear',
    'junway',
    'joker',
    'smoothroad',
    'racetrim',
      'dangerous',
      'restdrum',
      'endloop'
];

const OBJECTS=[
    'drum',
    'bell',
    'redberry',
    'chair',
    'wrench',
    'bolts',
    'fan',
    'towel',
    'board',
    'pudding',
    'wheel',
    'keys',
    'balls',
    'light',
    'axe',
    'fume',
    'blade',
    'sharp'
]

const getRandomUsername=()=>{
   const adjLen=adjectives.length;
   const objLen=OBJECTS.length;

   const adjIdx=adjectives[Math.floor(Math.random()*18)];
   const objIdx=OBJECTS[Math.floor(Math.random()*18)];

   return `${adjIdx}-${objIdx}`;
}


module.exports={
    getRandomUsername
}




