import { useCallback, useState } from "react";
import { 
  View, 
  FlatList,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import { styles } from './styles';

import { Profile } from "../../components/Profile";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Appointment } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from "../../components/Background";
import { Load } from "../../components/Load";

import { COLLECTION_APPOINTMENTS } from "../../configs/database";

export function Home() {
  const navigation = useNavigation<any>();
  const [category, setCategory] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  function handleCategorySelected(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails() {
    navigation.navigate('AppointmentDetails');
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  async function loadAppointments() {
    const storedAppointments = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const collectionAppointments: Appointment[] = storedAppointments ? JSON.parse(storedAppointments) : [];

    if (category) {
      const filteredAppointments = collectionAppointments
        .filter(appointment => appointment.category === category);

      setAppointments(filteredAppointments);
    } else {
      setAppointments(collectionAppointments);
    }

    setLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadAppointments();
  }, [category]));

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Profile />
          
          <ButtonAdd 
            onPress={handleAppointmentCreate}
          />
        </View>

        <CategorySelect 
          categorySelected={category}
          setCategory={handleCategorySelected}
        />

        {
          loading
          ? (
            <Load />
          )
          : (
            <>
              <ListHeader 
                title="Partidas agendadas"
                subtitle="Total 6"
              />

              <FlatList 
                data={appointments}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <Appointment 
                    data={item}
                    onPress={handleAppointmentDetails}
                  />
                )}
                contentContainerStyle={{ paddingBottom: 69, }}
                ItemSeparatorComponent={() => <ListDivider />}
                style={styles.matches}
              />
            </>
          )
        }
      </View>
    </Background>
  );
}