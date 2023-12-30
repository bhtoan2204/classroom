import React, { FC, ReactNode } from 'react'
import Box from '@mui/material/Box'
import { Header } from '../header'
import FooterContent from 'src/@core/layouts/components/shared-components/footer/FooterContent'

interface Props {
  children: ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <Box component="main">
      <Header />
      {children}
      <FooterContent />
    </Box>
  )
}

export default MainLayout
