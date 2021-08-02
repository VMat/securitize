import React, { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Modal, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CREATE_WALLET } from './NewWallet.mutations';
import { useEffectAfterMount } from '../../customHooks';
import { dispatch, PROPERTIES } from '../../store';

const NewWalletForm: React.FC<(any)> =
    () => {
        const [showModal, setShowModal] = useState(false);
        const [addressInput, setAddressInput] = useState<string>('');
        const [createWallet, { data: createWalletResponse, loading, error: saveError }] = useMutation(CREATE_WALLET, { errorPolicy: 'all' });

        useEffectAfterMount(() => {
            if (createWalletResponse) {
                setAddressInput('');
                toggleShowModal();
                message.success('New wallet successfully added.');
                console.table('createWalletResponse', createWalletResponse);
                dispatch(PROPERTIES.NEW_WALLET, {...createWalletResponse.createWallet, loadingBalance: true });
            }
        }, [createWalletResponse]);
        useEffectAfterMount(() => {if (saveError) message.error(saveError?.message)}, [saveError]);

        const toggleShowModal = useCallback(() => setShowModal(!showModal), [showModal]);
        const onSave = useCallback(() => {
            createWallet({ variables: { payload: {address: addressInput} }});    
        }, [addressInput]);
        const onCancel = useCallback(() => {setAddressInput(''); setShowModal(false)}, []);
        
        return (
            <>
                <Button
                    type="primary"
                    style={{ float: 'right' }} 
                    shape="circle"
                    icon={<PlusOutlined />}
                    size={'large'}
                    onClick={toggleShowModal}
                />
                <Modal title="Add new wallet" visible={showModal} onOk={onSave} onCancel={onCancel} okButtonProps={{ disabled: !addressInput, loading }}>
                    <Input value={addressInput} placeholder={'Enter your wallet address...'} onChange={(e: any) => setAddressInput(e.target.value)} />
                </Modal>
            </>
        );
    }

export default NewWalletForm;
