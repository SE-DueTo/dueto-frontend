import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

function LoadingTitle() {
    const [count, setCount] = useState(0);

    const increment = ()=>{        
        setCount(oldCount => (oldCount+1) % 20)
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            increment()
        }, 1000)

        return (()=>{
            clearInterval(interval)
        })
    }, [])

    return (
        <Box onClick={increment} sx={{textAlign: "center"}}>
            <Typography variant="h3">DueTo</Typography>
            <Typography variant="h4">Coming Soon{".".repeat(count)}</Typography>
        </Box>
    )
}

export default LoadingTitle