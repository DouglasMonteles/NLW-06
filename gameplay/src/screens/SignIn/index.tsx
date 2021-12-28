import { 
  Image, 
  Text, 
  View,
  ScrollView,
  Alert,
} from 'react-native';

import { styles } from './styles';

import IllustrationImg from '../../assets/illustration.png';

import { useAuth } from '../../hooks/auth';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';

export function SignIn() {
  const { user, signIn } = useAuth();

  async function handleSignIn() {
    try {
      await signIn();
    } catch (error) {
      console.log(error);
      Alert.alert(`${error}`);
    }
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