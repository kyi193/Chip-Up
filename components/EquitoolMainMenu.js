import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, ImageBackground } from 'react-native'
import { Header } from 'react-native-elements'
import { Entypo, Ionicons } from '@expo/vector-icons';
import EquitoolPlayerCards from './EquitoolPlayerCards'
import EquitoolCommunityCardSelector from './EquitoolCommunityCardSelector'
import { connect } from 'react-redux'
import { saveEquitoolParameters } from '../actions'
import EquitoolCalculateButton from './EquitoolCalculateButton'
import { deck, handEvaluator } from '../utils/helpers'
import 'random'
import 'poker-hand-evaluator'
import { Game, Card, HandEvaluator } from '../utils/card'

const backgroundImage = (Platform.OS === 'ios' || Platform.OS === 'android') ? { uri: "https://i.imgur.com/BrFGUhA.jpg" } : { uri: "https://i.imgur.com/qDG7eHT.jpg" };

class EquitoolMainMenu extends Component {
  state = {
    game: new Game(),
    playerOneWins: null,
    playerTwoWins: null,
    tie: null,
  }

  updatePlayerOneCards = (cardA, cardB) => {
    const game = this.state.game
    game.setPlayerOneCard(cardA, cardB)
    this.setState(() => ({ game }))
  }
  updatePlayerTwoCards = (cardA, cardB) => {
    const game = this.state.game
    game.setPlayerTwoCard(cardA, cardB)
    this.setState(() => ({ game }))
  }
  updateCommunityCards = (flopOneCard, flopTwoCard, flopThreeCard, turnCard) => {
    const game = this.state.game
    game.setCommunityCards(flopOneCard, flopTwoCard, flopThreeCard, turnCard)
    this.setState(() => ({ game }))
  }
  componentDidUpdate = () => {
    const { dispatch } = this.props
    // const { playerOneCardA, playerOneCardB, playerTwoCardA, playerTwoCardB, flopOneCard, flopTwoCard, flopThreeCard, turnCard } = this.state
    // dispatch(saveEquitoolParameters(...this.state.game.cardsInPlay()))
    dispatch(saveEquitoolParameters(this.state.game))
  }
  componentDidMount() {
    const { dispatch } = this.props
    // dispatch(saveEquitoolParameters(...this.state.game.cardsInPlay()))
    dispatch(saveEquitoolParameters(this.state.game))
  }
  removeCards(arr, subset) {
    const exclude = [...subset];
    return arr.filter(x => {
      const idx = exclude.indexOf(x);
      if (idx >= 0) {
        exclude.splice(idx, 1);
        return false;
      }
      return true;
    });
  }

  bestFiveCards = (playerCardsArr) => {
    let x = handEvaluator.evaluate(playerCardsArr).map(card => card.hand.split(" "))
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < x[i].length; j++) {
        x[i][j] = new Card(x[i][j])
      }
    }
    let handEval = new HandEvaluator(x[0])
    let handScore = handEval.getScore()
    for (const fiveCardHand of x) {
      const handEvaluator = new HandEvaluator(fiveCardHand)
      const score = handEvaluator.getScore()
      if (score > handScore) {
        handEval = handEvaluator
        handScore = score
      }
    }
    return handEval
  }
  evaluateTie(handOne, handTwo) {
    const rankNames = "23456789TJQKA";
    if (handOne.name === 'Three of a kind') {
      let handOneRanks = {}
      let handTwoRanks = {}
      let handOneArr = handOne.hand.split(' ')
      let handTwoArr = handTwo.hand.split(' ')
      let handOneTrips
      let handTwoTrips
      for (let i = 0; i < handOneArr.length; i++) {
        let value = handOneArr[i][0]
        if (handOneRanks[value] !== undefined) {
          handOneRanks[value] += 1
          if (handOneRanks[value] === 3) {
            handOneTrips = rankNames.indexOf(value)
          }
        } else {
          handOneRanks[value] = 1
        }
      }
      for (let i = 0; i < handTwoArr.length; i++) {
        let value = handTwoArr[i][0]
        if (handTwoRanks[value] !== undefined) {
          handTwoRanks[value] += 1
          if (handTwoRanks[value] === 3) {
            handTwoTrips = rankNames.indexOf(value)
          }
        } else {
          handTwoRanks[value] = 1
        }
      }
      if (handOneTrips > handTwoTrips) {
        return 'one'
      } else {
        return 'two'
      }
    }
    if (handOne.name === 'Two of a kind') {

    }
  }
  calculateOdds = () => {
    // const { playerOneCardA,
    //   playerOneCardB,
    //   playerTwoCardA,
    //   playerTwoCardB,
    //   flopOneCard,
    //   flopTwoCard,
    //   flopThreeCard,
    //   turnCard } = this.state
    // console.log((turnCard !== 'empty')
    //   ? [playerOneCardA,
    //     playerOneCardB,
    //     playerTwoCardA,
    //     playerTwoCardB,
    //     flopOneCard,
    //     flopTwoCard,
    //     flopThreeCard,
    //     turnCard]
    //   : ['Bink', playerOneCardA,
    //     playerOneCardB,
    //     playerTwoCardA,
    //     playerTwoCardB,
    //     flopOneCard,
    //     flopTwoCard,
    //     flopThreeCard,
    //   ])
    const PokerHand = require('poker-hand-evaluator');
    let playerOneWins = 0
    let playerTwoWins = 0
    let tie = 0
    const simulations = 800
    for (let i = 0; i < simulations; i++) {
      const game = this.state.game
      let remainingDeck = deck
      const cards = game.cardsInPlay()

      //Shuffle the deck
      for (let j = remainingDeck.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * j)
        const temp = remainingDeck[j]
        remainingDeck[j] = remainingDeck[k]
        remainingDeck[k] = temp
      }

      //Remove selected cards from deck
      remainingDeck = this.removeCards(deck, cards)

      //Shuffle deck again

      //If turn card (4th community card) is present
      if (game.turnCard !== 'empty') {
        const random = require('random')

        //Determine random index from deck array
        const randomCardIdx = random.int(0, (remainingDeck.length - 1))

        //Set card from above index as the river card (last card)
        const riverCard = remainingDeck[randomCardIdx]

        //Set the 7 card hard for player one
        const playerOnehand = [...game.playerOneCards(), ...game.communityCards(), riverCard]

        //Set the 7 card hard for player two
        const playerTwohand = [...game.playerTwoCards(), ...game.communityCards(), riverCard]

        //Determine the strongest possible 5 card hand for both players
        const playerOneCards = handEvaluator.parseString(playerOnehand)
        const playerOneEvaluator = this.bestFiveCards(playerOneCards)
        const playerTwoCards = handEvaluator.parseString(playerTwohand)
        const playerTwoEvaluator = this.bestFiveCards(playerTwoCards)
        // console.log(playerOneFiveCardHand)
        const playerOne = playerOneEvaluator.getScore()
        const playerTwo = playerTwoEvaluator.getScore()
        //Choose winner of the hand. Lower score means stronger hand.
        //Increment player's win count by 1
        if (playerOne > playerTwo) {
          playerOneWins += 1
        } else if (playerOne < playerTwo) {
          playerTwoWins += 1
        } else {
          tie += 1
        }

        // If turn and river are not selected (Only 3 flop cards selected)
      } else if (game.flopOneCard !== 'empty' && game.flopTwoCard !== 'empty' && game.flopThreeCard !== 'empty') {
        const random = require('random')
        //Select random index
        let randomCardIdx = random.int(0, (remainingDeck.length - 1))
        //Shuffle deck
        for (let j = remainingDeck.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * j)
          const temp = remainingDeck[j]
          remainingDeck[j] = remainingDeck[k]
          remainingDeck[k] = temp
        }

        //Determine the turn card
        const turn = remainingDeck[randomCardIdx]

        //Remove the turn card from the remaining deck
        remainingDeck = this.removeCards(remainingDeck, [turn])

        //Select new random index for the river card and instantiate it
        randomCardIdx = random.int(0, (remainingDeck.length - 1))
        const river = remainingDeck[randomCardIdx]

        //Remove river card
        remainingDeck = this.removeCards(remainingDeck, [river])
        //Set 7 card hand for player one
        const playerOnehand = [...game.playerOneCards(), ...game.communityCardsNoTurn(), turn, river]

        //Set 7 card hand for player two
        const playerTwohand = [...game.playerTwoCards(), ...game.communityCardsNoTurn(), turn, river]
        // console.log(playerOnehand, playerTwohand)
        //Determine strongest possible 5 card hand for each player

        const playerOneCards = handEvaluator.parseString(playerOnehand)
        const playerOneEvaluator = this.bestFiveCards(playerOneCards)
        const playerTwoCards = handEvaluator.parseString(playerTwohand)
        const playerTwoEvaluator = this.bestFiveCards(playerTwoCards)
        // console.log(playerOneFiveCardHand)
        const playerOne = playerOneEvaluator.getScore()
        const playerTwo = playerTwoEvaluator.getScore()
        //Choose winner of the hand. Lower score means stronger hand.
        //Increment player's win count by 1
        if (playerOne > playerTwo) {
          playerOneWins += 1
        } else if (playerOne < playerTwo) {
          playerTwoWins += 1
        } else {
          tie += 1
        }
      } else {
        const random = require('random')
        //Select random index
        let randomCardIdx = random.int(0, (remainingDeck.length - 1))
        //Shuffle deck
        for (let j = remainingDeck.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * j)
          const temp = remainingDeck[j]
          remainingDeck[j] = remainingDeck[k]
          remainingDeck[k] = temp
        }

        //Determine the turn card
        const flopOneCard = remainingDeck[randomCardIdx]

        //Remove the turn card from the remaining deck
        remainingDeck = this.removeCards(remainingDeck, [flopOneCard])

        //Select new random index for the river card and instantiate it
        randomCardIdx = random.int(0, (remainingDeck.length - 1))
        const flopTwoCard = remainingDeck[randomCardIdx]

        //Remove river card
        remainingDeck = this.removeCards(remainingDeck, [flopTwoCard])


        //Select new random index for the river card and instantiate it
        randomCardIdx = random.int(0, (remainingDeck.length - 1))
        const flopThreeCard = remainingDeck[randomCardIdx]

        //Remove river card
        remainingDeck = this.removeCards(remainingDeck, [flopThreeCard])

        //Select new random index for the river card and instantiate it
        randomCardIdx = random.int(0, (remainingDeck.length - 1))
        const turnCard = remainingDeck[randomCardIdx]

        //Remove river card
        remainingDeck = this.removeCards(remainingDeck, [turnCard])

        //Select new random index for the river card and instantiate it
        randomCardIdx = random.int(0, (remainingDeck.length - 1))
        const riverCard = remainingDeck[randomCardIdx]

        //Remove river card
        remainingDeck = this.removeCards(remainingDeck, [riverCard])
        //Set 7 card hand for player one
        const playerOnehand = [...game.playerOneCards(), flopOneCard, flopTwoCard, flopThreeCard, turnCard, riverCard]

        //Set 7 card hand for player two
        const playerTwohand = [...game.playerTwoCards(), flopOneCard, flopTwoCard, flopThreeCard, turnCard, riverCard]
        // console.log(playerOnehand, playerTwohand)
        //Determine strongest possible 5 card hand for each player

        const playerOneCards = handEvaluator.parseString(playerOnehand)
        const playerOneEvaluator = this.bestFiveCards(playerOneCards)
        const playerTwoCards = handEvaluator.parseString(playerTwohand)
        const playerTwoEvaluator = this.bestFiveCards(playerTwoCards)
        // console.log(playerOneFiveCardHand)
        const playerOne = playerOneEvaluator.getScore()
        const playerTwo = playerTwoEvaluator.getScore()
        //Choose winner of the hand. Lower score means stronger hand.
        //Increment player's win count by 1
        if (playerOne > playerTwo) {
          playerOneWins += 1
        } else if (playerOne < playerTwo) {
          playerTwoWins += 1
        } else {
          tie += 1
        }
      }
    }
    this.setState(() => ({
      playerOneWins: ((playerOneWins / simulations) * 100).toFixed(2),
      playerTwoWins: ((playerTwoWins / simulations) * 100).toFixed(2),
      tie: ((tie / simulations) * 100).toFixed(2)
    }))
  }
  render() {
    const { game, playerOneWins, playerTwoWins, tie } = this.state
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>

          <Header
            leftComponent={<Ionicons style={(Platform.OS === 'ios' || Platform.OS === 'android' ? {} : { paddingLeft: 25 })} name="md-arrow-round-back" size={30} color="#3498db" onPress={() => this.props.navigation.goBack(null)} />}
            centerComponent={{ text: 'Equitools', style: { color: '#3498db', fontSize: (Platform.OS === 'ios' || Platform.OS === 'android') ? 24 : 40, fontWeight: 'bold', } }}
            rightComponent={<Entypo style={(Platform.OS === 'ios' || Platform.OS === 'android' ? {} : { paddingRight: 25 })} name="hair-cross" size={30}
              color={'#3498db'} />}
            containerStyle={(Platform.OS === 'ios' || Platform.OS === 'android')
              ? {
                backgroundColor: 'black',
                justifyContent: 'space-around',
                borderBottomColor: 'silver',
                borderBottomWidth: '3',
              } : {
                backgroundColor: 'black',
                justifyContent: 'space-around',
                borderBottomColor: 'silver',
                borderBottomWidth: '3',
                height: 100,
                borderBottomWidth: 4
              }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <EquitoolPlayerCards updatePlayer={this.updatePlayerOneCards} player='one' />
            {playerOneWins &&
              <View style={{ justifyContent: 'center', alignItems: 'center', borderColor: '#3498db', borderWidth: 3, borderRadius: 8, height: 100, width: 250, marginTop: 20, backgroundColor: 'black' }}>
                <Text style={{ textAlign: 'center', color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Wins:</Text> {playerOneWins} %</Text>
                <Text style={{ textAlign: 'center', color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Ties:</Text> {tie} %</Text>
              </View>}
            {(game.playerOneCardA !== 'empty' && game.playerOneCardB !== 'empty' && game.playerTwoCardA !== 'empty' && game.playerTwoCardB !== 'empty')
              && <EquitoolCommunityCardSelector updateCommunity={this.updateCommunityCards} />}
            {playerTwoWins &&
              <View style={{ justifyContent: 'center', alignItems: 'center', borderColor: '#3498db', borderWidth: 3, borderRadius: 8, height: 100, width: 250, marginTop: 20, backgroundColor: 'black' }}>
                <Text style={{ textAlign: 'center', color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Wins:</Text> {playerTwoWins} %</Text>
                <Text style={{ textAlign: 'center', color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Ties:</Text> {tie} %</Text>
              </View>}
            <EquitoolPlayerCards updatePlayer={this.updatePlayerTwoCards} player='two' />

          </View>

        </View>
        <View style={{ flexDirection: 'column-reverse', justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
          <EquitoolCalculateButton state={this.state} calculateOdds={this.calculateOdds} />
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 10000
  },
  backgroundImage: {
    flex: 1,
  },
})
export default connect()(EquitoolMainMenu)
