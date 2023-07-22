import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import FitnessCards from "../components/FitnessCards";
import colors from '../colors';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { FitnessItems } from "../Context";
import { Feather } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { minutes, calories, workout } = useContext(FitnessItems);
  const [isLightMode, setIsLightMode] = useState(false);

  const handleToggleMode = () => {
    setIsLightMode(!isLightMode);
  };

  const containerStyle = isLightMode
    ? { ...styles.container, backgroundColor: "#FFF5EE" }
    : { ...styles.container, backgroundColor: "black" };

  const textStyle = isLightMode
    ? { ...styles.title, color: "#CD853F" }
    : { ...styles.title, color: "#FFFAF0" };

  const iconColor = isLightMode ? colors.lightGray : "black";
  const iconName = isLightMode ? "sun" : "moon";

  return (
    <ScrollView style={containerStyle}>
      <View style={styles.background}>
        <Text style={textStyle}>Home Workout</Text>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{workout}</Text>
            <Text style={styles.statLabel}>WORKOUTS</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{calories}</Text>
            <Text style={styles.statLabel}>CALORIES</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{minutes}</Text>
            <Text style={styles.statLabel}>MINUTES</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/sample.jpg')} />
        </View>
        <FitnessCards />
        <TouchableOpacity
          onPress={handleToggleMode}
          style={styles.chatButton}
        >
          <Feather name={iconName} size={24} color={iconColor} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  background: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    color: "#CD853F",
    fontWeight: "bold",
    fontSize: 24,
  },
  statLabel: {
    color: "#A9A9A9",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 6,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 20,
  },
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
});

export default HomeScreen;