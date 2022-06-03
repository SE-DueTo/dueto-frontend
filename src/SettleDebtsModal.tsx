import ModalBackdrop from "./ModalBackdrop";
import SettleDebts from "./SettleDebts";
import { User } from "./types/types";

type SettleDebtsModalProps = {
    close: ()=>void,
    users: User[]
}
export default function SettleDebtsModal(props:SettleDebtsModalProps) {
    return (
        <ModalBackdrop>
            <SettleDebts {...props}/>
        </ModalBackdrop>
    )
}