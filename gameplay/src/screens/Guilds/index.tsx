import { FlatList, View } from "react-native";

import { styles } from './styles';

import { Guild } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";

interface GuildsProps {
  handleGuildSelect: (guild: Guild) => void;
}

export function Guilds({ handleGuildSelect } : GuildsProps) {
  const guils = [
    {
      id: '1',
      name: 'Lendários',
      icon: null,
      owner: true,
    },
    {
      id: '2',
      name: 'Lendários',
      icon: null,
      owner: true,
    },
    {
      id: '3',
      name: 'Lendários',
      icon: null,
      owner: true,
    },
    {
      id: '4',
      name: 'Lendários',
      icon: null,
      owner: true,
    },
    {
      id: '5',
      name: 'Lendários',
      icon: null,
      owner: true,
    },
    {
      id: '6',
      name: 'Lendários',
      icon: null,
      owner: true,
    },
    {
      id: '7',
      name: 'Lendários',
      icon: null,
      owner: true,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList 
        data={guils}
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
    </View>
  );
}