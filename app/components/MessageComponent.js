import React from "react";
import { View, StyleSheet, Text } from "react-native";

function MessageComponent() {
  return (
    <View>
      <Text style={styles.message}>
        lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum
        dolor sit amet. lorem ipsum dolor sit amet.{" "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    marginTop: 12,
    padding: 15,
    backgroundColor: "lime",
    fontSize: 16,
  },
});

export default MessageComponent;
