
import { ReactNode } from 'react'


import BlankLayout from 'src/@core/layouts/BlankLayout'


import Error404 from 'src/pages/404'

const ErrorPage = () => <Error404 />

ErrorPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ErrorPage
