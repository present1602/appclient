import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'

const navigationConfig = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'biz',
        path: '/biz',
        title: '매장관리',
        translateKey: 'nav.biz',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [],
        subMenu: [
            {
                key: 'biz.profile',
                path: `/biz/profile`,
                title: '매장정보',
                translateKey: 'nav.biz.profile',
                icon: 'home',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ]
    },
    {
        key: 'promotion',
        path: '',
        title: '프로모션',
        translateKey: 'nav.biz',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [],
        subMenu: [
            {
                key: 'promotion',
                path: `/promotion`,
                title: '프로모션',
                translateKey: 'nav.promotion',
                icon: 'singleMenu',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ]
    },
    // {
    //     key: 'singleMenuItem',
    //     path: '/single-menu-view',
    //     title: 'Single menu item',
    //     translateKey: 'nav.singleMenuItem',
    //     icon: 'singleMenu',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },


    // {
    //     key: 'groupMenu',
    //     path: '',
    //     title: 'Group Menu',
    //     translateKey: 'nav.groupMenu.groupMenu',
    //     icon: '',
    //     type: NAV_ITEM_TYPE_TITLE,
    //     authority: [],
    //     subMenu: [
    //         {
    //             key: 'groupMenu.single',
    //             path: '/group-single-menu-item-view',
    //             title: 'Group single menu item',
    //             translateKey: 'nav.groupMenu.single',
    //             icon: 'groupSingleMenu',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [],
    //             subMenu: [],
    //         },
    //         {
    //             key: 'groupMenu.collapse',
    //             path: '',
    //             title: 'Group collapse menu',
    //             translateKey: 'nav.groupMenu.collapse.collapse',
    //             icon: 'groupCollapseMenu',
    //             type: NAV_ITEM_TYPE_COLLAPSE,
    //             authority: [],
    //             subMenu: [
    //                 {
    //                     key: 'groupMenu.collapse.item1',
    //                     path: '/group-collapse-menu-item-view-1',
    //                     title: 'Menu item 1',
    //                     translateKey: 'nav.groupMenu.collapse.item1',
    //                     icon: '',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: [],
    //                     subMenu: [],
    //                 },
    //                 {
    //                     key: 'groupMenu.collapse.item2',
    //                     path: '/group-collapse-menu-item-view-2',
    //                     title: 'Menu item 2',
    //                     translateKey: 'nav.groupMenu.collapse.item2',
    //                     icon: '',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: [],
    //                     subMenu: [],
    //                 },
    //             ],
    //         },
    //     ],
    // },

    /**dummy for scroll */
    // {
    //     key: 'singleMenuItem01',
    //     path: '/single-menu-view',
    //     title: 'Single menu item',
    //     translateKey: 'nav.singleMenuItem',
    //     icon: 'singleMenu',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },

    // {
    //     key: 'singleMenuItem02',
    //     path: '/single-menu-view',
    //     title: 'Single menu item',
    //     translateKey: 'nav.singleMenuItem',
    //     icon: 'singleMenu',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },

    // {
    //     key: 'singleMenuItem2',
    //     path: '/single-menu-view',
    //     title: 'Single menu item',
    //     translateKey: 'nav.singleMenuItem',
    //     icon: 'singleMenu',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },

    // {
    //     key: 'singleMenuItem3',
    //     path: '/single-menu-view',
    //     title: 'Single menu item',
    //     translateKey: 'nav.singleMenuItem',
    //     icon: 'singleMenu',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    // {
    //     key: 'singleMenuItem4',
    //     path: '/single-menu-view',
    //     title: 'Single menu item',
    //     translateKey: 'nav.singleMenuItem',
    //     icon: 'singleMenu',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    // {
    //     key: 'singleMenuItem5',
    //     path: '/single-menu-view',
    //     title: 'Single menu item',
    //     translateKey: 'nav.singleMenuItem',
    //     icon: 'singleMenu',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    // {
    //     key: 'singleMenuItem6',
    //     path: '/single-menu-view',
    //     title: 'Single menu item',
    //     translateKey: 'nav.singleMenuItem',
    //     icon: 'singleMenu',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    // {
    //     key: 'singleMenuItem75',
    //     path: '/single-menu-view',
    //     title: 'Single menu item',
    //     translateKey: 'nav.singleMenuItem',
    //     icon: 'singleMenu',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    // {
    //     key: 'singleMenuItem11',
    //     path: '/single-menu-view',
    //     title: 'Single menu item',
    //     translateKey: 'nav.singleMenuItem',
    //     icon: 'singleMenu',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    // {
    //     key: 'singleMenuItem12',
    //     path: '/single-menu-view',
    //     title: 'Single menu item',
    //     translateKey: 'nav.singleMenuItem',
    //     icon: 'singleMenu',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
]

export default navigationConfig
