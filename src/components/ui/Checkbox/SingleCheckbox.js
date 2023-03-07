import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useConfig } from '../ConfigProvider'

const SingleCheckbox = React.forwardRef((props, ref) => {

    const {
        color,
        className,
        onChange,
        children,
        disabled,
        readOnly,
        name,
        defaultChecked,
        value,
        checked: controlledChecked,
        labelRef,
        field,
        ...rest
    } = props

    const { themeColor, primaryColorLevel } = useConfig()

    const isChecked = useCallback(() => {
        return controlledChecked || defaultChecked
    }, [controlledChecked, defaultChecked])

    const [checkboxChecked, setCheckboxChecked] = useState(isChecked())

    const checkboxColor =
        color || `${themeColor}-${primaryColorLevel}`

    const checkboxDefaultClass = `checkbox text-${checkboxColor}`
    const checkboxColorClass = disabled && 'disabled'
    const labelDefaultClass = `checkbox-label`
    const labelDisabledClass = disabled && 'disabled'

    const checkBoxClass = classNames(checkboxDefaultClass, checkboxColorClass)

    const labelClass = classNames(
        labelDefaultClass,
        labelDisabledClass,
        className
    )

    return (
        <label ref={labelRef} className={labelClass}>
            <input
                ref={ref}
                className={checkBoxClass}
                type="checkbox"
                disabled={disabled}
                readOnly={readOnly}
                onChange={onChange}
                name={name}
                {...field}
                {...rest}
            />
            {children ? (
                <span
                    className={classNames(
                        'ltr:ml-2 rtl:mr-2',
                        disabled ? 'opacity-50' : ''
                    )}
                >
                    {children}
                </span>
            ) : null}
        </label>
    )
})

SingleCheckbox.propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    color: PropTypes.string,
    onChange: PropTypes.func,
    labelRef: PropTypes.string,
    value: PropTypes.any,
}

export default SingleCheckbox
