import { FontAwesome } from "@expo/vector-icons";

export function HomeTabBarIcon({ color }: { color: string }) {
  return (
    <FontAwesome
      size={30}
      style={{ marginBottom: -3 }}
      name="home"
      color={color}
    />
  );
}

export function TabTwoBarIcon({ color }: { color: string }) {
  return (
    <FontAwesome
      size={30}
      style={{ marginBottom: -3 }}
      name="clock-o"
      color={color}
    />
  );
}
