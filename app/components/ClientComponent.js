import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react/cjs/react.development";

export default function ClientComponent(props) {
  const onClientPressHandler = (client) => {
    console.log("Client", client.ID, "clicked");

    console.log("Connection Status:", props.socket.readyState);

    props.socket.onmessage = (msg) => {
      console.log("Client Clicked:", msg);
      let data = JSON.parse(msg.data);
      console.log("RESPONSE:", data);
    };

    props.socket.send(
      JSON.stringify({
        type: "add_member",
        content: JSON.stringify({
          guest_id: props.client.ID,
          group_id: props.groupId,
        }),
      })
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={() => onClientPressHandler(props.client)}>
        <Text style={styles.group}>{props.client.Name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    margin: 12,
    padding: 15,
    backgroundColor: "#e2e2e2",
    fontSize: 20,
    borderRadius: 6,
    borderStyle: "dashed",
    borderWidth: 1,
  },
});
