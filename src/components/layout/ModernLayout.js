import React from 'react'
import Header from 'components/template/Header'
// import SidePanel from 'components/template/SidePanel'
import useAuth from 'utils/hooks/useAuth';
import UserDropdown from 'components/template/UserDropdown'
import SideNavToggle from 'components/template/SideNavToggle'
import MobileNav from 'components/template/MobileNav'
import SideNav from 'components/template/SideNav'
import { Outlet } from 'react-router-dom'
import PageContainer from 'components/template/PageContainer'

const HeaderActionsStart = () => {
    return (
        <>
            <MobileNav />
            <SideNavToggle />
        </>
    )
}

const HeaderActionsEnd = () => {
    const { signOut } = useAuth()
    return (
        <>
            <span onClick={signOut}>로그아웃</span>
            {/* <SidePanel /> */}
            {/* <UserDropdown hoverable={false} /> */}
        </>
    )
}

{/* <div className="app-layout-classic flex flex-auto flex-col">
    <div className="flex flex-auto min-w-0">
        <SideNav />
        <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
            <Header
                className="shadow dark:shadow-2xl"
                headerStart={<HeaderActionsStart />}
                headerEnd={<HeaderActionsEnd />}
            />
            <div className="h-full flex flex-auto flex-col">
                <View {...props} />
            </div>
        </div>
    </div>
</div> */}

const ModernLayout = (props) => {
    console.log("modernlayout call")
    return (

        <div className="app-layout-modern flex flex-auto flex-col">
            <div className="flex flex-auto min-w-0">
                <SideNav />
                {/* <SideBar /> */}
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
                    <Header
                        className="border-b border-gray-200 dark:border-gray-700"
                        headerEnd={<HeaderActionsEnd />}
                        headerStart={<HeaderActionsStart />}
                    />
                    {/* <View {...props} /> */}
                    {/* <PageContainer > */}
                    {/* {props.children} */}
                    <Outlet />
                    {/* </PageContainer> */}
                </div>
            </div>
        </div>
    )
}

export default ModernLayout
