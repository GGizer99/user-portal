import React from 'react';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import DomainOutlinedIcon from '@mui/icons-material/DomainOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function Sidebar() {
    return (
      <>
        <Navigation
            
            activeItemId="/management/members"
            onSelect={({itemId}) => {
              
            }}
            items={[
              {
                title: 'Ana Sayfa',
                itemId: '/homePage',
                elemBefore: () => <DashboardIcon name="inbox" />,
              },
              {
                title: 'Kullanıcı İşlemleri',
                itemId: '/usersOperations',
                
                subNav: [
                  {
                    title: 'Kullanıcı Listesi',
                    itemId: '/management/projects',
                    elemBefore: () => <Diversity3OutlinedIcon />,
                  },
                  {
                    title: 'Firma Listesi',
                    itemId: '/management/members',
                    elemBefore: () => <DomainOutlinedIcon />,
                  },
                  {
                    title: 'Proje Listesi',
                    itemId: '/management/project',
                    elemBefore: () => <DomainOutlinedIcon />,
                  },
                ],
              },
              
            ]}
          />
      </>
    );
}
