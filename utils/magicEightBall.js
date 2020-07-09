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
