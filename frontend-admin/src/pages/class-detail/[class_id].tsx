import { SyntheticEvent, useEffect, useState } from 'react'

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
import ClassDetail from 'src/views/class-details/TabClassInformation'
import StudentOfClass from 'src/views/class-details/TabStudentOfClass'
import { useRouter } from 'next/router'
import ErrorFetch from '../fetchError'

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

const isValidClassId = (classId: any) => {
    if (typeof classId !== 'string') {
        return false;
    }
    if (classId.length !== 24) {
        return false;
    }
    const isHex = /^[0-9a-fA-F]+$/.test(classId);
    if (!isHex) {
        return false;
    }

    return true;
};

const ClassSettings = () => {
    const [value, setValue] = useState<string>('details');
    const [error, setError] = useState<boolean | null>(null);
    const router = useRouter();
    const { class_id } = router.query;

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }
    useEffect(() => {
        if (class_id === undefined) return;

        if (isValidClassId(class_id as string)) {
            setError(false);
        }
        else {
            setError(true);
        }
    }, [class_id]);

    if (error === null) { return null; }
    if (error === true) { return <ErrorFetch />; }
    else {
        return (
            <Card>
                <TabContext value={value}>
                    <TabList
                        onChange={handleChange}
                        aria-label='account-settings tabs'
                        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
                    >
                        <Tab
                            value='details'
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <AccountOutline />
                                    <TabName>Class Information</TabName>
                                </Box>
                            }
                        />
                        <Tab
                            value='students'
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <LockOpenOutline />
                                    <TabName>Students and Mapping</TabName>
                                </Box>
                            }
                        />
                    </TabList>
                    <TabPanel sx={{ p: 0 }} value='details'>
                        <ClassDetail class_id={class_id as string} />
                    </TabPanel>
                    <TabPanel sx={{ p: 0 }} value='students'>
                        <StudentOfClass class_id={class_id as string} />
                    </TabPanel>
                </TabContext>
            </Card>
        )
    }
}

export default ClassSettings
