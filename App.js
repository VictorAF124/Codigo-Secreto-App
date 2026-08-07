import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CodigoSecreto from './components/CodigoSecreto';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <CodigoSecreto />
    </SafeAreaProvider>
  );
}
