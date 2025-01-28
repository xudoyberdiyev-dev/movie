import * as React from 'react';
import PropTypes from 'prop-types';
import TvIcon from '@mui/icons-material/Tv';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import {createTheme} from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {AppProvider} from '@toolpad/core/AppProvider';
import {DashboardLayout} from '@toolpad/core/DashboardLayout';
import {Account, AccountPopoverFooter, AccountPreview, SignOutButton,} from '@toolpad/core/Account';
import {Outlet, useNavigate} from "react-router-dom";
import {AccountCircle, Comment, MovieCreation, Newspaper, Settings} from "@mui/icons-material";
import {ADMIN_URLS} from "../utils/URL.js";
import {Profiler, useEffect, useState} from "react";
import {GetMe} from "../connection/service/AuthService.js";
import {NotFountPage} from "../companents/NotFountPage.jsx";
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    }, colorSchemes: {light: true, dark: true}, breakpoints: {
        values: {
            xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536,
        },
    },
});

function DemoPageContent({pathname}) {
    return (<Box
        sx={{
            py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        }}
    >
        <Typography>Dashboard content for {0}</Typography>
    </Box>);
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function AccountSidebarPreview(props) {
    const {handleClick, open, mini} = props;
    return (<Stack direction="column" p={0} overflow="hidden">
        <Divider/>
        <AccountPreview
            variant={mini ? 'condensed' : 'expanded'}
            handleClick={handleClick}
            open={open}
        />
    </Stack>);
}

AccountSidebarPreview.propTypes = {
    /**
     * The handler used when the preview is expanded
     */
    handleClick: PropTypes.func, mini: PropTypes.bool.isRequired, /**
     * The state of the Account popover
     * @default false
     */
    open: PropTypes.bool,
};

const accounts = [{
    id: 1,
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
    projects: [{
        id: 3, title: 'Project X',
    },],
}, {
    id: 2, name: 'Bharat MUI', email: 'bharat@mui.com', color: '#8B4513', // Brown color
    projects: [{id: 4, title: 'Project A'}],
},];

function SidebarFooterAccountPopover() {
    return (<Stack direction="column">
        <Typography variant="body2" mx={2} mt={1}>
            Accounts
        </Typography>
        <MenuList>
            {accounts.map((account) => (<MenuItem
                key={account.id}
                component="button"
                sx={{
                    justifyContent: 'flex-start', width: '100%', columnGap: 2,
                }}
            >
                <ListItemIcon>
                    <Avatar
                        sx={{
                            width: 32, height: 32, fontSize: '0.95rem', bgcolor: account.color,
                        }}
                        src={account.image ?? ''}
                        alt={account.name ?? ''}
                    >
                        {account.name[0]}
                    </Avatar>
                </ListItemIcon>
                <ListItemText
                    sx={{
                        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%',
                    }}
                    primary={account.name}
                    secondary={account.email}
                    primaryTypographyProps={{variant: 'body2'}}
                    secondaryTypographyProps={{variant: 'caption'}}
                />
            </MenuItem>))}
        </MenuList>
        <Divider/>
        <AccountPopoverFooter>
            <SignOutButton/>
        </AccountPopoverFooter>
    </Stack>);
}

const createPreviewComponent = (mini) => {
    function PreviewComponent(props) {
        return <AccountSidebarPreview {...props} mini={mini}/>;
    }

    return PreviewComponent;
};

function SidebarFooterAccount({mini}) {
    const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
    return (<Account
        slots={{
            preview: PreviewComponent, popoverContent: SidebarFooterAccountPopover,
        }}
        slotProps={{
            popover: {
                transformOrigin: {horizontal: 'left', vertical: 'bottom'},
                anchorOrigin: {horizontal: 'right', vertical: 'bottom'},
                disableAutoFocus: true,
                slotProps: {
                    paper: {
                        elevation: 0, sx: {
                            overflow: 'visible',
                            filter: (theme) => `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                            mt: 1,
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                bottom: 10,
                                left: 0,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translate(-50%, -50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                },
            },
        }}
    />);
}

SidebarFooterAccount.propTypes = {
    mini: PropTypes.bool.isRequired,
};
export const Layout = (props) => {
    const token = localStorage.getItem("token")

    const navigate = useNavigate()
    const [roles, setRoles] = useState([])

    const getMe = async () => {
        try {
            const res = await GetMe(navigate)
            if (res.data.authorities.length < 5) {
                navigate("/dashboard")
            } else {
                setRoles(res.data.authorities)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const NAVIGATION = [{
        kind: 'header', title: 'Asosiy Bo\'limlar',
    }, {
        segment: `${ADMIN_URLS.dashboard}`, title: 'Dashboard', icon: <DashboardIcon/>,
    }, {
        segment: `${ADMIN_URLS.movie}`, title: 'Kinolar  ', icon: <MovieCreation/>,
    }, {
        segment: `${ADMIN_URLS.newMovie}`, title: 'Premyera Kinolar  ', icon: <LocalMoviesIcon/>,
    }, {
        segment: `${ADMIN_URLS.serialMovie}`, title: 'Serial Bo\'limi', icon: <TvIcon/>,
    }, {
        kind: "header", title: "Tashqi bolimlar"
    }, {
        segment: `${ADMIN_URLS.news}`, title: 'Reklama qoshish', icon: <Newspaper/>,
    }, {
        segment: `${ADMIN_URLS.complaint}`, title: 'Murojatlar', icon: <Comment/>,
    }, {
        kind: 'header', title: 'Admin uchun',
    }, {
        segment: `${ADMIN_URLS.profile}`, title: 'Profil', icon: <AccountCircle/>,
    }, {
        kind: 'header', title: 'Sozlamalar',
    }, {
        segment: `${ADMIN_URLS.settings}`, title: 'Sozlamalar', icon: <Settings/>,
    }]


    const n = useNavigate()
    const {window} = props;

    const [pathname, setPathname] = React.useState('/dashboard');
    const router = React.useMemo(() => {
        return {
            pathname, searchParams: new URLSearchParams(), navigate: (path) => {
                setPathname(String(path))
                n(path)
            },
        };
    }, [pathname]);

// Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    useEffect(() => {
        getMe()
    }, []);
    return (
        <>
            {token === null || token === undefined ? (
                <NotFountPage/>
            ) : (
                <AppProvider
                    navigation={NAVIGATION}
                    router={router}
                    theme={demoTheme}
                    window={demoWindow}
                >
                    <DashboardLayout sx={{padding: "10px 10px 10px 10px"}}
                                     slots={{toolbarAccount: () => null, sidebarFooter: SidebarFooterAccount}}
                    >
                        <Outlet context={{roles, token}}/>
                    </DashboardLayout>
                </AppProvider>
            )}
        </>
    );
};