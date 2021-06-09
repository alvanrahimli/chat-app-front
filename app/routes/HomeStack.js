import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import WelcomeScreen from "../screens/WelcomeScreen";
import GroupsScreen from "../screens/GroupsScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ClientsScreen from "../screens/ClientsScreen";

const screens = {
  Welcome: {
    screen: WelcomeScreen,
  },
  Groups: {
    screen: GroupsScreen,
  },
  Messages: {
    screen: MessagesScreen,
  },
  Clients: {
    screen: ClientsScreen,
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#333",
  },
});

export default createAppContainer(HomeStack);
