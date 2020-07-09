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
      randomWhen = 'after'
    }
    if (randomMonth === 'December' && randomWhen === 'after') {
      randomWhen = 'before'
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
