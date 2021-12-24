import { View } from "react-native";

import { styles } from './styles';

import { Profile } from "../../components/Profile";
import { ButtonAdd } from "../../components/ButtonAdd";

export function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd 
          activeOpacity={0.7}
        />
      </View>
    </View>
  );
}