import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close
} from "@mui/icons-material";
import { useDispatch, usedispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import NavSearch from "scenes/widgets/NavSearch";

const Navbar = (props) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  const firstName = `${user.firstName}`;

  return <FlexBetween padding="1rem" backgroundColor={alt} width={"100vw"}>
    <FlexBetween gap="3rem">
      <FlexBetween gap="5px">
        <img src='/imgs/travel_dreams_logo.png' className='main-nav-logo' alt='main logo'/>
       <p
        className='nav-title'
        onClick={() => navigate("/home")}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        >
          Travel Dreamcatcher
        </p>
      </FlexBetween>

      {isNonMobileScreen ? ( 
        <NavSearch
          searchParam={props.searchParam} 
          backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem" />) : ("")}
    
     
    </FlexBetween>

    {/* DESKTOP NAV */}
    {isNonMobileScreen ? ( 
        <Box>
          <span style={{paddingRight: "20px"}}>Mode:
          <IconButton onClick={() => dispatch(setMode())} >
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px"}} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} ></LightMode>
            )}
          </IconButton>
          </span>
          {/* <Message sx={{ fontSize: "25px"}} />
          <Notifications sx={{ fontSize: "25px"}} />
          <Help sx={{ fontSize: "25px"}} /> */}
          <FormControl variant="standard" value={firstName}>
            <Select
              placeholder={fullName}
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem 0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem"
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight
                }
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())} >Log Out</MenuItem>
            </Select>
          </FormControl>
        </Box> 
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

          {/* DESKTOP NAV */}
          {!isNonMobileScreen && isMobileMenuToggled && (
            <Box 
              position="fixed"
              right="0"
              bottom="0"
              height="100%"
              zIndex="10"
              maxWidth="500px"
              minWidth="200px"
              backgroundColor={background}
            >
              <Box display="flex" justifyContent="flex-end" p="1rem">
                <IconButton 
                  onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                  <Close />
                </IconButton>
              </Box>

              {/* MENU ITEMS */}
              <FlexBetween 
                display="flex" 
                flexDirection="column" 
                justifyContent="center" 
                alignItems="center" 
                gap="2rem"
              >
                <NavSearch
                  searchParam={props.searchParam} 
                  backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem" 
                /> 
                <IconButton 
                  onClick={() => dispatch(setMode())}
                  sx={{ fontSize: "25px" }}
                >
                  {theme.palette.mode === "dark" ? (
                    <DarkMode sx={{ fontSize: "25px"}} />
                  ) : (
                    <LightMode sx={{ color: dark, fontSize: "25px" }} ></LightMode>
                  )}
                </IconButton>
               
                <FormControl variant="standard" value={fullName} >
                  <Select
                    value={fullName}
                    sx={{
                      backgroundColor: neutralLight,
                      width: "150px",
                      borderRadius: "0.25rem",
                      p: "0.25rem 1rem",
                      "& .MuiSvgIcon-root": {
                        pr: "0.25rem",
                        width: "3rem"
                      },
                      "& .MuiSelect-select:focus": {
                        backgroundColor: neutralLight
                      }
                    }}
                    input={<InputBase />}
                  >
                    <MenuItem value={fullName}>
                      <Typography>{fullName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(setLogout())} >Log Out</MenuItem>
                  </Select>
                </FormControl>
              </FlexBetween> 
            </Box>
          )}
  </FlexBetween>
}

export default Navbar;