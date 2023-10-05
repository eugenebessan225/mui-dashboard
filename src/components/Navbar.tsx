// Navbar.js
import { AppBar, Toolbar, Typography, Avatar} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function Navbar() {
  return (
    <AppBar position="static" style={{ backgroundColor:  '#2196F3'}}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1}}>
          DISP
        </Typography>
        <Avatar  style={{ marginLeft: 2,}}>
          <AccountCircleIcon />
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}

