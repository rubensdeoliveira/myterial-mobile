import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

import {
  Container,
  Header,
  HeaderTitle,
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

  useEffect(() => {
    api.get('materials/me').then((response) => {
      setMaterials(response.data)
    })
  }, [])

  const navigateToProfile = useCallback(() => {
    navigate('Profile')
  }, [navigate])

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

      <MaterialsList
        data={materials}
        keyExtractor={(material) => material.id}
        ListHeaderComponent={<MaterialsListTitle>Materiais</MaterialsListTitle>}
        renderItem={({ item: material }) => (
          <MaterialContainer
            onPress={() => {
              console.log('ihu')
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
