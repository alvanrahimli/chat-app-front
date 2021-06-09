import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SocketContext } from "../services/SocketService";

export default function MessagesScreen({ navigation }) {
  const group = navigation.getParam("group");
  const [messages, setMessages] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  let newMsg = "";

  const onAddMembersPress = () => {
    navigation.navigate("Clients", {
      clientId: navigation.getParam("userId"),
      groupId: group.ID,
    });
  };

  const socket = useContext(SocketContext);
  useEffect(() => {
    console.log("use effect() called");
    setUpSocket(socket);
  }, []);

  const setUpSocket = (localSocket) => {
    console.log("Start messaging clicked");

    localSocket.onmessage = (msg) => {
      console.log("On Message:", msg);
      let newData = JSON.parse(msg["data"]);
      console.log("New Data:", newData);
      console.log("newData['type']:", newData["type"]);

      if (newData["type"] == "new_message") {
        // alert("got a message!");
        let message = newData["content"];
        console.log("New Message:", message);
        setSelectedId(message["ID"]);

        messages.push(message);
        setMessages(messages);
      } else if (newData["type"] == "member_added") {
        let newMemberEvent = newData["content"];
        alert(`New member ${newMemberEvent.split(":")[1]} joined!`);
      } else {
        console.log("Could not handle response:", newData["type"]);
      }
    };
  };

  const sendMessage = () => {
    socket.send(
      JSON.stringify({
        type: "new_message",
        content: JSON.stringify({
          group_id: group.ID,
          header: "test_header",
          content: newMsg,
        }),
      })
    );
  };

  const renderMessage = ({ item }) => {
    console.log("rendering:", item["Content"]);
    return (
      <TouchableOpacity onPress={() => setSelectedId(item["ID"])}>
        <Text style={styles.message}>
          {item["Sender"]}: {item["Content"]}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.controlPart}>
        <View style={styles.header}>
          <Text style={styles.groupName}>
            {group.Name} ({group.Privacy})
          </Text>
          <Button title={"Add members"} onPress={onAddMembersPress} />
          <SocketContext.Consumer>
            {(value) => {
              return (
                <Button
                  title={"Start messaging"}
                  onPress={() => setUpSocket(value)}
                />
              );
            }}
          </SocketContext.Consumer>
        </View>
      </View>
      <View style={styles.messagesPart}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.ID}
          renderItem={renderMessage}
          extraData={selectedId}
          style={styles.messagesList}
        />
        <View>
          <TextInput
            placeholder="Enter message..."
            onChangeText={(val) => (newMsg = val)}
            style={styles.newMsgInput}
          />
        </View>
        <Button title={"-= send message =-"} onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    flexDirection: "column-reverse",
    flex: 1,
  },
  controlPart: {
    top: 1,
    width: "100%",
    position: "absolute",
    // alignSelf: "flex-start",
  },
  messagesPart: {
    width: "100%",
    // flex: 1,
  },
  messagesList: {
    // position: "absolute",
    // alignSelf: "flex-end",
    width: "100%",
    marginBottom: 20,
  },
  message: {
    padding: 5,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 6,
  },
  header: {
    // flex: 1,
  },
  groupName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  clientsButton: {
    marginTop: 55,
    marginBottom: 50,
  },
  newMsgInput: {
    marginTop: 10,
    fontSize: 18,
    borderBottomWidth: 1,
  },
});
