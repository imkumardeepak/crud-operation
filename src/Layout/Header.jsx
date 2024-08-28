import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import User from '@mui/icons-material/Person';

const Header = ({ handleDrawerToggle }) => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#333' }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Logo Image */}
                <Box
                    component="img"
                    src="/src/assets/logo-removebg-preview.png"
                    alt="Company Logo"
                    sx={{ height: 40, mr: 2 }} // Set opacity to make the logo transparent
                />

                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    {/* Keltech Energies Limited */}
                </Typography>

                <IconButton color="inherit">
                    <User />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
