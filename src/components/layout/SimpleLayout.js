import { Container } from 'components/shared';
import { Card } from 'components/ui';
import React from 'react';
import { Outlet } from 'react-router-dom';

const SimpleLayout = () => {
  return (
    <div className="app-layout-simple flex flex-auto flex-col h-[100vh]">
      <div className="h-full">
        <Container className="flex flex-col items-center min-w-0 h-full" >
          <Card
            className="min-w-[320px] md:min-w-[450px]"
            bodyClass="md:p-10"
          >
            <Outlet />
          </Card>
        </Container>
      </div>
    </div>)
}

export default SimpleLayout