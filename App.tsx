import { useState } from "react"
import { ColorValue, Text, View } from "react-native"

const App = () => {

  const [col, setCol] = useState<boolean>(false)

  return(
    <View style={{flex:1, backgroundColor:col?"white":"yellow", alignItems:"center", justifyContent:"center"}} onTouchStart={() => setCol(cCol => !cCol)}>
    </View>
  )
}

export default App