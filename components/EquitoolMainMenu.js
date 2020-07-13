import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, ImageBackground, Dimensions, TouchableOpacity, Image } from 'react-native'
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

const backgroundImage = { uri: "https://i.imgur.com/qDG7eHT.jpg" };

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
  calculateOdds = () => {
    let playerOneWins = 0
    let playerTwoWins = 0
    let tie = 0
    const simulations = 500
    for (let i = 0; i < simulations; i++) {
      const game = this.state.game
      let remainingDeck = deck
      const cards = game.cardsInPlay()

      for (let j = remainingDeck.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * j)
        const temp = remainingDeck[j]
        remainingDeck[j] = remainingDeck[k]
        remainingDeck[k] = temp
      }

      remainingDeck = this.removeCards(deck, cards)

      if (game.turnCard !== 'empty') {
        const random = require('random')
        const randomCardIdx = random.int(0, (remainingDeck.length - 1))
        const riverCard = remainingDeck[randomCardIdx]

        const playerOnehand = [...game.playerOneCards(), ...game.communityCards(), riverCard]
        const playerTwohand = [...game.playerTwoCards(), ...game.communityCards(), riverCard]

        const playerOneCards = handEvaluator.parseString(playerOnehand)
        const playerOneEvaluator = this.bestFiveCards(playerOneCards)
        const playerTwoCards = handEvaluator.parseString(playerTwohand)
        const playerTwoEvaluator = this.bestFiveCards(playerTwoCards)
        const playerOne = playerOneEvaluator.getScore()
        const playerTwo = playerTwoEvaluator.getScore()
        if (playerOne > playerTwo) {
          playerOneWins += 1
        } else if (playerOne < playerTwo) {
          playerTwoWins += 1
        } else {
          tie += 1
        }

      } else if (game.flopOneCard !== 'empty' && game.flopTwoCard !== 'empty' && game.flopThreeCard !== 'empty') {
        const random = require('random')
        let randomCardIdx = random.int(0, (remainingDeck.length - 1))
        const turn = remainingDeck[randomCardIdx]
        remainingDeck = this.removeCards(remainingDeck, [turn])
        randomCardIdx = random.int(0, (remainingDeck.length - 1))
        const river = remainingDeck[randomCardIdx]
        remainingDeck = this.removeCards(remainingDeck, [river])

        const playerOnehand = [...game.playerOneCards(), ...game.communityCardsNoTurn(), turn, river]
        const playerTwohand = [...game.playerTwoCards(), ...game.communityCardsNoTurn(), turn, river]

        const playerOneCards = handEvaluator.parseString(playerOnehand)
        const playerOneEvaluator = this.bestFiveCards(playerOneCards)
        const playerTwoCards = handEvaluator.parseString(playerTwohand)
        const playerTwoEvaluator = this.bestFiveCards(playerTwoCards)
        const playerOne = playerOneEvaluator.getScore()
        const playerTwo = playerTwoEvaluator.getScore()

        if (playerOne > playerTwo) {
          playerOneWins += 1
        } else if (playerOne < playerTwo) {
          playerTwoWins += 1
        } else {
          tie += 1
        }
      } else {
        const random = require('random')
        let randomCardIdx = random.int(0, (remainingDeck.length - 1))
        const flopOneCard = remainingDeck[randomCardIdx]
        remainingDeck = this.removeCards(remainingDeck, [flopOneCard])
        randomCardIdx = random.int(0, (remainingDeck.length - 1))
        const flopTwoCard = remainingDeck[randomCardIdx]
        remainingDeck = this.removeCards(remainingDeck, [flopTwoCard])
        randomCardIdx = random.int(0, (remainingDeck.length - 1))
        const flopThreeCard = remainingDeck[randomCardIdx]
        remainingDeck = this.removeCards(remainingDeck, [flopThreeCard])
        randomCardIdx = random.int(0, (remainingDeck.length - 1))
        const turnCard = remainingDeck[randomCardIdx]
        remainingDeck = this.removeCards(remainingDeck, [turnCard])
        randomCardIdx = random.int(0, (remainingDeck.length - 1))
        const riverCard = remainingDeck[randomCardIdx]
        remainingDeck = this.removeCards(remainingDeck, [riverCard])

        const playerOnehand = [...game.playerOneCards(), flopOneCard, flopTwoCard, flopThreeCard, turnCard, riverCard]
        const playerTwohand = [...game.playerTwoCards(), flopOneCard, flopTwoCard, flopThreeCard, turnCard, riverCard]

        const playerOneCards = handEvaluator.parseString(playerOnehand)
        const playerOneEvaluator = this.bestFiveCards(playerOneCards)
        const playerTwoCards = handEvaluator.parseString(playerTwohand)
        const playerTwoEvaluator = this.bestFiveCards(playerTwoCards)
        const playerOne = playerOneEvaluator.getScore()
        const playerTwo = playerTwoEvaluator.getScore()

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
      tie: ((tie / simulations) * 100).toFixed(2),
    }))
  }
  render() {
    const { game, playerOneWins, playerTwoWins, tie } = this.state
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={Platform === 'web' ? styles.container : styles.containerIos}>
          <Header
            leftComponent={<TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
              <Image
                style={{ height: 20, width: 20 }}
                source={require('../assets/images/backBlue.png')}
              />
            </TouchableOpacity>}
            centerComponent={{ text: 'Equitools', style: { color: '#3498db', fontSize: (Platform.OS === 'ios' || Platform.OS === 'android') ? 24 : 40, fontWeight: 'bold', } }}
            rightComponent={<TouchableOpacity onPress={this.calculateOdds}>
              <Image
                style={{ height: 30, width: 30 }}
                source={require('../assets/images/calculate.png')}
              />
            </TouchableOpacity>}
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
            <View style={Platform.OS === 'ios' ? styles.playerHeaderOneIos : styles.playerHeaderWeb}>
              <Text style={Platform.OS === 'ios' ? { color: 'white', textAlign: 'center' } : { color: 'white', textAlign: 'center', fontSize: 25 }}>Player 1</Text>
            </View>
            <View style={Platform.OS === 'ios' ? styles.communityHeaderIos : styles.communityHeaderWeb}>
              <Text style={Platform.OS === 'ios' ? { color: 'white', textAlign: 'center' } : { color: 'white', textAlign: 'center', fontSize: 25 }}>Flop and Turn</Text>
            </View>
            <View style={Platform.OS === 'ios' ? styles.playerHeaderTwoIos : styles.playerHeaderWeb}>
              <Text style={Platform.OS === 'ios' ? { color: 'white', textAlign: 'center' } : { color: 'white', textAlign: 'center', fontSize: 25 }}>Player 2</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <EquitoolPlayerCards updatePlayer={this.updatePlayerOneCards} player='one' />
            {playerOneWins && Platform.OS === 'web' &&
              <View style={{ justifyContent: 'center', alignItems: 'center', borderColor: '#3498db', borderWidth: 3, borderRadius: 8, height: 100, width: 250, marginTop: 20, backgroundColor: 'black' }}>
                <Text style={{ textAlign: 'center', color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Wins:</Text> {playerOneWins} %</Text>
                <Text style={{ textAlign: 'center', color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Ties:</Text> {tie} %</Text>
              </View>}
            {(game.playerOneCardA !== 'empty' && game.playerOneCardB !== 'empty' && game.playerTwoCardA !== 'empty' && game.playerTwoCardB !== 'empty')
              && <View style={{ flexDirection: 'column' }}>
                <EquitoolCommunityCardSelector updateCommunity={this.updateCommunityCards} />
              </View>}
            {playerTwoWins && Platform.OS === 'web' &&
              <View style={{ justifyContent: 'center', alignItems: 'center', borderColor: '#3498db', borderWidth: 3, borderRadius: 8, height: 100, width: 250, marginTop: 20, backgroundColor: 'black' }}>
                <Text style={{ textAlign: 'center', color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Wins:</Text> {playerTwoWins} %</Text>
                <Text style={{ textAlign: 'center', color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Ties:</Text> {tie} %</Text>
              </View>}
            <EquitoolPlayerCards updatePlayer={this.updatePlayerTwoCards} player='two' />
          </View>
        </View>
        {Platform.OS === 'web'
          && <View style={{ flexDirection: 'column-reverse', justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
            <EquitoolCalculateButton state={this.state} calculateOdds={this.calculateOdds} />
          </View>}
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {playerOneWins && Platform.OS === 'ios' &&
            <View style={{ justifyContent: 'center', alignItems: 'center', borderColor: '#3498db', borderWidth: 3, borderRadius: 8, height: 100, width: 250, marginTop: 20, backgroundColor: 'black' }}>
              <Text style={{ textAlign: 'center', color: 'white' }}><Text style={{ fontWeight: 'bold', fontSize: 24 }}>Player 1</Text></Text>
              <Text style={{ textAlign: 'center', color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Wins:</Text> {playerOneWins} %</Text>
              <Text style={{ textAlign: 'center', color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Ties:</Text> {tie} %</Text>
            </View>}
          {playerTwoWins && Platform.OS === 'ios' &&
            <View style={{ marginBottom: 100, justifyContent: 'center', alignItems: 'center', borderColor: '#3498db', borderWidth: 3, borderRadius: 8, height: 100, width: 250, marginTop: 20, backgroundColor: 'black' }}>
              <Text style={{ textAlign: 'center', color: 'white' }}><Text style={{ fontWeight: 'bold', fontSize: 24 }}>Player 2</Text></Text>
              <Text style={{ textAlign: 'center', color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Wins:</Text> {playerTwoWins} %</Text>
              <Text style={{ textAlign: 'center', color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Ties:</Text> {tie} %</Text>
            </View>}
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
  containerIos: {
    flex: 1,
    width: Dimensions.get('window').width
  },
  backgroundImage: {
    flex: 1,
  },
  playerHeaderWeb: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    width: 250,
    height: 50,
    borderLeftWidth: 4,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'gray'
  },
  communityHeaderWeb: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    width: 400,
    height: 50,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'gray'
  },
  playerHeaderOneIos: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    width: 91,
    height: 25,
    borderRightColor: 'black',
    borderRightWidth: 4,
    borderLeftWidth: 4
  },
  playerHeaderTwoIos: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    width: 91,
    height: 25,
    borderLeftColor: 'black',
    borderRightWidth: 4,
    borderLeftWidth: 4
  },
  communityHeaderIos: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    width: 200,
    height: 25
  },
})
export default connect()(EquitoolMainMenu)
