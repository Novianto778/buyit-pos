import React from 'react';
import useModalStore from '../../store/modalStore';
import Portal from './Portal';

const ModalContainer = ({ children }) => {
    const isModalOpen = useModalStore((state) => state.isModalOpen);

    return <>{isModalOpen && <Portal>{children}</Portal>}</>;
};

export default ModalContainer;
