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
import MyClass from 'src/views/class/MyClass'
import JoinedClass from 'src/views/class/JoinedClass'

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

const StudentRoute = () => {
    const [value, setValue] = useState<string>('my-class');
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
                        value='my-class'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccountOutline />
                                <TabName>My Class</TabName>
                            </Box>
                        }
                    />
                    <Tab
                        value='joined-class'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LockOpenOutline />
                                <TabName>Joined Class</TabName>
                            </Box>
                        }
                    />
                </TabList>
                <TabPanel sx={{ p: 0 }} value='my-class'>
                    <MyClass />
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='joined-class'>
                    <JoinedClass />
                </TabPanel>
            </TabContext>
        </Card >)
}

export default StudentRoute;