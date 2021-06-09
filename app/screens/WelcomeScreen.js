import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SocketContext } from "../services/SocketService";

export default function WelcomeScreen({ navigation }) {
  const logoImage = {
    uri: "https://pluspng.com/img-png/chat-service-icon-512.png",
  };

  const [name, setName] = useState("User");
  const [nameEntered, setNameEntered] = useState(false);
  const nameChangedHandler = (val) => {
    if (val === "") {
      setName("User");
      setNameEntered(false);
    } else {
      setName(val);
      setNameEntered(true);
    }
  };

  const onLoginPressHandler = (socket) => {
    socket.onmessage = (msg) => {
      console.log(msg);
      let data = JSON.parse(msg.data);
      if (data.type === "registered") {
        navigation.navigate("Groups", { userId: data.content });
      } else {
        alert(`data.content: ${data.type}`);
      }
    };
    socket.send(JSON.stringify({ type: "register", content: name }));
  };

  return (
    <View style={styles.background}>
      <View style={styles.logoView}>
        <Image
          style={styles.logoImage}
          source={logoImage}
          width={512}
          height={512}
        />
        <Text style={styles.logoText}>Hi, {name}, let's chat!</Text>
      </View>
      <View style={styles.loginView}>
        <TextInput
          textAlign={"center"}
          style={styles.nameInput}
          placeholder={"Enter Name"}
          onChangeText={(val) => nameChangedHandler(val)}
        />

        <SocketContext.Consumer>
          {(value) => {
            return (
              <TouchableOpacity
                style={styles.loginTouchable}
                onPress={() => onLoginPressHandler(value)}
              >
                <Text style={styles.loginText}>Login!</Text>
              </TouchableOpacity>
            );
          }}
        </SocketContext.Consumer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  nameInput: {
    borderColor: "#111",
    color: "#444",
    borderWidth: 1,
    padding: 8,
    margin: 20,
    width: 200,
    borderRadius: 30,
    borderStyle: "dashed",
  },
  loginView: {
    marginTop: 50,
  },
  loginTouchable: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 30,
    height: 50,
  },
  loginText: {
    fontSize: 20,
    color: "#333",
  },
  logoView: {
    top: 40,
    alignItems: "center",
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: "stretch",
  },
  logoText: {
    fontSize: 30,
    color: "#444",
  },
});
