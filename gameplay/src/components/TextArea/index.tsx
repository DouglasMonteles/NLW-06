import { TextInput, TextInputProps } from "react-native";

import { styles } from "./styles";

interface TextAreaProps extends TextInputProps {}

export function TextArea({ ...rest } : TextAreaProps) {
  
  return (
    <TextInput 
      style={styles.container}
      {...rest}
    />
  );
}