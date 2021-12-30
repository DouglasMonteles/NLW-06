import { 
  Image, 
  View,
} from "react-native";

import DiscordSvg from '../../assets/discord.svg';

import { styles } from "./styles";

const { CDN_IMAGE } = process.env;

interface GuildIcon {
  guildId: string;
  iconId: string | null;
}

export function GuildIcon({ guildId, iconId } : GuildIcon) {
  const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;

  return (
    <View style={styles.container}>
      {
        (iconId)
        ? (
          <Image 
            source={{ uri }}
            style={styles.image}
            resizeMode="cover"
          />
        )
        : (
          <DiscordSvg 
            width={40}
            height={44}
          />
        )
      }
    </View>
  );
}