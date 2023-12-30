
import dynamic from 'next/dynamic'


const ReactApexcharts = dynamic(() => import('react-apexcharts'), { ssr: false })

export default ReactApexcharts
