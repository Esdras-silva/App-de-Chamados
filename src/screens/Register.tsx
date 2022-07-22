import { Alert } from 'react-native';
import { VStack } from 'native-base';
import fireStore, { firebase } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useState } from 'react';

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');
  

  const navigation = useNavigation();

  function handleNewOrderRegister(){
    if(!patrimony || !description) return Alert.alert('Registrar', 'Preencha todos os campos.')

    const user: FirebaseAuthTypes.User =firebase.auth().currentUser;
   const email = user.email

    setIsLoading(true);

    fireStore()
    .collection('orders')
    .add({
      patrimony,
      description,
      status: 'open' ,
      created_at: fireStore.FieldValue.serverTimestamp(),
      email
    })
    .then(() =>{
      Alert.alert("Solicitação","Solicitação registrada com sucesso!" )
      navigation.goBack();
    })
    .catch( e =>{
      console.log(e);
      setIsLoading(false);
      return Alert.alert("Solicitação","Não foi possivel registrar o pedido" )

    })

  }


  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Solicitação" />

      <Input
        placeholder="Número do patrimônio"
        mt={4}
        onChangeText={setPatrimony}
      />

      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />

      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}