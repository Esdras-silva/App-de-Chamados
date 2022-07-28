
import { Box, Heading, HStack, Icon, IconButton, useTheme, VStack, Text, ScrollView, FormControl, WarningOutlineIcon} from 'native-base';

import { Buildings, CaretLeft, Envelope, Key, User } from 'phosphor-react-native';
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native'
import auth from '@react-native-firebase/auth'

import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { navigationRef } from '../routes/serve';
import { firebase } from '@react-native-firebase/firestore';


export function SignUp() {
  const [btnerr, setBtnerr] = useState(false);
  const [isleft, setIsLeft] = useState(false);
  const [isright, setIsRight] = useState(false);
  const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [usename, setUsename] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [password, setPassword] = useState('');
    

    const {colors} = useTheme();   
    const navigator = useNavigation();
    function handleSignUp(){
      if(!email || !password) return setBtnerr(true), setIsLeft(false) , setIsRight(false), setMessage('Informe Email e Senha');

      setIsLoading(true);

        auth().createUserWithEmailAndPassword(email, password)
        .then(response => {
          console.log(response)
          const uid = response.user.uid;

          const users = firebase.firestore().collection('users');

          users.doc(uid).set({
            email: email, name: usename , company: company, mode: 'user'
          })

          
          setIsLoading(false)

        })
        .catch(e =>{
          console.log(e);
          setIsLoading(false)
          switch (e.code) {
            case 'auth/email-already-in-use':
              return setIsLeft(true), setIsRight(false) ,setBtnerr(false), setMessage('O email já está em uso')
             
              case 'auth/weak-password':
                return setIsLeft(false), setIsRight(true) ,setBtnerr(false), setMessage('A senha precisa ter 6 caracteres')

                case 'auth/invalid-email':
                  return setIsLeft(true), setIsRight(false), setBtnerr(false), setMessage('Email Invalido')
            default:
              return setBtnerr(true), setIsLeft(false) , setIsRight(false) , setMessage('Não foi possível criar a Conta')
              break;
          }
        })
    }
  return (
  <VStack flex={1} alignItems={'center'} bg='gray.600' px={8} >
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.600"
      pb={6}
      pt={12}
      
      mt={12}
      mb={10}
    >
      <IconButton
        icon={<CaretLeft color={colors.gray[200]} size={24} />}
        onPress={()=> {navigationRef.goBack()}} 
        py={10}
      />

      <Heading color="gray.100" textAlign="center" fontSize="lg" flex={1} ml={-10} mt={5}>
        <Logo/>
      </Heading>
    </HStack>

   
   <ScrollView w={'full'}>
     <Input
        mb={4}
        placeholder="Nome de Usuario"
        InputLeftElement={<Icon as={<User color={colors.gray[300]} />} ml={4} />}
        onChangeText={setUsename}
      />

        <Input
        mb={4}
        placeholder="Nome da Empresa"
        InputLeftElement={<Icon as={<Buildings color={colors.gray[300]} />} ml={4} />}
        onChangeText={setCompany}
      />

    <FormControl isInvalid={isleft ? true : false} mb={4}>
    <Input
        
        placeholder="E-mail"
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
        onChangeText={setEmail}
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} ml={4} fontSize={'md'}>
              {message}
            </FormControl.ErrorMessage>
    </FormControl>

       <FormControl isInvalid={isright ? true : false} mb={8}>
        <Input
        
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>} ml={4} fontSize={'md'}>
        {message}
        </FormControl.ErrorMessage> 
      
      </FormControl>
     

     <FormControl isInvalid={btnerr? true: false}   mb={4}>
     <Button 
      title={"Criar conta" }
       w="full" 
       onPress={handleSignUp}
       isLoading={isLoading}
    
       />

       <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>} ml={4} fontSize={'md'}>
          {message}
       </FormControl.ErrorMessage>
     </FormControl>
   </ScrollView>

    
   </VStack>
  );
}