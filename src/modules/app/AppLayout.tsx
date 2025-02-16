import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import styled from 'styled-components';

export function AppLayout() {
  return (
    <StyledLayout>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </StyledLayout>
  );
}

const StyledLayout = styled(Layout)`
  background-color: inherit;
  min-height: '100vh';
`;
