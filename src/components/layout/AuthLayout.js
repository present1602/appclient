import React, { cloneElement } from 'react'
import { Container } from 'components/shared'
import { Card } from 'components/ui'
import Logo from 'components/template/Logo'
import { Outlet } from 'react-router-dom'

const Simple = ({ children, content, ...rest }) => {
  return (
    <div className="app-layout-simple flex flex-auto flex-col h-[100vh]">
      <div className="h-full">
        <Container className="flex flex-col flex-auto items-center justify-center min-w-0 h-full">
          <Card
            className="min-w-[320px] md:min-w-[450px]"
            bodyClass="md:p-10"
          >
            <div className="text-center">
              <Logo type="streamline" imgClass="mx-auto" />
            </div>
            <div className="text-center">
              {/* {content} */}
              {/* {children
                ? cloneElement(children, {
                  contentClassName: 'text-center',
                  ...rest,
                })
                : null} */}
              <Outlet />
            </div>
          </Card>
        </Container>
      </div>
    </div>
  )

}

export default Simple