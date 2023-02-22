import React from 'react'
import { Menu, Tooltip } from 'components/ui'
import VerticalMenuIcon from './VerticalMenuIcon'
import { Link } from 'react-router-dom'
// import { Trans, useTranslation } from 'react-i18next'

const { MenuItem } = Menu

const CollapsedItem = ({ title, children }) => {
    // const { t } = useTranslation()
    return (
        <Tooltip
            // title={t(translateKey) || title}
            title={title}
            placement={'right'}
        >
            {children}
        </Tooltip>
    )
}

const DefaultItem = (props) => {
    const { nav, onLinkClick, sideCollapsed, userAuthority } = props

    return (
        <MenuItem key={nav.key} eventKey={nav.key} className="mb-2">
            <Link
                to={nav.path}
                onClick={() =>
                    onLinkClick?.({
                        key: nav.key,
                        title: nav.title,
                        path: nav.path,
                    })
                }
                className="flex items-center h-full w-full"
            >
                <VerticalMenuIcon icon={nav.icon} />
                {!sideCollapsed && (
                    <span>
                        {nav.title}0
                        {/* <Trans
                            i18nKey={nav.translateKey}
                            defaults={nav.title}
                        /> */}
                    </span>
                )}
            </Link>
        </MenuItem>
    )
}

const VerticalSingleMenuItem = ({
    nav,
    onLinkClick,
    sideCollapsed,
    userAuthority,
}) => {
    return (
        <>
            {sideCollapsed ? (
                <CollapsedItem
                    title={nav.title}
                >
                    <DefaultItem
                        nav={nav}
                        sideCollapsed={sideCollapsed}
                        onLinkClick={onLinkClick}
                        userAuthority={userAuthority}
                    />
                </CollapsedItem>
            ) : (
                <DefaultItem
                    nav={nav}
                    sideCollapsed={sideCollapsed}
                    onLinkClick={onLinkClick}
                    userAuthority={userAuthority}
                />
            )}
        </>
    )
}

export default VerticalSingleMenuItem
