import { useState } from 'react';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Logo from '../assets/logo_primary.svg';

import { Input } from '../components/Input';
import { Button } from '../components/Button';


function dataUser(data){
  return data
}

export function getdata(){
  
}

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreate, setIsCreate] = useState(false);
  const [userName, setUserName] = useState('');
  const [data, setData] = useState('');

  const { colors } = useTheme();
  const navigation = useNavigation();

  

  function handleSignIn() {
      if(isCreate){
        return setIsCreate(false)
      }else {
        if(!email || !password) return Alert.alert('Entrar', 'Informe o email e senha')

      setIsLoading(true);

      auth()
      .signInWithEmailAndPassword(email, password)
      .then( response => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e) 
        setIsLoading(false)
      
        if(e.code === 'auth/invalid-email') return Alert.alert('Entrar', 'E-mail ou Senha Invalido')
        if (e.code === 'auth/user-not-found') return Alert.alert('Entrar', 'Usuario não Cadastrado')
        if(e.code === 'auth/wrong-password') return Alert.alert('Entrar', 'E-mail ou Senha invalido')

        return Alert.alert('Entrar', 'Não foi possivel acessar')
      })
      }
        
  }

  function handleSignUp(){
    if(!isCreate){
      return setIsCreate(true)
    }else{
      
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response =>{
        console.log(response);
        dataUser(response.user.email)
      })
      .catch(e =>{
        console.log(e);
        setIsLoading(false);

        if(e.code === 'auth/invalid-email') return Alert.alert('Criar', 'E-mail Invalido')
        if (e.code === 'auth/weak-password') return Alert.alert('Criar', 'Senha Invalida')
        

        return Alert.alert('Entrar', 'Não foi possivel Criar')
      })
    }

  }

  

  

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        {isCreate ? "Crie" : "Acesse"} sua conta
      </Heading>

      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
        onChangeText={setEmail}
      />

      <Input
        mb={isCreate ? 4 : 8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      { isCreate ? 

          <Input
          mb={8}
          placeholder="Confirme a sua senha"
          InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
          secureTextEntry
          onChangeText={(i)=> {i === password ? setPassword(i) : setPassword('1')}}
          />
          : null
      }

      <Button 
      title={isCreate ? 'Criar conta' : "Login" }
       w="full" 
       onPress={isCreate ? handleSignUp : handleSignIn}
       isLoading={isLoading}
       mb={8}
       />

      <Button 
      title={isCreate ? "Login" : 'Criar conta'}
       w="full" 
      bg='gray.600'
      borderColor='gray.300'
      borderWidth={1}
       onPress={isCreate ? handleSignIn : handleSignUp}
       isLoading={isLoading}
       />
    </VStack>
  )
}

