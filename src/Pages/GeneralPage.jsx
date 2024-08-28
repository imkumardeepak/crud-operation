import React from 'react';
import { Card, CardHeader, CardContent, Divider, Typography } from '@mui/material';

const GeneralPage = () => {
    return (
        <Card sx={{ maxWidth: 1200, margin: '10px auto', boxShadow: 5 }}>
            <CardHeader
                title="General Settings"
                sx={{ bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}
            />
            <Divider />
            <CardContent>
                <Typography variant="body1" color="textSecondary">
                    Here you can manage your general settings.
                </Typography>
            </CardContent>
        </Card>
    );
};

export default GeneralPage;
