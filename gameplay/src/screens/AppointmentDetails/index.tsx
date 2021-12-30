import { useRoute } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons";
import { FlatList, ImageBackground, Text, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

import BannerImg from '../../assets/banner.png';

import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { ListHeader } from "../../components/ListHeader";
import { Member } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Appointment } from "../../components/Appointment";

interface AppointmentDetailsProps {
  guildSelected: Appointment;
}

export function AppointmentDetails() {
  const route = useRoute();
  const { guildSelected } = route.params as AppointmentDetailsProps;

  const members = [
    {
      id: '1',
      username: 'Douglas',
      avatar_url: 'https://github.com/douglasmonteles.png',
      status: 'online',
    },

    {
      id: '2',
      username: 'Silva',
      avatar_url: 'https://github.com/douglasmonteles.png',
      status: 'offline',
    },
  ];

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

      <ListHeader 
        title="Jogadores"
        subtitle="Total 3"
      />

      <FlatList 
        data={members}
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

      <View style={styles.footer}>
        <ButtonIcon 
          title="Entrar na partida"
          activeOpacity={0.7}
        />
      </View>
    </Background>
  );
}