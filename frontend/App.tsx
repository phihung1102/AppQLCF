/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import RootNavigation from "./src/navigation";
import { AuthProvider } from "./src/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <RootNavigation/>
    </AuthProvider>
  )
}


export default App;
