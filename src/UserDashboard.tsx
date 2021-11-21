import { Add } from "@mui/icons-material";
import {  Button, Divider,  Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function UserDashboard() {

    return (
        <Box sx={{textAlign: "center"}}>
            <Typography variant="h5">Hallo &lt;user&gt;</Typography>
            <Typography variant="h2">0€</Typography>
            <Box sx={{marginTop: "10px"}}>
                <Tooltip title="Wenn man hier klickt, geht ein extra Suchfenster auf, in dem man einen anderen user suchen kann und dann eine Transaktion erstellen">
                    <Button 
                        variant="outlined" 
                        startIcon={<Add />} 
                    >
                        New Transaction
                    </Button>

                </Tooltip>
            </Box>
            <Divider sx={{margin: "20px 0px"}}/>
            <Box>
            liste mit transationen und settle depths
            </Box>
            

            Hier kommt dann die Tabelle hin
        </Box>
    )
}