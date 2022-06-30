import { Box, Paper, styled, Typography } from "@mui/material";
import bg from "../images/bg.webp";

import img01 from "../images/main/01.jpg";
import img02 from "../images/main/02.jpg";
import img03 from "../images/main/03.jpg";


function Main() {

    const StyledImg = styled("img")({
        width: "100%",
        transition: ".5s",
        display: "block",
        maxWidth: "300px",
        "&:hover": {
            transform: "scale(1.1) rotate(5deg)",
        }
    })

    return (
        <Box sx={{
            textAlign: "center",
        }}>
            <Box sx={{
                background: `url(${bg})`,
                height: "50vh",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                marginBottom: 3,
                "&:after": {
                    content: "''",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    backgroundColor: "rgba(10, 10, 10, 0.5)",
                }
            }}>
                <Typography sx={{zIndex: "2"}} variant="h3">DueTo</Typography>
            </Box>
            <Typography 
                variant="h4"
                sx={{
                    marginBottom: 5,
                }}
            >
                Dues management for everyone
            </Typography>
            <Box sx={{
                width: "1000px",
                maxWidth: "fit-content",
                margin: "auto",
            }}>

                <Box
                    sx={{  
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1fr 1fr 1fr",
                        },
                        gridGap: "20px",
                        margin: "auto",
                        padding: "20px",
                        width: "100%",
                    }}
                >
                    <Box>
                        <Typography variant="h5">See your dues</Typography>
                        <Box sx={{overflow: "hidden", display: "inline-block", margin: "auto"}}>
                            <StyledImg src={`${img01}`} />
                        </Box>
                        <Typography>
                            Are you afraid of forgetting to pay money to friends who were kind enough to lend you some?

                            See your total amount of dues to everyone and an in-detail view of how much money you owe to each person.
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5">List dues from friends</Typography>
                        <Box sx={{overflow: "hidden", display: "inline-block", margin: "auto"}}>
                            <StyledImg src={`${img02}`}/>
                        </Box>
                        <Typography>
                            Ever lost track of how much other people have to pay to you?

                            Have money people owe you listed in a modern interface to keep your overview. You will never loose track of who owes you what.
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5">Manage dues in Groups</Typography>
                        <Box sx={{overflow: "hidden", display: "inline-block", margin: "auto"}}>
                            <StyledImg src={`${img03}`}/>
                        </Box>
                        <Typography>
                            Do you want to go on a trip with your friends but don’t want to worry about how much money who should pay?

                            Create a group and elegantly manage your group expences.
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Paper sx={{
                marginTop: 5,
                padding: 5,
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr 1fr 1fr",
                },
                gridGap: "10px",
            }}>
            <Paper elevation={5} sx={{
                    padding: 2,
                }}>
                <Typography variant="h6">About us</Typography>
                <Typography sx={{
                    marginTop: 2,
                }}>
                    We are three Computer-Science students wanting to revolutionize dues-management.
                </Typography>
            </Paper>
            <Box></Box>
                <Paper elevation={5} sx={{
                    padding: 2,
                }}>
                    <Typography sx={{
                        marginTop: "10px",
                        "&:before": {
                            content: "'“ '",
                            fontSize: "200%",
                            fontFamily: "arial-black",
                            fontWeight: "bold",
                        }
                    }}>
                        You must gain control over your money or the lack of it will forever control you.
                    </Typography>
                    <Typography sx={{
                        marginTop: 2,
                        fontStyle: "italic",
                        fontSize: "75%",
                        "&:before": {
                            content: "'- '",
                        }
                    }}>
                        DAVE RAMSEY
                    </Typography>
                </Paper>
            </Paper>
        </Box>
    )
}

export default Main