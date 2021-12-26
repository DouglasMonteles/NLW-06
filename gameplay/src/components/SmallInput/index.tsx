import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

interface SmallInput extends TextInputProps {

}

export function SmallInput({ ...rest } : SmallInput) {
  return (
    <TextInput 
      style={styles.container}
      keyboardType="numeric"
      {...rest}
    />
  );
}