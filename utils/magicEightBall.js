export class YesResponse {
  getAnswer() {
    return "Yes"
  }
  getResults() {
    return {
      answer: this.getAnswer(),
      index: 0
    }
  }
}

export class PerhapsResponse {
  getAnswer() {
    return "Perhaps"
  }
  getResults() {
    return {
      answer: this.getAnswer(),
      index: 1
    }
  }
}

export class MaybeResponse {
  getAnswer() {
    return "Maybe"
  }
  getResults() {
    return {
      answer: this.getAnswer(),
      index: 2
    }
  }
}

export class NotTodayResponse {
  getAnswer() {
    return "Not today bud"
  }
  getResults() {
    return {
      answer: this.getAnswer(),
      index: 3
    }
  }
}

export class AskAgainLaterResponse {
  constructor() {
    this.randomHour
  }
  getAnswer() {
    const randomHour = Math.floor(Math.random() * 13) + 1
    this.randomHour = randomHour
    return `Ask again in ${randomHour} hours`
  }
  getResults() {
    return {
      answer: this.getAnswer(),
      index: 4,
      randomHour: this.randomHour

    }
  }
}

export class BetterNotTellResponse {
  getAnswer() {
    return "Better to not say, sorry"
  }
  getResults() {
    return {
      answer: this.getAnswer(),
      index: 5
    }
  }
}

export class OnThisMonthResponse {
  constructor() {
    this.months = ['January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December']
    this.when = ['before', 'after']
    this.randomMonth
    this.randomWhen
  }
  getAnswer() {
    const randomMonthIdx = Math.floor(Math.random() * this.months.length)
    const randomWhenIdx = Math.floor(Math.random() * this.when.length)
    const randomMonth = this.months[randomMonthIdx]
    const randomWhen = this.when[randomWhenIdx]
    this.randomMonth = randomMonth
    this.randomWhen = randomWhen
    if (randomMonth === 'January' && randomWhen === 'before') {
      this.randomWhen = 'after'
    }
    if (randomMonth === 'December' && randomWhen === 'after') {
      this.randomWhen = 'before'
    }
    return `If you were born ${randomWhen} the month of ${randomMonth}, then yes`
  }
  getResults() {
    return {
      answer: this.getAnswer(),
      index: 6,
      randomWhen: this.randomWhen,
      randomMonth: this.randomMonth
    }
  }
}

export class IfNameStartsWithResponse {
  constructor() {
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    this.randomLetter
  }
  getAnswer() {
    const randomLetterIdx = Math.floor(Math.random() * this.alphabet.length)
    const randomLetter = this.alphabet[randomLetterIdx]
    this.randomLetter = randomLetter
    return `If your name starts with a ${randomLetter} then sadly no`
  }
  getResults() {
    return {
      answer: this.getAnswer(),
      index: 7,
      randomLetter: this.randomLetter
    }
  }
}

export class IfThisHeightResponse {
  constructor() {
    this.feet = [3, 4, 5, 6, 7]
    this.inches = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5]
    this.tallerOrShorter = ['taller', 'shorter']
    this.randomFeet
    this.randomInches
    this.randomTallerOrShorter
  }
  getAnswer() {
    const randomFeetIdx = Math.floor(Math.random() * this.feet.length)
    const randomFeet = this.feet[randomFeetIdx]
    const randomInchesIdx = Math.floor(Math.random() * this.inches.length)
    const randomInches = this.inches[randomInchesIdx]
    const randomTallerOrShorterIdx = Math.floor(Math.random() * this.tallerOrShorter.length)
    const randomTallerOrShorter = this.tallerOrShorter[randomTallerOrShorterIdx]
    this.randomFeet = randomFeet
    this.randomInches = randomInches
    this.randomTallerOrShorter = randomTallerOrShorter
    return `If you're ${randomTallerOrShorter} than ${randomFeet}'${randomInches}", then absolutely`
  }
  getResults() {
    return {
      answer: this.getAnswer(),
      index: 8,
      randomFeet: this.randomFeet,
      randomInches: this.randomInches,
      randomTallerOrShorter: this.randomTallerOrShorter
    }
  }
}

export class IfFanOfThisMovieGoodResponse {
  constructor() {
    this.movies = ['the Lord of the Rings',
      'The Matrix',
      'Parasite',
      'Memento',
      'No Country For Old Men',
      'Back to the Future',
      'Jurassic Park',
      'The Dark Knight',
      'Inglourious Basterds',
      'Her',
      'The Shawshank Redemption',
      'Blade Runner']
    this.randomMovie
  }
  getAnswer() {
    const randomMovieIdx = Math.floor(Math.random() * this.movies.length)
    const randomMovie = this.movies[randomMovieIdx]
    this.randomMovie = randomMovie
    return `If you're a fan of ${randomMovie}, you're in luck!`
  }
  getResults() {
    return {
      answer: this.getAnswer(),
      index: 9,
      randomMovie: this.randomMovie
    }
  }
}

export class IfFanOfThisMovieBadResponse {
  constructor() {
    this.movies = ['The Hunger Games Series',
      'Gravity',
      'Avatar (by James Cameron)',
      'Memento',
      'Catwoman',
      'Gigli',
      'Disaster Movie',
      'Movie 43',
      'The Mummy 3',
    ]
    this.randomMovie
  }
  getAnswer() {
    const randomMovieIdx = Math.floor(Math.random() * this.movies.length)
    const randomMovie = this.movies[randomMovieIdx]
    this.randomMovie = randomMovie
    return `If you thought ${randomMovie} was a good movie, then unfortunately there is no hope...`
  }
  getResults() {
    return {
      answer: this.getAnswer(),
      index: 10,
      randomMovie: this.randomMovie
    }
  }
}

export class ThereIsHopeResponse {
  getAnswer() {
    return `There is hope`
  }
  getResults() {
    return {
      answer: this.getAnswer(),
      index: 11,
    }
  }
}

export class MagicEightBall {
  constructor() {
    this.response = [
      YesResponse,
      PerhapsResponse,
      MaybeResponse,
      NotTodayResponse,
      AskAgainLaterResponse,
      BetterNotTellResponse,
      OnThisMonthResponse,
      IfNameStartsWithResponse,
      IfThisHeightResponse,
      IfFanOfThisMovieGoodResponse,
      IfFanOfThisMovieBadResponse
    ]
  }

  getResponse() {
    const randomIdx = Math.floor(Math.random() * this.response.length)
    const response = new this.response[randomIdx]
    const answer = response.getResults()
    return answer
  }
}
