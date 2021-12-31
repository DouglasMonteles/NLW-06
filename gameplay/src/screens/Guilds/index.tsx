import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import { styles } from './styles';

import { Guild } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";
import { Load } from "../../components/Load";
import { api } from "../../services/api";

interface GuildsProps {
  handleGuildSelect: (guild: Guild) => void;
}

export function Guilds({ handleGuildSelect } : GuildsProps) {
  const [ guilds, setGuilds ] = useState<Guild[]>([]);
  const [ loading, setLoading ] = useState(true);

  async function fetchGuilds() {
    const response = await api.get('/users/@me/guilds');

    console.log(response.data)
    setGuilds(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <View style={styles.container}>
      {
        (loading)
        ? (
          <Load />
        )
        : (
          <FlatList 
            data={guilds}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Guild 
                data={item} 
                onPress={() => handleGuildSelect(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            ListHeaderComponent={() => <ListDivider isCentered />}
            contentContainerStyle={{ paddingBottom: 68, paddingTop: 104, }}
            style={styles.guilds}
          />
        )
      }
    </View>
  );
}