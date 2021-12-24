import { Text, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import { styles } from './styles';
import { theme } from "../../global/styles/theme";

import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';

import { GuildIcon } from "../GuildIcon";
import { categories } from "../../utils/categories";

export interface Guild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
}

export interface Appointment {
  id: string;
  guild: Guild;
  category: string;
  date: string;
  description: string;
}

interface AppointmentProps extends RectButtonProps {
  data: Appointment;
}

export function Appointment({ data, ...rest } : AppointmentProps) {
  const [ category ] = categories.filter(category => category.id === data.category);
  const { owner } = data.guild;
  const { primary, on } = theme.colors;

  return (
    <RectButton 
      {...rest}
    >
      <View style={styles.container}>
        <GuildIcon />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {data.guild.name}
            </Text>

            <Text style={styles.category}>
              {category.title}
            </Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <CalendarSvg />

              <Text style={styles.date}>
                {data.date}
              </Text>
            </View>

            <View style={styles.playerInfo}>
              <PlayerSvg 
                fill={owner ? primary : on}
              />

              <Text style={[
                styles.player,
                { color: owner ? primary : on },
              ]}>
                {owner ? 'Anfitrião' : 'Visitante'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </RectButton>
  );
}