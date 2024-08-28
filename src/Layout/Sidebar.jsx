// Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, useTheme, useMediaQuery, Box } from '@mui/material'; // Import Box here
import { FaHome, FaUserAlt, FaCog } from 'react-icons/fa';
import { ExpandLess, ExpandMore, Home, Person, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [submenuOpen, setSubmenuOpen] = React.useState(false);

    const handleSubmenuClick = () => {
        setSubmenuOpen(!submenuOpen);
    };

    const drawer = (
        <List>

            <ListItem button component={Link} to="/" sx={{ mt: 8 }}>
                <ListItemIcon sx={{ color: '#fff' }}>
                    <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>

            <ListItem button>
                <ListItemIcon sx={{ color: '#fff' }}>
                    <Person />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={handleSubmenuClick}>
                <ListItemIcon sx={{ color: '#fff' }}>
                    <Settings />
                </ListItemIcon>
                <ListItemText primary="Settings" />
                {submenuOpen ? <ExpandLess sx={{ color: '#fff' }} /> : <ExpandMore sx={{ color: '#fff' }} />}
            </ListItem>
            <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button component={Link} to="/general" sx={{ pl: 10 }}>
                        <ListItemText primary="General" />
                    </ListItem>
                    <ListItem button component={Link} to="/account" sx={{ pl: 10 }}>
                        <ListItemText primary="Account" />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );

    return (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? mobileOpen : true}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        backgroundColor: '#333',
                        color: '#fff',
                    },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
