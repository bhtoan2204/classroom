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
    const { class_id } = useRouter().query
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
                                <TabName>List Teacher</TabName>
                            </Box>
                        }
                    />
                    <Tab
                        value='list-teacher'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LockOpenOutline />
                                <TabName>List Student</TabName>
                            </Box>
                        }
                    />
                </TabList>
                <TabPanel sx={{ p: 0 }} value='class-detail'>
                    <TabClassDetail class_id={class_id as string} />
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='grade-structure'>

                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='grade-management'>

                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='list-student'>

                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='list-teacher'>

                </TabPanel>
            </TabContext>
        </Card >)
}

export default ClassDetail;