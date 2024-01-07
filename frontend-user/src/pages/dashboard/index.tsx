import { Container } from '@mui/material';
import StatisticsCard from 'src/views/dashboard/Statistics';

import { HomeFeature, HomePopularCourse } from 'src/views/landing-page/components/home';

const Dashboard = () => {
    return (
        <Container style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: '1' }}>
                <HomeFeature />
            </div>
            <div style={{ flex: '1' }}>
                <StatisticsCard />
            </div>
            <div style={{ flex: '1' }}>
                <HomePopularCourse />
            </div>
        </Container>
    )
}

export default Dashboard
