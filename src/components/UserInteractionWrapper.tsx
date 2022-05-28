import { FormControl, Paper, Stack, Typography } from "@mui/material";
import { ClickAwayListener } from "@mui/base";

type UserInteractionWrapperProps = {
    onClickAway: (event: MouseEvent | TouchEvent) => void,
    title: string,
    children?: JSX.Element | JSX.Element[]
}

function UserInteractionWrapper({onClickAway, title, children}:UserInteractionWrapperProps) {
    return (
        <ClickAwayListener
            onClickAway={onClickAway}
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
        >
            <Paper sx={{padding: "2em", width: "700px", maxWidth: "100%", overflow: "auto", maxHeight: "100vh"}}>
                <Typography variant="h5">{title}</Typography>
                <FormControl sx={{width: "100%"}}>
                    <form>
                        <Stack direction="column" spacing={2}>
                            {children}
                        </Stack>
                    </form>
                </FormControl>
            </Paper>
        </ClickAwayListener>
    )
}

export default UserInteractionWrapper