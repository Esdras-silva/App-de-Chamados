import React, { useEffect, useState } from 'react';
import { VStack, Heading, Icon, useTheme, FormControl, WarningOutlineIcon, IFormControlProps, ScrollView, HStack, IconButton } from 'native-base';
import { Buildings, CaretLeft, Envelope, Key, User } from 'phosphor-react-native';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore, { firebase } from '@react-native-firebase/firestore'

import Logo from '../assets/logo_primary.svg';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { SignUp } from './SignUp';
import { navigate } from '../routes/serve';



// App.js






export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isleft, setIsLeft] = useState(false);

  const [isInvalid, setIsInvalid] = useState(false);
  const [message, setMessage] = useState('');

  const { colors } = useTheme();
  const navigation = useNavigation();

  

  

  function handleSignIn() {
      
        if(!email || !password) return setIsLeft(true) , setIsInvalid(true), setMessage('Informe Email e Senha');

      setIsLoading(true);

      auth()
      .signInWithEmailAndPassword(email, password)
      .then( response => {
        console.log(response);
        setIsInvalid(false)
  
      })
      .catch((e) => {
        console.log(e) 
        setIsLoading(false)
      
        switch (e.code) {
          case 'auth/wrong-password':
            return setIsLeft(true),setIsInvalid(false), setMessage('Senha invalida')
            
            case 'auth/user-not-found':
              return setIsInvalid(true),setIsLeft(false), setMessage('Usuario não encontrado')
          default:
            break;
        }
      })
      

      

        
  }

 

  

  

  return (
  <>
 <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acessar sua conta
      </Heading>

      <FormControl  isInvalid={isInvalid ? true : false} mb={4}>
      <Input
        
        placeholder="E-mail"
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
        onChangeText={setEmail}
      />

<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} ml={4}>
              {message}
            </FormControl.ErrorMessage>
      </FormControl>

      
      <FormControl  isInvalid={ isleft ? true : false} mb={4}>
      <Input
  
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} ml={4}>
              {message}
            </FormControl.ErrorMessage>

      </FormControl>
      

     

      <Button 
      title={"Login" }
       w="full" 
       onPress={handleSignIn}
       isLoading={isLoading}
       mb={4}
       />

      <Button 
      title={'Cadastrar-se'}
       w="full" 
      bg='gray.600'
      borderColor='gray.300'
      borderWidth={1}
       onPress={() => navigate('signup',{})}
       
       />

    </VStack>
  </>  
  )
}

