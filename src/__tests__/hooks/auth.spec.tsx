import { renderHook, act } from '@testing-library/react-hooks'
import MockAdapter from 'axios-mock-adapter'
import AsyncStorage from '@react-native-community/async-storage'
import { useAuth, AuthProvider } from '../../hooks/auth'
import api from '../../services/api'

const apiMock = new MockAdapter(api)

describe('Auth Hook', () => {
  it('should be able to sign in', async () => {
    apiMock.onPost('sessions').reply(200, {
      user: {
        id: 'user-123',
        name: 'Guilherme Oliveira',
        email: 'guilhermeoliveira@gmail.com',
      },
      token: 'token-123',
    })

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    result.current.signIn({
      email: 'guilhermeoliveira@gmail.com',
      password: '12345678',
    })

    await waitForNextUpdate()

    expect(result.current.user.email).toEqual('guilhermeoliveira@gmail.com')
  })
})
