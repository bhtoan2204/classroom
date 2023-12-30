import React from 'react'
import dynamic from 'next/dynamic'
import { NextPageWithLayout } from 'src/views/landing-page/interfaces/layout'
import { MainLayout } from 'src/views/landing-page/components/layout'
// import { HomeFeature, HomeHero, HomePopularCourse, HomeTestimonial, HomeOurMentors, DynamicHomeNewsLetter } from '@/components/home'

const DynamicHomeHero = dynamic(() => import('../views/landing-page/components/home/hero'))
const DynamicHomeFeature = dynamic(() => import('../views/landing-page/components/home/feature'))
const DynamicHomePopularCourse = dynamic(() => import('../views/landing-page/components/home/popular-courses'))
const DynamicHomeTestimonial = dynamic(() => import('../views/landing-page/components/home/testimonial'))
const DynamicHomeOurMentors = dynamic(() => import('../views/landing-page/components/home/mentors'))

const Home: NextPageWithLayout = () => {
  return (
    <>
      <DynamicHomeHero />
      <DynamicHomePopularCourse />
      <DynamicHomeFeature />
      <DynamicHomeTestimonial />
      <DynamicHomeOurMentors />
    </>
  )
}

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default Home
