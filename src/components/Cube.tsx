import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

export default class Cube extends PureComponent<any> {
  render() {
    const size = this.props.size;
    const x = this.props.body.position.x - size / 2;
    const y = this.props.body.position.y - size / 2;
    
    return (
      <View
        style={[
          styles.cube,
          {
            left: x,
            top: y,
            width: size,
            height: size,
            backgroundColor: this.props.color || "red"
          }
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  cube: {
    position: "absolute",
    borderRadius: 2
  }
});
