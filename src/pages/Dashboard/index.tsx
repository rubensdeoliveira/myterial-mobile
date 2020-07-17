import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

import {
  Container,
  Header,
  HeaderTitle,
  ButtonContainer,
  Username,
  ProfileButton,
  UserAvatar,
  MaterialsListTitle,
  MaterialsList,
  MaterialContainer,
  MaterialAvatar,
  MaterialInfo,
  MaterialName,
  MaterialMeta,
  MaterialMetaText,
} from './styles'
import Button from '../../components/Button'

export interface Material {
  id: string
  name: string
  description: string
  amount: string
  photo_url: string
}

const Dashboard: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([])

  const { signOut, user } = useAuth()
  const { navigate } = useNavigation()

  // useEffect(() => {
  //   api.get('materials/me').then((response) => {
  //     setMaterials(response.data)
  //   })
  // }, [])

  useFocusEffect(
    useCallback(() => {
      api.get('materials/me').then((response) => {
        setMaterials(response.data)
      })
    }, []),
  )

  const navigateToProfile = useCallback(() => {
    navigate('Profile')
  }, [navigate])

  const navigateToCreateMaterial = useCallback(() => {
    navigate('CreateMaterial')
  }, [navigate])

  const navigateToMaterialDetail = useCallback(
    (materialId: string) => {
      navigate('MaterialDetail', { materialId })
    },
    [navigate],
  )

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <Username>{user.name}</Username>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <ButtonContainer>
        <Button onPress={navigateToCreateMaterial}>Adicionar material</Button>
      </ButtonContainer>

      <MaterialsList
        data={materials}
        keyExtractor={(material) => material.id}
        ListHeaderComponent={<MaterialsListTitle>Materiais</MaterialsListTitle>}
        renderItem={({ item: material }) => (
          <MaterialContainer
            onPress={() => {
              navigateToMaterialDetail(material.id)
            }}
          >
            <MaterialAvatar source={{ uri: material.photo_url }} />

            <MaterialInfo>
              <MaterialName>{material.name}</MaterialName>

              <MaterialMeta>
                <Icon name="info" size={14} color="#FF9000" />
                <MaterialMetaText>{material.description}</MaterialMetaText>
              </MaterialMeta>

              <MaterialMeta>
                <Icon name="bar-chart-2" size={14} color="#FF9000" />
                <MaterialMetaText>{material.amount}</MaterialMetaText>
              </MaterialMeta>
            </MaterialInfo>
          </MaterialContainer>
        )}
      />
    </Container>
  )
}

export default Dashboard
