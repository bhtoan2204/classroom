
import { Fragment, ReactNode } from 'react'


import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

interface FooterIllustrationsProp {
  image?: ReactNode
}


const MaskImg = styled('img')(() => ({
  bottom: 0,
  zIndex: -1,
  width: '100%',
  position: 'absolute'
}))

const TreeImg = styled('img')(({ theme }) => ({
  left: '2.25rem',
  bottom: '4.25rem',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    left: 0,
    bottom: 0
  }
}))

const FooterIllustrations = (props: FooterIllustrationsProp) => {

  const { image } = props


  const theme = useTheme()


  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  if (!hidden) {
    return (
      <Fragment>
        {image || <TreeImg alt='tree' src='/images/pages/tree-2.png' />}
        <MaskImg alt='mask' src={`/images/pages/misc-mask-${theme.palette.mode}.png`} />
      </Fragment>
    )
  } else {
    return null
  }
}

export default FooterIllustrations
