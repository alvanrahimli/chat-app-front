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

function GroupComponent(props) {
  const onGroupPressHandler = (group) => {
    console.log("Group", group.ID, "clicked");
    props.nav.navigate("Messages", { group: group });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => onGroupPressHandler(props.group)}>
        <Text style={styles.group}>
          {props.group.Name} - {props.group.Privacy}
        </Text>
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

export default GroupComponent;
