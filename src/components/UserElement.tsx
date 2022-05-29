import { User } from "../types/types";
import { Avatar, Box, Stack, Typography } from "@mui/material";

function UserElement({avatarUrl, username}:User) {
    return (
        <Box>
            <Stack direction="row" spacing={2}>
                <Avatar alt={username} src={avatarUrl ?? undefined}>{!avatarUrl && username[0]}</Avatar>
                <Typography sx={{display: "flex", alignItems: "center"}}>{username}</Typography>
            </Stack>
        </Box>
    )
}

export default UserElement