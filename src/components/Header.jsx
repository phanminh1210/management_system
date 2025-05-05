import { Link, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    InputBase
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import Logo from '../assets/images/logo.png';
import s from '../styles/header.module.scss';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    useEffect(() => {
        const user = localStorage.getItem("user");
        setIsLoggedIn(!!user);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/sign-in");
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar
                position="fixed"
                elevation={scrolled ? 2 : 0}
                sx={{
                    transition: 'background-color 0.3s ease',
                    backgroundColor: scrolled ? '#ffffff' : 'transparent',
                    color: '#000',
                    zIndex: 1100
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                    {/* Logo và các liên kết bên trái */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1, minWidth: 250 }}>
                        <Box
                            component={Link}
                            to="/"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            <Box
                                component="img"
                                src={Logo}
                                alt="Logo"
                                sx={{ width: 40, height: 40, borderRadius: "50%", mr: 1 }}
                            />
                            <Typography variant="h6" noWrap className={s.shopName}>
                                Maison M&H
                            </Typography>
                        </Box>

                        <Button component={Link} to="/" color="inherit" sx={{ textTransform: 'none' }}>
                            Trang chủ
                        </Button>
                    </Box>

                    {/* Bên phải: Danh mục, Tìm kiếm, Giỏ hàng, Đăng nhập */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}>
                        <Button
                            color="inherit"
                            onClick={handleMenuClick}
                            sx={{
                                textTransform: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <MenuIcon fontSize="small" />
                            Danh mục
                        </Button>

                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuClose} component={Link} to="/category/ao">Áo</MenuItem>
                            <MenuItem onClick={handleMenuClose} component={Link} to="/category/quan">Quần</MenuItem>
                            <MenuItem onClick={handleMenuClose} component={Link} to="/category/phukien">Phụ kiện</MenuItem>
                            <MenuItem onClick={handleMenuClose} component={Link} to="/products">
                                Tất cả
                            </MenuItem>

                        </Menu>

                        {/* Thanh tìm kiếm */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '999px',
                                px: 2,
                                py: 0.5,
                                minWidth: 250,
                                maxWidth: 400,
                                ml: 2,
                                flexGrow: 1
                            }}
                        >
                            <SearchIcon sx={{ color: '#888', mr: 1 }} />
                            <InputBase
                                placeholder="Tìm kiếm"
                                sx={{ flex: 1, color: '#333' }}
                                inputProps={{ 'aria-label': 'tìm kiếm' }}
                            />
                        </Box>

                        <IconButton color="inherit" component={Link} to="/cart">
                            <ShoppingCartIcon />
                        </IconButton>

                        {isLoggedIn ? (
                            <Button
                                variant="outlined"
                                onClick={handleLogout}
                                sx={{
                                    color: '#000',
                                    borderColor: '#000',
                                    '&:hover': {
                                        borderColor: '#000',
                                        backgroundColor: 'rgba(0, 0, 0, 0.05)'
                                    }
                                }}
                            >
                                Log Out
                            </Button>
                        ) : (
                            <Button
                                variant="outlined"
                                component={Link}
                                to="/sign-in"
                                sx={{
                                    color: '#000',
                                    borderColor: '#000',
                                    '&:hover': {
                                        borderColor: '#000',
                                        backgroundColor: 'rgba(0, 0, 0, 0.05)'
                                    }
                                }}
                            >
                                Sign In
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Padding tránh nội dung bị che bởi AppBar cố định */}
            <Toolbar />
        </>
    );
}
