import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;
Location.setGoogleApiKey("AIzaSyAaA1obeZ7VuYSXkUn5MDYqruv9gAvTTHs");

export default function App() {
	const [locationOK, setLocationOK] = useState(true);
	const [city, setCity] = useState("Loading...");

	const askLocationPermission = async () => {
		try {
			const status = await Location.requestForegroundPermissionsAsync();
			if (!status.granted) {
				setLocationOK(false);
				console.log("승인거부");
			}
			setLocationOK(true);
			const coordinate = await Location.getCurrentPositionAsync({
				accuracy: 5,
			});
			const latitude = coordinate.coords.latitude;
			const longitude = coordinate.coords.longitude;
			const locationData = await Location.reverseGeocodeAsync(
				{
					latitude,
					longitude,
				},
				{ useGoogleMaps: false }
			);
			console.log(locationData[0].city);
			setCity(locationData[0].city);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		askLocationPermission();
	}, []);
	return (
		<View style={styles.container}>
			<View style={styles.city}>
				<Text style={styles.cityName}>{city}</Text>
			</View>
			<ScrollView
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.weather}
			>
				<View style={styles.day}>
					<Text style={styles.temp}>27º</Text>
					<Text style={styles.desc}>Sunny</Text>
				</View>
				<View style={styles.day}>
					<Text style={styles.temp}>27º</Text>
					<Text style={styles.desc}>Sunny</Text>
				</View>
				<View style={styles.day}>
					<Text style={styles.temp}>27º</Text>
					<Text style={styles.desc}>Sunny</Text>
				</View>
				<View style={styles.day}>
					<Text style={styles.temp}>27º</Text>
					<Text style={styles.desc}>Sunny</Text>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#FFD500" },
	city: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	cityName: { fontSize: 40, fontWeight: "600" },
	weather: { backgroundColor: "teal" },
	day: {
		width: ScreenWidth,
		alignItems: "center",
	},
	temp: { fontSize: 120, marginTop: 50 },
	desc: { fontSize: 50, marginTop: -20, position: "relative", left: -20 },
});
