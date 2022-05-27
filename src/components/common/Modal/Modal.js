import React from 'react';
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux';
import { modalClose } from '../../../features/mySlice/mySlice';
import ProductModal from './ProductModal';
import UsersModal from './UsersModal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const ModalShow = ({ title }) => {
    const { modalIsOpen, Value } = useSelector(state => ({ ...state.myActions }))
    console.log(modalIsOpen, Value)
    const dispatch = useDispatch()
    console.log(title)
    return (
        <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={() => dispatch(modalClose())}
            style={customStyles}
            contentLabel="Example Modal"
        >
            {
                title === 'ManageUsers' &&
                <UsersModal value={Value} />
            }
            {
                title === 'ManageProducts' &&
                <ProductModal />
            }
        </Modal>
    );
};

export default ModalShow;