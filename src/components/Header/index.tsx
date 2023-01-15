import * as React from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import { CSSProperties } from "react";

const styles = {
  postJobBtn: {
    background: "#ff461f",
    width: 105,
    height: 30,
    textAlign: "center",
    borderRadius: 50,
    color: "white",
    alingSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
};

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const Router = useRouter();
  let [currentUser, setCurrentUser] = React.useState("");

  React.useEffect(() => {
    let getUser = async () => {
      try {
        let user = await Auth.currentAuthenticatedUser();
        setCurrentUser(user);
      } catch (e) {
        console.error(e);
      }
    };
    getUser();
  }, []);

  let signOut = async (e: any) => {
    e.preventDefault();
    await Auth.signOut();
    Router.push("/", "/", { shallow: false });
    Router.reload();
  };

  if (Router.pathname === "/create-job") {
    return <div />;
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="transparent" sx={{ boxShadow: "0 2px 10px 0 rgb(116 129 141 / 20%)" }}>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 3,
              display: { xs: "none", md: "flex" },
              fontWeight: 300,
              color: "inherit",
              textDecoration: "none",
              fontSize: "0.92rem",

            }}
          >
            JUNIOR DEV JOBS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {Boolean(currentUser) && (
                <MenuItem key={1} onClick={handleCloseNavMenu}>
                  <Link href="/profile">
                    <Typography textAlign="center">Profile</Typography>
                  </Link>
                </MenuItem>
              )}

              <MenuItem key={2} onClick={handleCloseNavMenu} style={{ background: "#ff461f" }}>
                <Link href={Boolean(currentUser) ? "/create-job" : "/sign-in"}>
                  <Typography textAlign="center" color={"white"}>
                    Post a Job
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 300,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JR DEV JOBS
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              fontSize: "0.92rem",
              alingSelf: "center",
              alignItems: "center",
            }}
            gap={3}
          >
            {Boolean(currentUser) && (
              <Link key={3} onClick={handleCloseNavMenu} href="/profile">
                PROFILE
              </Link>
            )}
            <Link key={4} style={styles.postJobBtn as CSSProperties} onClick={handleCloseNavMenu} href={Boolean(currentUser) ? "/create-job" : "/sign-in"}>
              POST A JOB
            </Link>
          </Box>

        {Boolean(currentUser) && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} size='small'>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={1} onClick={handleCloseUserMenu}>
                  <Typography onClick={signOut} textAlign="center">
                    Logout 
                  </Typography>
                </MenuItem>
              </Menu>
          </Box>
        )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
