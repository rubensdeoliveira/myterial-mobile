import React from 'react'

import { render, fireEvent, waitFor } from 'react-native-testing-library'
import Input from '../../components/Input'

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      }
    },
  }
})

describe('Input Component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholder } = render(
      <Input name="email" placeholder="E-mail" icon="user" />,
    )

    expect(getByPlaceholder('E-mail')).toBeTruthy()
  })

  // it('should render highlight on input focus', async () => {
  //   const { getByPlaceholder, getByTestId } = render(
  //     <Input name="email" placeholder="E-mail" icon="user" />,
  //   )

  //   const inputElement = getByPlaceholder('E-mail')
  //   const containerElement = getByTestId('input-container')

  //   fireEvent.press(inputElement)

  //   await waitFor(() => {
  //     expect(containerElement).toHaveStyle('border-color: #ff9000')
  //   })
  // })
})
