import React from 'react'
import { render, fireEvent, waitFor } from 'react-native-testing-library'

import SignIn from '../../pages/SignIn'

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  }
})

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: jest.fn(),
    }),
  }
})

describe('SignIn Page', () => {
  // it('should be able to sign in', async () => {
  //   const { getByPlaceholder, getByText } = render(<SignIn />)

  //   const emailField = getByPlaceholder('E-mail')
  //   const passwordField = getByPlaceholder('Senha')
  //   const buttonElement = getByText('Entrar')

  //   fireEvent.changeText(emailField, {
  //     target: { value: 'guilhermeoliveira@gmail.com' },
  //   })
  //   fireEvent.changeText(passwordField, {
  //     target: { value: '12345678' },
  //   })

  //   fireEvent.press(buttonElement)

  //   await waitFor(() => {})
  // })

  it('should contains email/password inputs', () => {
    const { getByPlaceholder } = render(<SignIn />)

    expect(getByPlaceholder('E-mail')).toBeTruthy()
    expect(getByPlaceholder('Senha')).toBeTruthy()
  })
})
