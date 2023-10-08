import React from "react";
import { Modal as AntModal } from "antd";

type ModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    width?: number | string;
    height?: number | string;
    centerd: boolean;
    footer: null;
};

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
    isOpen,
    setIsOpen,
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
                onCancel={() => setIsOpen(false)}
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
