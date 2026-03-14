import { SafeAreaView } from "react-native-safe-area-context"
import { MainScreen } from '@screens/main/ui';

const App = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainScreen />
        </SafeAreaView>
    )
}

export default App
