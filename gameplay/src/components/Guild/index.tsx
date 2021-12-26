import { 
  Text, 
  TouchableOpacity, 
  TouchableOpacityProps, 
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

import { GuildIcon } from "../GuildIcon";

export interface Guild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
}

interface GuildProps extends TouchableOpacityProps {
  data: Guild;
}

export function Guild({ data, ...rest } : GuildProps) {

  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.7}
      {...rest}
    >
      <GuildIcon />

      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            {data.name}
          </Text>

          <Text style={styles.type}>
            { (data.owner) ? 'Administrador' : 'Convidado ' }
          </Text>
        </View>
      </View>

      <Feather 
        name="chevron-right"
        color={theme.colors.heading}
        size={24}
      />
    </TouchableOpacity>
  );
}