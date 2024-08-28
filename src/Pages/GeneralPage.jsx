import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Divider, Typography, TextField, Button, Box, Grid } from '@mui/material';

const GeneralPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const handleClear = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            address: ''
        });
    };

    return (
        <Card sx={{ maxWidth: 1200, margin: '1px', boxShadow: 5 }}>
            <CardHeader
                sx={{ bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}
                title={
                    <Typography variant="h6" component="div">
                        Application Form
                    </Typography>
                }
            />
            <Divider />
            <CardContent>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                        '& .MuiButton-root': { m: 1 },
                    }}
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="name"
                                label="Full Name"
                                variant="outlined"
                                fullWidth
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="email"
                                label="Email Address"
                                variant="outlined"
                                fullWidth
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="password"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="confirmPassword"
                                label="Confirm Password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="address"
                                label="Address"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={3}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        sx={{ p: 1, fontWeight: 'bold' }}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        sx={{ p: 1, fontWeight: 'bold' }}
                                        onClick={handleClear}
                                    >
                                        Clear
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
};

export default GeneralPage;
