import { Container } from 'components/shared';
import React from 'react';
import { Outlet } from 'react-router-dom';

const BlankLayout = ({ children }) => {
  return (
    <div className="app-layout-simple flex flex-auto flex-col h-[100vh]">
      <div className="h-full">

        <Container className="flex flex-col items-center min-w-0 h-full" >
          <div
            className="w-[320px] md:w-[480px] relative card card-border"
          // className="min-w-[320px] md:min-w-[450px] relative card card-border"
          // bodyClass="md:p-10"
          >
            <Outlet />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default BlankLayout;