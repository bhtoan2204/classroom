import { PaletteMode } from '@mui/material'

import { ContentWidth } from 'src/@core/layouts/types'

type ThemeConfig = {
  mode: PaletteMode
  templateName: string
  routingLoader: boolean
  disableRipple: boolean
  navigationSize: number
  menuTextTruncate: boolean
  contentWidth: ContentWidth
  responsiveFontSizes: boolean
}

const themeConfig: ThemeConfig = {
  // ** Layout Configs
  templateName: 'Educa',
  mode: 'light' /* light | dark */,
  contentWidth: 'boxed' /* full | boxed */,

  routingLoader: true /* true | false */,

  menuTextTruncate: true /* true | false */,
  navigationSize: 260,

  responsiveFontSizes: true /* true | false */,
  disableRipple: false /* true | false */
}

export default themeConfig
