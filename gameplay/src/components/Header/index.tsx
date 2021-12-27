import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { BorderlessButton } from "react-native-gesture-handler";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  title: string;
  action?: ReactNode;
}

export function Header({ title, action } : HeaderProps) {
  const navigation = useNavigation();
  const { secondary100, secondary40, heading } = theme.colors;

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <LinearGradient 
      colors={[secondary100, secondary40]}
      style={styles.container}
    >
      <BorderlessButton
        onPress={handleGoBack}
      >
        <Feather 
          name="arrow-left"
          size={24}
          color={heading}
        />
      </BorderlessButton>

      <Text style={styles.title}>
        {title}
      </Text>

      {
        action 
        ? <View>{action}</View>
        : <View style={{ width: 24, }}/>
      }
    </LinearGradient>
  );
}