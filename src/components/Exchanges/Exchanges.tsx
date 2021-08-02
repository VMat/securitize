import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Affix, Button, Card, Input, Radio, Spin, message } from 'antd';
import { EditOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { first, get } from 'lodash';
import { GET_EXCHANGES } from './Exchanges.queries';
import { UPDATE_EXCHANGE } from './Exchanges.mutations';
import { store, dispatch, PROPERTIES } from '../../store';
import { useEffectAfterMount } from '../../customHooks';
import { EXCHANGE_TYPES } from '../../constants';

const { Button: RadioButton, Group } = Radio;

const Exchange: React.FC<(any)> = () => {
    const [editMode, setEditMode] = useState(false);
    const [rateInput, setRateInput] = useState();
    const [storedValues, setStoredValues] = useState(store.getState());
    const { loading, data } = useQuery(GET_EXCHANGES);
    const [updateExchange, { data: updateExchangeResponse }] = useMutation(UPDATE_EXCHANGE);

    useEffect(() => store.subscribe(() => setStoredValues(store.getState())), []);
    useEffect(() => {if (data) dispatch(PROPERTIES.EXCHANGES, data.exchanges)}, [data]);
    const activeExchange: any = useMemo(() => storedValues.exchanges ? first(storedValues.exchanges.filter((e: any) => e.name === storedValues[PROPERTIES.ACTIVE_EXCHANGE])) : {}, [storedValues[PROPERTIES.ACTIVE_EXCHANGE], storedValues[PROPERTIES.EXCHANGES]]);
    useEffect(() => {if (activeExchange) setRateInput(activeExchange.rate)}, [activeExchange, editMode]);
    useEffectAfterMount(() => {
        if (updateExchangeResponse) {
            message.success('Exchange updated successfully.');
            dispatch(PROPERTIES.ACTIVE_EXCHANGE, get(updateExchangeResponse, 'updateExchange.name'));
            setEditMode(false);
        }
    },[updateExchangeResponse]);

    const changeActiveExchange = useCallback((value) => {dispatch(PROPERTIES.ACTIVE_EXCHANGE, value)}, []);
    const updateExchangeRate = useCallback(() => {
        updateExchange({ variables: { payload: { _id: activeExchange._id, rate: Number(rateInput) } } });
    }, [rateInput, activeExchange]);
    
    return (
        <>
            {
                loading ? <div style={{ textAlign: 'center' }}><Spin /></div> : (
                    <Affix offsetTop={0}>
                        <Card style={{ width: 300, float: 'right' }}>
                            <Group value={activeExchange.name} onChange={(e) => changeActiveExchange(e.target.value)}>
                            {
                                data.exchanges.map((e: any) => <RadioButton key={e._id} value={e.name}>{e.name}</RadioButton>)
                            }
                            </Group>
                            {
                                activeExchange.name !== EXCHANGE_TYPES.ETHEREUM && (
                                    <Input type='number' value={rateInput} readOnly={!editMode} prefix={'Exchange rate: '} suffix={
                                        <Button type="text" icon={editMode ? (
                                            <>
                                                <CloseOutlined style={{ color: 'red' }} onClick={() => setEditMode(false)} />
                                                <CheckOutlined style={{ color: 'green' }} onClick={updateExchangeRate} />
                                            </>
                                        ) : <EditOutlined style={{ color: '#1890ff' }} onClick={() => setEditMode(true)} />} />}
                                        onChange={(e) => setRateInput(e.target.value as any)} 
                                    />
                                )
                            }
                        </Card>
                    </Affix>
                )
            }
        </>
    );
};

export default Exchange;
