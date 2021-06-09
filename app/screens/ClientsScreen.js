import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, FlatList, Button } from "react-native";
import ClientComponent from "../components/ClientComponent";
import { SocketContext } from "../services/SocketService";

export default function ClientsScreen({ navigation }) {
  const [clients, setClients] = useState([]);
  const groupId = navigation.getParam("groupId");
  const clientId = navigation.getParam("clientId");

  const getClients = (socket) => {
    socket.onmessage = (msg) => {
      console.log("Get Clients:", msg);
      let data = JSON.parse(msg.data);
      setClients(data.content);
    };

    socket.send(
      JSON.stringify({
        type: "get_clients",
        content: JSON.stringify({
          group_id: "",
        }),
      })
    );
  };

  const socket = useContext(SocketContext);

  const renderClient = ({ item }) => {
    console.log("rendering clients");

    console.log("Yessss", socket.readyState);
    return <ClientComponent client={item} socket={socket} groupId={groupId} />;
  };

  return (
    <View>
      <SocketContext.Consumer>
        {(value) => {
          return (
            <Button title={"Load Clients"} onPress={() => getClients(value)} />
          );
        }}
      </SocketContext.Consumer>
      <FlatList
        data={clients}
        renderItem={renderClient}
        keyExtractor={(item) => item.ID}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
