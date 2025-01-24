export const options = {
  headerShown: false,
};

import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";


export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text>Hello helo</Text>
      <TouchableOpacity style={styles.floatingButton} onPress={() => alert("Button Pressed!")}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  floatingButton: {
    width: 60,
    height: 60,
    backgroundColor: "#007bff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});