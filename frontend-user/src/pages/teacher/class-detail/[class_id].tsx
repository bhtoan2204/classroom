import { SyntheticEvent, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import TabClassDetail from 'src/views/class-detail/TabDetail'
import GradeStructure from 'src/views/class-detail/TabGradeStructure'
import ListStudent from 'src/views/class-detail/TabListStudent'
import ListTeacher from 'src/views/class-detail/TabListTeacher'
import GradeManagement from 'src/views/class-detail/TabGradeManagement'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        minWidth: 100
    },
    [theme.breakpoints.down('sm')]: {
        minWidth: 67
    }
}))

const TabName = styled('span')(({ theme }) => ({
    lineHeight: 1.71,
    fontSize: '0.875rem',
    marginLeft: theme.spacing(2.4),
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}))

const ClassDetail = () => {
    const [value, setValue] = useState<string>('class-detail');
    const router = useRouter();
    const { class_id } = router.query;
    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }
    return (
        <Card>
            <TabContext value={value}>
                <TabList
                    onChange={handleChange}
                    aria-label='account-settings tabs'
                    sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
                >
                    <Tab
                        value='class-detail'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccountOutline />
                                <TabName>Class Detail</TabName>
                            </Box>
                        }
                    />
                    <Tab
                        value='grade-structure'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LockOpenOutline />
                                <TabName>Grade Structure</TabName>
                            </Box>
                        }
                    />
                    <Tab
                        value='grade-management'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LockOpenOutline />
                                <TabName>Grade Management</TabName>
                            </Box>
                        }
                    />
                    <Tab
                        value='list-student'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LockOpenOutline />
                                <TabName>List Student</TabName>
                            </Box>
                        }
                    />
                    <Tab
                        value='list-teacher'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LockOpenOutline />
                                <TabName>List Teacher</TabName>
                            </Box>
                        }
                    />
                </TabList>
                <TabPanel sx={{ p: 0 }} value='class-detail'>
                    <TabClassDetail class_id={class_id as string} />
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='grade-structure'>
                    <GradeStructure class_id={class_id as string} />
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='grade-management'>
                    <GradeManagement class_id={class_id as string} ></GradeManagement>
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='list-student'>
                    <ListStudent class_id={class_id as string} />
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='list-teacher'>
                    <ListTeacher class_id={class_id as string} />
                </TabPanel>
            </TabContext>
        </Card >)
}

export default ClassDetail;