import { Backdrop, Modal } from "@mui/material"

type ModalBackdropProps = {
    children: JSX.Element
}
function ModalBackdrop({children}:ModalBackdropProps) {
    return (
        <Backdrop open={true} >
            <Modal 
                open={true}
                sx={{
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center",
                }}
            >
                {children}
            </Modal>
        </Backdrop>
    )
}

export default ModalBackdrop