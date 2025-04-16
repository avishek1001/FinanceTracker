import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        // <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{
            mt: 1,
            mb: 2,
            color: "black",
            backgroundColor: 'rgba(74, 20, 140, 0.20) ', // Translucent white
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            '&:hover': {
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)'
            }
        }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Finance Tracker
                </Typography>
                <Box>
                    <Button
                        color='inherit'
                        component={Link}
                        to='/'
                    >
                        Dashboard
                    </Button>

                    <Button
                        color='inherit'
                        component={Link}
                        to='/chart/pie'
                    >
                        Pie
                    </Button>

                    <Button
                        color='inherit'
                        component={Link}
                        to='/chart/bar'
                    >
                        Bar
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
        // </Box>
    )
}