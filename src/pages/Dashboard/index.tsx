import React, { useCallback, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

import {
  Container,
  Header,
  HeaderTitle,
  Username,
  ProfileButton,
  UserAvatar,
} from './styles'

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()
  const { navigate } = useNavigation()

  useEffect(() => {
    api.get('materials').then((response) => {
      console.log(response.data)
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
    </Container>
  )
}

export default Dashboard
