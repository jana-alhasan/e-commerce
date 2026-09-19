import React from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { className } from './styles';

const MyBreadcrumbs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  const handleBreadcrumbClick = (index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}`;
    navigate(path);
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" style={className.breadcrumb}>
      {segments.length > 0 && (
        <Link
          color="inherit"
          to={'/'}
          component={RouterLink}
          style={className.breadcrumb}
        >
          <HomeIcon />
        </Link>
      )}
      {segments.map((segment, index) => (
        <Link
          key={index}
          color={index === segments.length - 1 ? 'textPrimary' : 'inherit'}
          onClick={() => handleBreadcrumbClick(index)}
          component={RouterLink}
          style={className.breadcrumb}
          to={`/${segments.slice(0, index + 1).join('/')}`}
        >
          {segment}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default MyBreadcrumbs;
