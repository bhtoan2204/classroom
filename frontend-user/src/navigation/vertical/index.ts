import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'

import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { getCookieCustom } from 'src/utils/cookies'

const navigation = (): VerticalNavItemsType => {
  const role = getCookieCustom('role')

  if (role === 'teacher') return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Management'
    },
    {
      title: 'Class Management',
      icon: AccountCogOutline,
      path: '/teacher/class-management'
    },
    {
      title: 'Invitation',
      icon: AccountCogOutline,
      path: '/teacher/class-invitation'
    },
    {
      title: 'Grade Review',
      icon: AccountCogOutline,
      path: '/teacher/grade-review'
    },
  ]

  if (role === 'student') return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/student/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Management'
    },
    {
      title: 'Class Management',
      icon: AccountCogOutline,
      path: '/student/class/'
    },
    {
      title: 'My Grade',
      icon: AccountCogOutline,
      path: '/student/grade/'
    },
    {
      title: 'My Review',
      icon: AccountCogOutline,
      path: '/student/review'
    },
  ]

  return [];
}

export default navigation
