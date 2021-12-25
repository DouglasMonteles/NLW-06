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

export function AppointmentDetails() {
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
            Lendários
          </Text>

          <Text style={styles.subtitle}>
            É hoje que vamos chegar ao challenger sem perder uma partida da md10
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
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.members}
      />
    </Background>
  );
}