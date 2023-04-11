import React from 'react'
import authRoute from './authRoute'
import Home from 'views/Home'
import BizView from 'views/biz'
import SingleMenuView from 'views/demo/SingleMenuView'
import CollapseMenuItemView1 from 'views/demo/CollapseMenuItemView1'
import CollapseMenuItemView2 from 'views/demo/CollapseMenuItemView2'
import PromotionProgram from 'views/promotion'
// import PackageDcNew from 'views/promotion/PackageDc/components/PackageDcNew'
import PromotionRegister from 'views/promotion/Register'
import { PackageDcNew } from 'views/promotion/PackageDc'
import BizProfileEdit from 'views/biz/components/BizProfileEdit'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: Home,
        authority: [],
    },
    {
        key: 'biz',
        path: '/biz/:tab',
        component: BizView,
        authority: [],
        meta: {
            header: '매장정보',
            headerContainer: true,
        }
    },
    {
        key: 'biz',
        path: '/biz/update',
        component: BizProfileEdit,
        authority: [],
        meta: {
            header: '매장정보 수정',
            headerContainer: true,
        }
    },
    {
        key: 'promotion',
        path: '/promotion',
        component: PromotionProgram,
        authority: [],
        meta: {
            header: '프로모션2',
            headerContainer: true,
        }
    },
    {
        key: 'promotion.new',
        path: '/promotion/register',
        component: PromotionRegister,
        authority: [],
        meta: {
            header: '프로모션2',
            headerContainer: true,
        }
    },
    {
        key: 'promotion.packageDc.new',
        path: '/promotion/package-dc/new',
        component: PackageDcNew,
        authority: [],
        meta: {
            header: '프로모션2',
            headerContainer: true,
        }
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: CollapseMenuItemView1,
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: CollapseMenuItemView2,
        authority: [],
    },


    // {
    //     key: 'home',
    //     path: '/home',
    //     component: React.lazy(() => import('views/Home')),
    //     authority: [],
    // },
    // /** Example purpose only, please remove */
    // {
    //     key: 'singleMenuItem',
    //     path: '/single-menu-view',
    //     component: React.lazy(() => import('views/demo/SingleMenuView')),
    //     authority: [],
    // },
    // {
    //     key: 'collapseMenu.item1',
    //     path: '/collapse-menu-item-view-1',
    //     component: React.lazy(() => import('views/demo/CollapseMenuItemView1')),
    //     authority: [],
    // },
    // {
    //     key: 'collapseMenu.item2',
    //     path: '/collapse-menu-item-view-2',
    //     component: React.lazy(() => import('views/demo/CollapseMenuItemView2')),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.single',
    //     path: '/group-single-menu-item-view',
    //     component: React.lazy(() =>
    //         import('views/demo/GroupSingleMenuItemView')
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item1',
    //     path: '/group-collapse-menu-item-view-1',
    //     component: React.lazy(() =>
    //         import('views/demo/GroupCollapseMenuItemView1')
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item2',
    //     path: '/group-collapse-menu-item-view-2',
    //     component: React.lazy(() =>
    //         import('views/demo/GroupCollapseMenuItemView2')
    //     ),
    //     authority: [],
    // },
]
