
import { ReactNode } from 'react'

import { SvgIconProps } from '@mui/material'

interface UserIconProps {
  iconProps?: SvgIconProps
  icon: string | ReactNode
}

const UserIcon = (props: UserIconProps) => {
  const { icon, iconProps } = props

  const IconTag = icon

  let styles


  // @ts-ignore
  return <IconTag {...iconProps} style={{ ...styles }} />
}

export default UserIcon
