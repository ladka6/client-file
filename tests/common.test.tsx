import * as React from 'react'
import { render } from '@testing-library/react'
import 'jest-canvas-mock'
import { FilePicker } from '../src'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<FilePicker onUpload={(imageUrl) => console.log("Uploaded:", imageUrl)} />)
  })
})
