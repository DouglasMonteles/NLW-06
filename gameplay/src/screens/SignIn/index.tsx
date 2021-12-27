import { useContext } from 'react';
import { 
  Image, 
  Text, 
  View,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import IllustrationImg from '../../assets/illustration.png';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';
import { AuthContext } from '../../context/auth';

export function SignIn() {
  const navigation = useNavigation<any>();
  const context = useContext(AuthContext);

  console.log(context)

  function handleSignIn() {
    navigation.navigate('Home');
  }

  return (
    <Background>
      <ScrollView>
        <View style={styles.container}>
          <Image 
            source={IllustrationImg}
            style={styles.image}
            resizeMode='stretch'
          />

          <View style={styles.content}>
            <Text style={styles.title}>
              Conecte-se {'\n'}
              e organize suas {'\n'}
              jogatinas
            </Text>

            <Text style={styles.subtitle}>
              Crie grupos para jogar seus games {'\n'}
              favoritos com seus amigos
            </Text>
        
            <ButtonIcon 
              title="Entrar com Discord"
              activeOpacity={0.7}
              onPress={handleSignIn}
            />
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}