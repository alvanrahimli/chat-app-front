import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import GroupComponent from "../components/GroupComponent";
import { SocketContext } from "../services/SocketService";

export default function GroupsScreen({ navigation }) {
  const userId = navigation.getParam("userId");

  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("Group");

  const groupNameChanged = (value) => {
    setNewGroupName(value);
  };

  const loadGroups = (socket) => {
    socket.onmessage = (msg) => {
      console.log("Load Groups:", msg);
      let data = JSON.parse(msg.data);
      if (data.type === "groups_list") {
        setGroups(data.content);
      } else {
        console.log("data.type is not groups_list");
      }
    };

    socket.send(
      JSON.stringify({
        type: "get_groups",
        content: JSON.stringify({
          client_id: userId,
        }),
      })
    );
  };

  const renderGroup = ({ item }) => {
    console.log(item);
    return <GroupComponent group={item} nav={navigation} />;
  };

  const createGroup = (socket) => {
    socket.onmessage = (msg) => {
      console.log("Create Group:", msg);
      let data = JSON.parse(msg.data);
      console.log("Parsed data: ", data);
    };

    socket.send(
      JSON.stringify({
        type: "create_group",
        content: JSON.stringify({
          name: newGroupName,
          privacy: "public",
        }),
      })
    );

    // loadGroups(socket);
  };

  return (
    <View style={styles.container}>
      <SocketContext.Consumer>
        {(value) => {
          return (
            <View>
              <View style={styles.newGroupView}>
                <TextInput
                  style={styles.groupNameInput}
                  placeholder={"Enter group name"}
                  onChangeText={(val) => groupNameChanged(val)}
                />
                <View style={styles.addGroupButton}>
                  <TouchableOpacity onPress={() => createGroup(value)}>
                    <Text style={{ fontSize: 40 }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Button title={"load"} onPress={() => loadGroups(value)} />
              <View style={styles.container}>
                <FlatList
                  style={styles.groupsList}
                  data={groups}
                  keyExtractor={(item) => item.ID}
                  renderItem={renderGroup}
                />
              </View>
            </View>
          );
        }}
      </SocketContext.Consumer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  newGroupView: {
    margin: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "flex-start",
    height: 50,
  },
  groupNameInput: {
    textAlign: "left",
    paddingLeft: 15,
    borderColor: "#111",
    color: "#444",
    borderWidth: 1,
    borderRadius: 12,
    height: "100%",
    width: "75%",
    borderStyle: "dashed",
  },
  addGroupButton: {
    marginLeft: 15,
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  groupsList: {
    width: "100%",
    margin: 15,
  },
});
