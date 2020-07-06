import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
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
class EquitoolMainMenu extends Component {
  state = {
    playerOneCardA: 'empty',
    playerOneCardB: 'empty',
    playerTwoCardA: 'empty',
    playerTwoCardB: 'empty',
    flopOneCard: 'empty',
    flopTwoCard: 'empty',
    flopThreeCard: 'empty',
    turnCard: 'empty',
    playerOneWins: null,
    playerTwoWins: null,
    tie: null
  }

  updatePlayerOneCards = (cardA, cardB) => {
    this.setState(() => ({
      playerOneCardA: cardA,
      playerOneCardB: cardB
    }))
  }
  updatePlayerTwoCards = (cardA, cardB) => {
    this.setState(() => ({
      playerTwoCardA: cardA,
      playerTwoCardB: cardB
    }))
  }
  updateCommunityCards = (flopOneCard, flopTwoCard, flopThreeCard, turnCard) => {
    this.setState(() => ({
      flopOneCard,
      flopTwoCard,
      flopThreeCard,
      turnCard,
    }))
  }
  componentDidUpdate = () => {
    const { dispatch } = this.props
    const { playerOneCardA, playerOneCardB, playerTwoCardA, playerTwoCardB, flopOneCard, flopTwoCard, flopThreeCard, turnCard } = this.state
    dispatch(saveEquitoolParameters(playerOneCardA, playerOneCardB, playerTwoCardA, playerTwoCardB, flopOneCard, flopTwoCard, flopThreeCard, turnCard))
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(saveEquitoolParameters('empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'))
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
    const simulations = 10000
    for (let i = 0; i < simulations; i++) {
      const { playerOneCardA,
        playerOneCardB,
        playerTwoCardA,
        playerTwoCardB,
        flopOneCard,
        flopTwoCard,
        flopThreeCard,
        turnCard } = this.state
      let remainingDeck = deck
      const cards = (turnCard !== 'empty')
        ? [playerOneCardA,
          playerOneCardB,
          playerTwoCardA,
          playerTwoCardB,
          flopOneCard,
          flopTwoCard,
          flopThreeCard,
          turnCard]
        : [playerOneCardA,
          playerOneCardB,
          playerTwoCardA,
          playerTwoCardB,
          flopOneCard,
          flopTwoCard,
          flopThreeCard,
        ]

      //Shuffle the deck
      for (let j = remainingDeck.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * j)
        const temp = remainingDeck[j]
        remainingDeck[j] = remainingDeck[k]
        remainingDeck[k] = temp
      }

      //Remove selected cards from deck
      remainingDeck = this.removeCards(deck, cards)
      console.log("Selected cards removed:", remainingDeck.length)

      //Shuffle deck again
      for (let j = remainingDeck.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * j)
        const temp = remainingDeck[j]
        remainingDeck[j] = remainingDeck[k]
        remainingDeck[k] = temp
      }

      //If turn card (4th community card) is present
      if (turnCard !== 'empty') {
        const random = require('random')

        //Determine random index from deck array
        const randomCardIdx = random.int(0, (remainingDeck.length - 1))

        //Shuffle deck
        for (let j = remainingDeck.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * j)
          const temp = remainingDeck[j]
          remainingDeck[j] = remainingDeck[k]
          remainingDeck[k] = temp
        }

        //Set card from above index as the river card (last card)
        const riverCard = remainingDeck[randomCardIdx]

        //Set the 7 card hard for player one
        const playerOnehand = [playerOneCardA,
          playerOneCardB,
          flopOneCard,
          flopTwoCard,
          flopThreeCard,
          turnCard,
          riverCard]

        //Set the 7 card hard for player two
        const playerTwohand = [playerTwoCardA,
          playerTwoCardB,
          flopOneCard,
          flopTwoCard,
          flopThreeCard,
          turnCard,
          riverCard]

        //Determine the strongest possible 5 card hand for both players
        const playerOneCards = handEvaluator.parseString(playerOnehand)
        const playerOneRank = handEvaluator.evaluate(playerOneCards)[0]
        const playerTwoCards = handEvaluator.parseString(playerTwohand)
        const playerTwoRank = handEvaluator.evaluate(playerTwoCards)[0]

        const playerOne = new PokerHand(playerOneRank.hand)
        const playerTwo = new PokerHand(playerTwoRank.hand)

        //Choose winner of the hand. Lower score means stronger hand.
        //Increment player's win count by 1
        if (playerOne.getScore() < playerTwo.getScore()) {
          playerOneWins += 1
        } else if (playerOne.getScore() > playerTwo.getScore()) {
          playerTwoWins += 1
        } else if (playerOne.getScore() === playerTwo.getScore()) {
          tie += 1
        }

        // If turn and river are not selected (Only 3 flop cards selected)
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
        const turn = remainingDeck[randomCardIdx]

        //Remove the turn card from the remaining deck
        remainingDeck = this.removeCards(remainingDeck, [turn])

        //Shuffle deck
        for (let j = remainingDeck.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * j)
          const temp = remainingDeck[j]
          remainingDeck[j] = remainingDeck[k]
          remainingDeck[k] = temp
        }

        //Select new random index for the river card and instantiate it
        randomCardIdx = random.int(0, (remainingDeck.length - 1))
        const river = remainingDeck[randomCardIdx]

        //Remove river card
        remainingDeck = this.removeCards(remainingDeck, [river])
        //Set 7 card hand for player one
        const playerOnehand = [playerOneCardA,
          playerOneCardB,
          flopOneCard,
          flopTwoCard,
          flopThreeCard,
          turn,
          river]

        //Set 7 card hand for player two
        const playerTwohand = [playerTwoCardA,
          playerTwoCardB,
          flopOneCard,
          flopTwoCard,
          flopThreeCard,
          turn,
          river]

        //Determine strongest possible 5 card hand for each player
        const playerOneCards = handEvaluator.parseString(playerOnehand)
        const playerOneRank = handEvaluator.evaluate(playerOneCards)[0]
        const playerTwoCards = handEvaluator.parseString(playerTwohand)
        const playerTwoRank = handEvaluator.evaluate(playerTwoCards)[0]

        const playerOne = new PokerHand(playerOneRank.hand)
        const playerTwo = new PokerHand(playerTwoRank.hand)
        //Choose winner of the hand. Lower score means stronger hand.
        //Increment player's win count by 1
        if (playerOne.getScore() < playerTwo.getScore()) {
          playerOneWins += 1
        } else if (playerOne.getScore() > playerTwo.getScore()) {
          playerTwoWins += 1
        } else if (playerOne.getScore() === playerTwo.getScore()) {
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
    const { playerOneCardA, playerOneCardB, playerTwoCardA, playerTwoCardB, playerOneWins, playerTwoWins, tie } = this.state
    return (
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
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', }}><Text style={{ fontWeight: 'bold' }}>Wins:</Text> {playerOneWins} %</Text>
              <Text style={{ textAlign: 'center' }}><Text style={{ fontWeight: 'bold' }}>Ties:</Text> {tie} %</Text>
            </View>}
          {(playerOneCardA !== 'empty' && playerOneCardB !== 'empty' && playerTwoCardA !== 'empty' && playerTwoCardB !== 'empty')
            && <EquitoolCommunityCardSelector updateCommunity={this.updateCommunityCards} />}
          {playerTwoWins &&
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', }}><Text style={{ fontWeight: 'bold' }}>Wins:</Text> {playerTwoWins} %</Text>
              <Text style={{ textAlign: 'center' }}><Text style={{ fontWeight: 'bold' }}>Ties:</Text> {tie} %</Text>
            </View>}
          <EquitoolPlayerCards updatePlayer={this.updatePlayerTwoCards} player='two' />

        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <EquitoolCalculateButton state={this.state} calculateOdds={this.calculateOdds} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  }
})
export default connect()(EquitoolMainMenu)
