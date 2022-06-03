import ModalBackdrop from "./ModalBackdrop";
import Transaction from "./Transaction";
import { User } from "./types/types";

type TransactionModalProps = {
    close: ()=>void,
    users: User[]
}

function TransactionModal({close, users}:TransactionModalProps) {
    return (
        <ModalBackdrop>
            <Transaction close={close} users={users}/>
        </ModalBackdrop>
    )
}
export default TransactionModal


