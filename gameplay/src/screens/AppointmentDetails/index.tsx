import { useEffect, useState } from "react";
import { 
  Alert, 
  FlatList, 
  ImageBackground, 
  Text, 
  View,
  Share,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import * as Linking from 'expo-linking';

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import { api } from "../../services/api";

import BannerImg from '../../assets/banner.png';

import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { ListHeader } from "../../components/ListHeader";
import { Member } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Appointment } from "../../components/Appointment";
import { Load } from "../../components/Load";

interface AppointmentDetailsProps {
  guildSelected: Appointment;
}

interface GuildWidget {
  id: string;
  name: string;
  instant_invite: string;
  members: Member[],
}

export function AppointmentDetails() {
  const route = useRoute();
  const { guildSelected } = route.params as AppointmentDetailsProps;

  const [ widget, setWidget ] = useState<GuildWidget>({} as GuildWidget);
  const [ loading, setLoading ] = useState(true);

  async function fetchGuildInfo() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
    } catch (error) {
      Alert.alert('Verifique as configurações do servidor no discord. Será que o Widget está habilitado?');
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {
    const message = Platform.OS === 'ios' 
      ? `Junte-se a ${guildSelected.guild.name}`
      : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite,
    });
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildInfo();
  }, []);

  return (
    <Background>
      <Header 
        title="Detalhes"
        action={
          (guildSelected.guild.owner) && (
            <BorderlessButton
              onPress={handleShareInvitation}
            >
              <Fontisto 
                name="share"
                size={24}
                color={theme.colors.primary}
              />
            </BorderlessButton>
          )
        }
      />

      <ImageBackground
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            {guildSelected.guild.name}
          </Text>

          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>

      {
        (loading)
        ? (
          <Load />
        )
        : (
          <>
            <ListHeader 
              title="Jogadores"
              subtitle={`Total ${widget.members.length}`}
            />

            <FlatList 
              data={widget.members}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Member 
                  key={item.id}
                  data={item}
                />
              )}
              ItemSeparatorComponent={() => <ListDivider isCentered />}
              style={styles.members}
            />
          </>
        )
      }

      {
        (guildSelected.guild.owner) && (
          <View style={styles.footer}>
            <ButtonIcon 
              title="Entrar na partida"
              activeOpacity={0.7}
              onPress={handleOpenGuild}
            />
          </View>
        )
      }
    </Background>
  );
}