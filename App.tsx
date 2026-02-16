import React, { PureComponent } from 'react';
import { StyleSheet, StatusBar, View, Dimensions } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import Cube from './src/components/Cube';
import { Physics, PlayerControl } from './src/systems';

const { width, height } = Dimensions.get("window");

export default class App extends PureComponent {
  constructor(props: any) {
    super(props);
    this.state = {
      running: true
    };
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    let player = Matter.Bodies.rectangle(width / 2, height / 2, 30, 30);
    let floor = Matter.Bodies.rectangle(width / 2, height - 25, width, 50, { isStatic: true });

    Matter.World.add(world, [player, floor]);

    return {
      physics: { engine: engine, world: world },
      player: { body: player, size: 30, color: '#E67E22', renderer: Cube },
      floor: { body: floor, size: 50, color: '#222', renderer: Cube }
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          systems={[Physics, PlayerControl]}
          entities={this.setupWorld()}
          style={styles.gameContainer}
        >
          <StatusBar hidden={true} />
        </GameEngine>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  gameContainer: {
    flex: 1,
  }
});
