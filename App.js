import { StyleSheet, View, Text } from "react-native";

export default function App() {
	return (
		<View style={styles.container}>
			<View style={styles.city}>
				<Text style={styles.cityName}>Seoul</Text>
			</View>
			<View style={styles.weather}>
				<View style={styles.day}>
					<Text style={styles.temp}>27º</Text>
					<Text style={styles.desc}>Sunny</Text>
				</View>
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
	},
	cityName: { fontSize: 58, fontWeight: "600" },
	weather: { flex: 3, backgroundColor: "teal" },
	day: {
		flex: 1,
		alignItems: "center",
	},
	temp: { fontSize: 120, marginTop: 50 },
	desc: { fontSize: 50, marginTop: -20, position: "relative", left: -20 },
});
