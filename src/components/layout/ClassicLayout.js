import React from 'react'
import Header from 'components/template/Header'
import SideNavToggle from 'components/template/SideNavToggle'
import Notification from 'components/template/Notification'
import MobileNav from 'components/template/MobileNav'
import SideNav from 'components/template/SideNav'
import View from 'views'
import { Outlet } from 'react-router-dom'

const HeaderActionsStart = () => {
    return (
        <>
            <MobileNav />
            <SideNavToggle />
        </>
    )
}

const HeaderActionsEnd = () => {
    return (
        <>
            <p>nofi</p>
            {/* <Notification /> */}
        </>
    )
}

const ClassicLayout = (props) => {
    return (
        <div className="app-layout-classic flex flex-auto flex-col">
            <div className="flex flex-auto min-w-0">
                {/* <SideNav /> */}
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        className="shadow dark:shadow-2xl"
                        headerStart={<HeaderActionsStart />}
                        headerEnd={<HeaderActionsEnd />}
                    />
                    <div className="h-full flex flex-auto flex-col">
                        <View {...props} />
                        {/* <Outlet /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassicLayout
