import React, { forwardRef } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

const ScrollBar = forwardRef((props, ref) => {
    const { ...rest } = props

    return (
        <Scrollbars
            ref={ref}
            renderView={(props) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                    }}
                />
            )}
            {...rest}
        />
    )
})

export default ScrollBar
