import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack options={{ headerShown: false }} >
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
