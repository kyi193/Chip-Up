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
  }
  calculateOdds = () => {
    let playerOneWins = 0
    let playerTwoWins = 0
    for (let i = 0; i < 100000; i++) {
      const { playerOneCardA,
        playerOneCardB,
        playerTwoCardA,
        playerTwoCardB,
        flopOneCard,
        flopTwoCard,
        flopThreeCard,
        turnCard } = this.state
      let remainingDeck
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
      remainingDeck = this.removeCards(deck, cards)
      for (let j = remainingDeck.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * j)
        const temp = remainingDeck[j]
        remainingDeck[j] = remainingDeck[k]
        remainingDeck[k] = temp
      }
      if (turnCard !== 'empty') {
        const random = require('random')
        const randomCardIdx = random.int(0, (remainingDeck.length - 1))
        for (let j = remainingDeck.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * j)
          const temp = remainingDeck[j]
          remainingDeck[j] = remainingDeck[k]
          remainingDeck[k] = temp
        }
        const riverCard = remainingDeck[randomCardIdx]
        const playerOnehand = [playerOneCardA,
          playerOneCardB,
          flopOneCard,
          flopTwoCard,
          flopThreeCard,
          turnCard,
          riverCard]
        const playerTwohand = [playerTwoCardA,
          playerTwoCardB,
          flopOneCard,
          flopTwoCard,
          flopThreeCard,
          turnCard,
          riverCard]
        const playerOneCards = handEvaluator.parseString(playerOnehand)
        const playerOneRank = handEvaluator.evaluate(playerOneCards)[0]
        const playerTwoCards = handEvaluator.parseString(playerTwohand)
        const playerTwoRank = handEvaluator.evaluate(playerTwoCards)[0]

        if (playerOneRank.score < playerTwoRank.score) {
          playerOneWins += 1
        } else if (playerOneRank.score > playerTwoRank.score) {
          console.log(playerOneRank, playerTwoRank)
          playerTwoWins += 1
        } else if (playerOneRank.score === playerTwoRank.score) {
          if (this.evaluateTie(playerOneRank, playerTwoRank) === 'one') {
            playerOneWins += 1
          } else {
            playerTwoWins += 1
          }
        }

      } else {
        const random = require('random')
        const randomCardIdx = random.int(0, (remainingDeck.length - 1))
        for (let j = remainingDeck.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * j)
          const temp = remainingDeck[j]
          remainingDeck[j] = remainingDeck[k]
          remainingDeck[k] = temp
        }
        const turn = remainingDeck[randomCardIdx]
        remainingDeck = this.removeCards(remainingDeck, [turn])
        for (let j = remainingDeck.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * j)
          const temp = remainingDeck[j]
          remainingDeck[j] = remainingDeck[k]
          remainingDeck[k] = temp
        }
        const river = remainingDeck[randomCardIdx]
        remainingDeck = this.removeCards(remainingDeck, [river])
        const playerOnehand = [playerOneCardA,
          playerOneCardB,
          flopOneCard,
          flopTwoCard,
          flopThreeCard,
          turn,
          river]
        const playerTwohand = [playerTwoCardA,
          playerTwoCardB,
          flopOneCard,
          flopTwoCard,
          flopThreeCard,
          turn,
          river]
        const playerOneCards = handEvaluator.parseString(playerOnehand)
        const playerOneRank = handEvaluator.evaluate(playerOneCards)[0]
        const playerTwoCards = handEvaluator.parseString(playerTwohand)
        const playerTwoRank = handEvaluator.evaluate(playerTwoCards)[0]

        if (playerOneRank.score < playerTwoRank.score) {
          playerOneWins += 1
        } else if (playerOneRank.score > playerTwoRank.score) {
          console.log(playerOneRank, playerTwoRank)
          playerTwoWins += 1
        } else if (playerOneRank.score === playerTwoRank.score) {
          if (this.evaluateTie(playerOneRank, playerTwoRank) === 'one') {
            playerOneWins += 1
          } else {
            playerTwoWins += 1
          }
        }
      }
    }
    console.log(playerOneWins, playerTwoWins)
  }
  render() {
    const { playerOneCardA, playerOneCardB, playerTwoCardA, playerTwoCardB } = this.state
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
          {(playerOneCardA !== 'empty' && playerOneCardB !== 'empty' && playerTwoCardA !== 'empty' && playerTwoCardB !== 'empty')
            && <EquitoolCommunityCardSelector updateCommunity={this.updateCommunityCards} />}
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
