
import { ReactNode } from 'react'

import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import VerticalLayout from 'src/@core/layouts/VerticalLayout'

import VerticalNavItems from 'src/navigation/vertical'

import VerticalAppBarContent from './components/vertical/AppBarContent'


import { useSettings } from 'src/@core/hooks/useSettings'

interface Props {
  children: ReactNode
}

const UserLayout = ({ children }: Props) => {

  const { settings, saveSettings } = useSettings()
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={VerticalNavItems()}
      verticalAppBarContent={(
        props
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
        />
      )}
    >
      {children}
    </VerticalLayout>
  )
}

export default UserLayout
