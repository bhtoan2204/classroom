import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import NProgress from 'nprogress'

import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import themeConfig from 'src/configs/themeConfig'
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'slick-carousel/slick/slick.css'
import '../../styles/globals.css'
import '../../styles/react-slick.css'

type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <title>{`${themeConfig.templateName}`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Educa User Dashboard.`}
        />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App
