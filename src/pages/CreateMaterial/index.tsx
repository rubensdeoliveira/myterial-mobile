import React, { useRef, useCallback } from 'react'
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Title, BackButton } from './styles'

interface CreateMaterialFormData {
  code: string
  name: string
  description: string
  manufacturer: string
  amount: number
  price: number
  unity: string
  note: string
}

const CreateMaterial: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const nameInputRef = useRef<TextInput>(null)
  const descriptionInputRef = useRef<TextInput>(null)
  const manufacturerInputRef = useRef<TextInput>(null)
  const amountInputRef = useRef<TextInput>(null)
  const priceInputRef = useRef<TextInput>(null)
  const unityInputRef = useRef<TextInput>(null)
  const noteInputRef = useRef<TextInput>(null)

  const handleCreateMaterial = useCallback(
    async (data: CreateMaterialFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          code: Yup.string(),
          name: Yup.string().required('Nome Obrigatório'),
          description: Yup.string(),
          manufacturer: Yup.string(),
          amount: Yup.number().required('Quantidade obrigatória'),
          price: Yup.number(),
          unity: Yup.string().required('Unidade obrigatória'),
          note: Yup.string(),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        console.log(data)

        await api.post('/materials', data)

        Alert.alert(
          'Material adicionado realizado com sucesso!',
          'O material foi adicionado a sua lista de materiais',
        )

        navigation.navigate('Dashboard')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        Alert.alert(
          'Erro ao adicionar material',
          'Ocorreu um erro ao adicionar o material, tente novamente.',
        )
      }
    },
    [navigation],
  )

  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>

            <View>
              <Title>Adicione um material</Title>
            </View>

            <Form ref={formRef} onSubmit={handleCreateMaterial}>
              <Input
                autoCapitalize="words"
                name="code"
                icon="code"
                placeholder="Código"
                returnKeyType="next"
                onSubmitEditing={() => {
                  nameInputRef.current?.focus()
                }}
              />
              <Input
                ref={nameInputRef}
                autoCapitalize="words"
                name="name"
                icon="box"
                placeholder="Nome do material"
                returnKeyType="next"
                onSubmitEditing={() => {
                  descriptionInputRef.current?.focus()
                }}
              />
              <Input
                ref={descriptionInputRef}
                autoCapitalize="words"
                name="description"
                icon="info"
                placeholder="Descrição"
                returnKeyType="next"
                onSubmitEditing={() => {
                  manufacturerInputRef.current?.focus()
                }}
              />
              <Input
                ref={manufacturerInputRef}
                autoCapitalize="words"
                name="manufacturer"
                icon="user"
                placeholder="Fabricante"
                returnKeyType="next"
                onSubmitEditing={() => {
                  amountInputRef.current?.focus()
                }}
              />
              <Input
                ref={amountInputRef}
                keyboardType="numbers-and-punctuation"
                autoCapitalize="words"
                name="amount"
                icon="bar-chart-2"
                placeholder="Quantidade"
                returnKeyType="next"
                onSubmitEditing={() => {
                  unityInputRef.current?.focus()
                }}
              />
              <Input
                ref={unityInputRef}
                autoCapitalize="words"
                name="unity"
                icon="layers"
                placeholder="Unidade"
                returnKeyType="next"
                onSubmitEditing={() => {
                  priceInputRef.current?.focus()
                }}
              />
              <Input
                ref={priceInputRef}
                keyboardType="numbers-and-punctuation"
                name="price"
                icon="dollar-sign"
                placeholder="último preço"
                returnKeyType="next"
                onSubmitEditing={() => {
                  noteInputRef.current?.focus()
                }}
              />
              <Input
                ref={noteInputRef}
                autoCapitalize="words"
                name="note"
                icon="bookmark"
                placeholder="Observação"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm()
                }}
              >
                Adicionar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default CreateMaterial
