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
