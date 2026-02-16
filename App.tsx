import React, { PureComponent } from 'react';
import { StyleSheet, StatusBar, View, Dimensions } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import Cube from './src/components/Cube';
import { Physics, PlayerControl } from './src/systems';
import { generateWorld } from './src/utils/worldGen';

const { width, height } = Dimensions.get("window");
const BLOCK_SIZE = 20;

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
    engine.gravity.y = 1;

    // Generate terrain
    const worldWidth = Math.ceil(width / BLOCK_SIZE);
    const worldHeight = Math.ceil(height / BLOCK_SIZE);
    const terrain = generateWorld(worldWidth, worldHeight);

    let entities: any = {
      physics: { engine: engine, world: world }
    };

    // Add terrain blocks to physics and entities
    terrain.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell.type !== 'air') {
          let color = '#777';
          if (cell.type === 'grass') color = '#4CAF50';
          if (cell.type === 'dirt') color = '#8B4513';
          if (cell.type === 'stone') color = '#808080';

          const blockX = x * BLOCK_SIZE + BLOCK_SIZE / 2;
          const blockY = y * BLOCK_SIZE + BLOCK_SIZE / 2;
          
          let body = Matter.Bodies.rectangle(blockX, blockY, BLOCK_SIZE, BLOCK_SIZE, { isStatic: true });
          Matter.World.add(world, [body]);

          entities[`block_${x}_${y}`] = {
            body: body,
            size: BLOCK_SIZE,
            color: color,
            renderer: Cube
          };
        }
      });
    });

    // Player
    let player = Matter.Bodies.rectangle(width / 2, 50, 25, 25, { friction: 0.1 });
    Matter.World.add(world, [player]);
    entities.player = { body: player, size: 25, color: '#E67E22', renderer: Cube };

    return entities;
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
    backgroundColor: '#87CEEB', // Sky blue
  },
  gameContainer: {
    flex: 1,
  }
});
