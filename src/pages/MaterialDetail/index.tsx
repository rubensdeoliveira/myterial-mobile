import React, { useRef, useCallback, useState, useEffect } from 'react'
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Alert,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import Icon from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-picker'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

import Input from '../../components/Input'

import {
  Container,
  Title,
  UserAvatarButton,
  UserAvatar,
  BackButton,
} from './styles'

interface MaterialData {
  code: string
  name: string
  description: string
  manufacturer: string
  amount: number
  price: number
  unity: string
  note: string
  photo_url: string
}

interface RouteParams {
  materialId: string
}

const MaterialDetail: React.FC = () => {
  const route = useRoute()

  const routeParams = route.params as RouteParams

  const { user, updateUser } = useAuth()
  const [selectedMaterial] = useState(routeParams.materialId)
  const [material, setMaterial] = useState({} as MaterialData)

  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  useEffect(() => {
    api.get(`materials/me/${selectedMaterial}`).then((response) => {
      setMaterial(response.data)
    })
  }, [selectedMaterial])

  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      (response) => {
        if (response.didCancel) {
          return
        }
        if (response.error) {
          Alert.alert('Erro ao atualizar seu avatar.')
          return
        }

        const data = new FormData()

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        })

        api.patch('users/avatar', data).then((apiResponse) => {
          updateUser(apiResponse.data)
        })
      },
    )
  }, [updateUser, user.id])

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

            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{ uri: material.photo_url }} />
            </UserAvatarButton>

            <View>
              <Title>{material.name}</Title>
            </View>

            <Form initialData={material} ref={formRef} onSubmit={() => {}}>
              <Input
                editable={false}
                autoCapitalize="words"
                name="code"
                icon="code"
                placeholder="Código"
              />
              <Input
                editable={false}
                autoCapitalize="words"
                name="name"
                icon="box"
                placeholder="Nome do material"
              />
              <Input
                editable={false}
                autoCapitalize="words"
                name="description"
                icon="info"
                placeholder="Descrição"
              />
              <Input
                editable={false}
                autoCapitalize="words"
                name="manufacturer"
                icon="user"
                placeholder="Fabricante"
              />
              <Input
                editable={false}
                keyboardType="numbers-and-punctuation"
                autoCapitalize="words"
                name="amount"
                icon="bar-chart-2"
                placeholder="Quantidade"
              />
              <Input
                editable={false}
                autoCapitalize="words"
                name="unity"
                icon="layers"
                placeholder="Unidade"
              />
              <Input
                editable={false}
                keyboardType="numbers-and-punctuation"
                name="price"
                icon="dollar-sign"
                placeholder="último preço"
              />
              <Input
                editable={false}
                autoCapitalize="words"
                name="note"
                icon="bookmark"
                placeholder="Observação"
              />
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default MaterialDetail
