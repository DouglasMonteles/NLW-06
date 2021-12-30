import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons";
import { Alert, FlatList, ImageBackground, Text, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

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
  presence_count: number;
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

  useEffect(() => {
    fetchGuildInfo();
  }, []);

  return (
    <Background>
      <Header 
        title="Detalhes"
        action={
          <BorderlessButton
            onPress={() => {console.log('Share Button')}}
          >
            <Fontisto 
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
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

      <View style={styles.footer}>
        <ButtonIcon 
          title="Entrar na partida"
          activeOpacity={0.7}
        />
      </View>
    </Background>
  );
}