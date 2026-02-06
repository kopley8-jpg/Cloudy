import { useState } from "react"
import { ColorValue, StatusBar, StatusBarStyle, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MainScreen } from "./src/pages/MainScreen/ManiScreen"

const App = () => {


  return(
    <SafeAreaView style={{flex:1}} >
      <MainScreen/>
    </SafeAreaView>
  )
}

export default App