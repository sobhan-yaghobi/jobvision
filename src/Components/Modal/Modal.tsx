import React from "react";
import { Modal as AntModal } from "antd";

type ModalProps = {
    isOpen: boolean;
    OpenAction:
        | { mode: "SetState"; setState: React.Dispatch<React.SetStateAction<boolean>> }
        | { mode: "Functional"; function: Function };
    width?: number | string;
    height?: number | string;
    centerd: boolean;
    footer: null;
};

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
    isOpen,
    OpenAction,
    width,
    height,
    centerd,
    footer,
    children,
}) => {
    return (
        <>
            <AntModal
                open={isOpen}
                onCancel={() =>
                    OpenAction.mode === "SetState"
                        ? OpenAction.setState(false)
                        : OpenAction.mode === "Functional"
                        ? OpenAction.function()
                        : null
                }
                centered={centerd}
                footer={footer}
                forceRender
                bodyStyle={{ height }}
                width={width}
            >
                {children}
            </AntModal>
        </>
    );
};

export default Modal;
