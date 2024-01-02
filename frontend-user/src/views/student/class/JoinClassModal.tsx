import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Dialog, DialogContent, DialogTitle, Tab } from "@mui/material"
import { SyntheticEvent, useEffect, useState } from "react"
import JoinClassByCodeTab from "./childs/JoinClassByCodeTab"
import JoinClassByLinkTab from "./childs/JoinClassByLinkTab"



function JoinClassModal({ OpenModal, handleOpenModalCallback }: any) {
    const [openModal, setOpenModal] = useState(false)
    const [tabValue, setTabValue] = useState("1")


    useEffect(() => {
        setOpenModal(OpenModal)

    }, [OpenModal])


    function handleTabChange(event: SyntheticEvent, newValue: string) {
        event.preventDefault();
        setTabValue(newValue)
    }

    return (
        <Dialog
            open={openModal}
            fullWidth={true}
            onClose={() => handleOpenModalCallback(false)}
        >
            <DialogTitle>
                Join class
            </DialogTitle>
            <DialogContent>
                <TabContext
                    value={tabValue}
                >
                    <TabList
                        onChange={handleTabChange}
                    >
                        <Tab label="Join by Code" value={"1"} />
                        <Tab label="Join by Link" value={"2"} />
                    </TabList>
                    <TabPanel value="1">
                        <JoinClassByCodeTab />
                    </TabPanel>
                    <TabPanel value="2">
                        <JoinClassByLinkTab />
                    </TabPanel>
                </TabContext>
            </DialogContent>
        </Dialog>
    )
}

export default JoinClassModal