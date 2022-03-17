import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	Dimensions,
	ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;
const Weather_API_Key = "08534ac244fcfd168c6f362552431a93";
Location.setGoogleApiKey("AIzaSyAaA1obeZ7VuYSXkUn5MDYqruv9gAvTTHs");

export default function App() {
	const [locationOK, setLocationOK] = useState(true);
	const [city, setCity] = useState("Loading...");
	const [daily, setDaily] = useState([]);

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
			setCity(locationData[0].city);

			const getWeather = await fetch(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${Weather_API_Key}&units=metric`
			);
			const jsonWeather = await getWeather.json();
			setDaily(jsonWeather.daily);
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
				{daily.length === 0 ? (
					<View style={styles.day}>
						<ActivityIndicator
							size="large"
							color="white"
							style={styles.activity}
						/>
					</View>
				) : (
					daily.map((day, index) => {
						const unixTime = day.dt;
						const date = new Date(unixTime * 1000).getDate();
						let temp = day.temp.day;
						temp = parseFloat(temp).toFixed(1);
						return (
							<View key={index} style={styles.day}>
								<Text style={styles.temp}>{temp}º</Text>
								<Text style={styles.desc}>{day.weather[0].description}</Text>
								<Text style={styles.desc}>{date}日</Text>
							</View>
						);
					})
				)}
			</ScrollView>
			<View style={styles.footer}>
				<Text style={styles.footer_text}>CODE ME.,CO.LTD</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#FFD500" },
	city: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		borderColor: "black",
		borderBottomWidth: 2,
	},
	cityName: { fontSize: 60, fontWeight: "600" },
	weather: {},
	day: {
		width: ScreenWidth,
		alignItems: "center",
	},
	temp: { fontSize: 120, marginTop: 50 },
	desc: { fontSize: 40, marginTop: 10, position: "relative", left: -20 },
	activity: { marginTop: 100 },
	footer: {
		width: ScreenWidth,
		position: "absolute",
		bottom: 0,
		marginBottom: 10,
	},
	footer_text: { fontSize: 20, textAlign: "right" },
});
