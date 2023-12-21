import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'

import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { ClassOutlined } from '@mui/icons-material'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Class Manager',
      icon: ClassOutlined,
      path: '/class-manager'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
  ]
}

export default navigation
