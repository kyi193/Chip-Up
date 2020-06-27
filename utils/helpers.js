export function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
export const handChart = [
  [
    'AA', 'AKs', 'AQs',
    'AJs', 'ATs', 'A9s',
    'A8s', 'A7s', 'A6s',
    'A5s', 'A4s', 'A3s',
    'A2s'
  ],
  [
    'AKo', 'KK', 'KQs',
    'KJs', 'KTs', 'K9s',
    'K8s', 'K7s', 'K6s',
    'K5s', 'K4s', 'K3s',
    'K2s'
  ],
  [
    'AQo', 'KQo', 'QQ',
    'QJs', 'QTs', 'Q9s',
    'Q8s', 'Q7s', 'Q6s',
    'Q5s', 'Q4s', 'Q3s',
    'Q2s'
  ],
  [
    'AJo', 'KJo', 'QJo',
    'JJ', 'JTs', 'J9s',
    'J8s', 'J7s', 'J6s',
    'J5s', 'J4s', 'J3s',
    'J2s'
  ],
  [
    'ATo', 'KTo', 'QTo',
    'JTo', 'TT', 'T9s',
    'T8s', 'T7s', 'T6s',
    'T5s', 'T4s', 'T3s',
    'T2s'
  ],
  [
    'A9o', 'K9o', 'Q9o',
    'J9o', 'T9o', '99',
    '98s', '97s', '96s',
    '95s', '94s', '93s',
    '92s'
  ],
  [
    'A8o', 'K8o', 'Q8o',
    'J8o', 'T8o', '98o',
    '88', '87s', '86s',
    '85s', '84s', '83s',
    '82s'
  ],
  [
    'A7o', 'K7o', 'Q7o',
    'J7o', 'T7o', '97o',
    '87o', '77', '76s',
    '75s', '74s', '73s',
    '72s'
  ],
  [
    'A6o', 'K6o', 'Q6o',
    'J6o', 'T6o', '96o',
    '86o', '76o', '66',
    '65s', '64s', '63s',
    '62s'
  ],
  [
    'A5o', 'K5o', 'Q5o',
    'J5o', 'T5o', '95o',
    '85o', '75o', '65o',
    '55', '54s', '53s',
    '52s'
  ],
  [
    'A4o', 'K4o', 'Q4o',
    'J4o', 'T4o', '94o',
    '84o', '74o', '64o',
    '54o', '44', '43s',
    '42s'
  ],
  [
    'A3o', 'K3o', 'Q3o',
    'J3o', 'T3o', '93o',
    '83o', '73o', '63o',
    '53o', '43o', '33',
    '32s'
  ],
  [
    'A2o', 'K2o', 'Q2o',
    'J2o', 'T2o', '92o',
    '82o', '72o', '62o',
    '52o', '42o', '32o',
    '22'
  ]
]

export const ranges = {
  utg200: ['A4s', 'A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'AKo'],
  utg190: ['A4s', 'A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'AKo', 'TT'],
  utg180: ['A4s', 'A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'AJs', 'AKo', 'TT'],
  utg170: ['A3s', 'A4s', 'A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'AJs', 'AKo', 'TT'],
  utg160: ['A4s', 'A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'KQs', 'AJs', 'AKo', 'TT'],
  utg150: ['A4s', 'A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'KQs', 'AJs', 'AKo', 'TT'],
  utg140: ['A3s', 'A4s', 'A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'KQs', 'AJs', 'ATs', 'AKo', 'AQo', 'TT'],
  utg130: ['A3s', 'A4s', 'A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'KQs', 'AJs', 'ATs', 'AKo', 'AQo', 'TT', '99'],
  utg120: ['A3s', 'A4s', 'A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'KQs', 'KJs', 'AJs', 'ATs', 'AKo', 'AQo', 'TT', '99'],
  utg110: ['A3s', 'A4s', 'A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'KQs', 'KJs', 'QJs', 'AJs', 'ATs', 'AKo', 'AQo', 'TT', '99'],
  utg100: ['A3s', 'A4s', 'A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'KQs', 'KJs', 'QJs', 'AJs', 'ATs', 'KTs', 'QTs', 'AKo', 'AQo', 'TT', '99', '88', '77'],
  utg90: ['A4s', 'A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'KQs', 'KJs', 'QJs', 'AJs', 'ATs', 'KTs', 'QTs', 'JTs', 'AKo', 'AQo', 'TT', '99', '88', '77'],
  utg80: ['A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'KQs', 'KJs', 'QJs', 'AJs', 'ATs', 'KTs', 'QTs', 'JTs', 'AKo', 'AQo', 'AJo', 'TT', '99', '88', '77', '66'],
  utg70: ['A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'KQs', 'KJs', 'QJs', 'AJs', 'ATs', 'A9s', 'KTs', 'QTs', 'JTs', 'AKo', 'AQo', 'AJo', 'KQo', 'TT', '99', '88', '77', '66', '55'],
  utg60: ['A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'KQs', 'KJs', 'QJs', 'AJs', 'ATs', 'A9s', 'A8s', 'K9s', 'T9s', 'KTs', 'QTs', 'JTs', 'AKo', 'AQo', 'KQo', 'AJo', 'ATo', 'TT', '99', '88', '77', '66', '55'],
  utg50: ['A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'KQs', 'KJs', 'QJs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'K9s', 'T9s', 'KTs', 'QTs', 'JTs', 'AKo', 'AQo', 'KQo', 'AJo', 'ATo', 'TT', '99', '88', '77', '66', '55', '44'],
  utg40: ['A4s', 'A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'KQs', 'KJs', 'QJs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'K9s', 'T9s', 'KTs', 'QTs', 'JTs', 'AKo', 'AQo', 'KQo', 'KJo', 'AJo', 'ATo', 'TT', '99', '88', '77', '66', '55', '44'],
  utg30: ['A3s', 'A4s', 'A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'KQs', 'KJs', 'QJs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'K9s', 'Q9s', 'J9s', 'T9s', 'KTs', 'QTs', 'JTs', 'AKo', 'AQo', 'KQo', 'KJo', 'KTo', 'AJo', 'ATo', 'TT', '99', '88', '77', '66', '55', '44'],
  utg20: ['A2s', 'A3s', 'A4s', 'A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'KQs', 'KJs', 'QJs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'K9s', 'Q9s', 'J9s', 'T9s', 'KTs', 'QTs', 'JTs', 'AKo', 'AQo', 'KQo', 'KJo', 'KTo', 'AJo', 'ATo', 'TT', '99', '88', '77', '66', '55', '44', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'K9o', 'QJo', 'QTo', 'JTo', 'K8s', 'Q8s', 'J8s', 'T8s', 'K7s', 'K6s', 'K5s', 'K4s', '33', '22', '98s'],
  utg10: ['A2s', 'A3s', 'A4s', 'A5s', 'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'KQs', 'KJs', 'QJs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'K9s', 'Q9s', 'J9s', 'T9s', 'KTs', 'QTs', 'JTs', 'AKo', 'AQo', 'KQo', 'KJo', 'KTo', 'AJo', 'ATo', 'TT', '99', '88', '77', '66', '55', '44', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o', 'QJo', 'QTo', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'JTo', 'J9o', 'J8o', 'J7o', 'T9o', 'T8o', 'T7o', '98o', '97o', '87o', '86o', '76o', 'K8s', 'Q8s', 'J8s', 'T8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s', '33', '22', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s', '98s', '97s', '96s', '95s', '94s', '93s', '87s', '86s', '85s', '84s', '76s', '75s', '74s', '65s', '64s', '63s', '54s', '53s', '43s'],
}
