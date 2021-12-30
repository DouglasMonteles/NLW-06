import { useState } from "react";
import { 
  KeyboardAvoidingView,  
  Platform, 
  ScrollView, 
  Text, 
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

import { Header } from "../../components/Header";
import { CategorySelect } from "../../components/CategorySelect";
import { GuildIcon } from "../../components/GuildIcon";
import { SmallInput } from "../../components/SmallInput";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { ModalView } from "../../components/ModalView";
import { Guilds } from "../Guilds";
import { Guild } from "../../components/Guild";

import { COLLECTION_APPOINTMENTS } from "../../configs/database";

export function AppointmentCreate() {
  const [ category, setCategory ] = useState('');
  const [ openGuildsModal, setOpenGuildsModal ] = useState(false);
  const [ guild, setGuild ] = useState<Guild>({} as Guild);

  const [ day, setDay ] = useState('');
  const [ month, setMonth ] = useState('');
  const [ hour, setHour ] = useState('');
  const [ minute, setMinute ] = useState('');
  const [ description, setDescription ] = useState('');

  const navigation = useNavigation<any>();

  function handleOpenGuilds() {
    setOpenGuildsModal(true);
  }

  function handleCloseModal() {
    setOpenGuildsModal(false);
  }

  function handleGuildSelect(guildSelected: Guild) {
    setGuild(guildSelected);
    handleOpenGuilds();
    setOpenGuildsModal(false);
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description,
    };

    const storedAppointment = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = (storedAppointment) ? JSON.parse(storedAppointment) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS, 
      JSON.stringify([...appointments, newAppointment])
    );

    navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={(Platform.OS === 'ios') ? 'position' : 'height'}
    > 
      <ScrollView>
        <Header 
          title="Agendar partida"
        />

        <Text style={[styles.label, { 
          marginLeft: 24, 
          marginTop: 36, 
          marginBottom: 18, }]
        }>
          Categoria
        </Text>

        <CategorySelect 
          categorySelected={category}
          setCategory={handleCategorySelect}
          hasCheckBox
        />

        <View style={styles.form}>
          <RectButton
            onPress={handleOpenGuilds}
          >
            <View style={styles.select}>
              {
                (guild.icon) 
                ? (
                  <GuildIcon 
                    guildId={guild.id} 
                    iconId={guild.icon} 
                  />
                )
                : (
                  <View 
                    style={styles.image}
                  /> 
                )
              }

              <View style={styles.selectBody}>
                <Text style={styles.label}>
                  {
                    (guild.name) 
                    ? guild.name 
                    : 'Selecione um servidor'
                  }
                </Text>
              </View>

              <Feather 
                name="chevron-right"
                color={theme.colors.heading}
                size={18}
              />
            </View>
          </RectButton>

          <View style={styles.field}>
            <View>
              <Text style={[
                styles.label,
                {
                  marginBottom: 12,
                }
              ]}>
                Dia e mês
              </Text>

              <View style={styles.column}>
                <SmallInput 
                  maxLength={2} 
                  onChangeText={setDay}
                />

                <Text style={styles.divider}>
                  /
                </Text>

                <SmallInput 
                  maxLength={2}
                  onChangeText={setMonth}
                />
              </View>
            </View>

            <View>
              <Text style={[
                styles.label,
                {
                  marginBottom: 12,
                }
              ]}>
                Hora e minuto
              </Text>

              <View style={styles.column}>
                <SmallInput 
                  maxLength={2}
                  onChangeText={setHour}
                />

                <Text style={styles.divider}>
                  :
                </Text>

                <SmallInput 
                  maxLength={2}
                  onChangeText={setMinute}
                />
              </View>
            </View>

          </View>

          <View style={[styles.field, { marginBottom: 12 }]}>
            <Text style={styles.label}>
              Descrição
            </Text>

            <Text style={styles.caracteresLimit}>
              Max. 100 caracteres
            </Text>
          </View>
          
          <TextArea 
            multiline
            maxLength={100}
            numberOfLines={5}
            autoCorrect={false}
            onChangeText={setDescription}
          />

          <View style={styles.footer}>
            <Button 
              title="Agendar"
              onPress={handleSave}
            />
          </View>
        </View>
      </ScrollView>
      
      <ModalView 
        visible={openGuildsModal}
        closeModal={handleCloseModal}
      >
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}