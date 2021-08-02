import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { orderBy, first } from 'lodash';
import { Alert, Badge, Statistic, Card, Row, Col, Skeleton, message, Empty, Spin } from 'antd';
import { StarFilled, StarOutlined, EllipsisOutlined } from '@ant-design/icons';
import { GET_WALLETS, UPDATE_WALLET } from './Wallets.queries';
import NewWalletForm from '../NewWallet/NewWallet';
import { store, dispatch, PROPERTIES } from '../../store';
import { useEffectAfterMount } from '../../customHooks';
import './Wallets.css';

const { Ribbon } = Badge;

const Wallets: React.FC<(any)> =
    () => {
        const { loading, data, refetch } = useQuery(GET_WALLETS, { fetchPolicy: 'network-only' });
        const [updateWallet, { data: updateWalletResponse }] = useMutation(UPDATE_WALLET);
        const [storedValues, setStoredValues] = useState(store.getState());

        useEffect(() => store.subscribe(() => setStoredValues(store.getState())), []);
        useEffect(() => {if (data) dispatch(PROPERTIES.WALLETS, data.wallets)}, [data]);
        useEffectAfterMount(() => {refetch()}, [storedValues[PROPERTIES.REFETCH_WALLETS]]);
        useEffectAfterMount(() => {
            if (updateWalletResponse) {
                message.success('Wallet updated successfully.');
                dispatch(PROPERTIES.REFETCH_WALLETS, updateWalletResponse);
            }
        }, [updateWalletResponse]);

        const updateIsFavorite  = useCallback((id, prevState) => {
            // Updating model and view
            updateWallet({ variables: { payload: { _id: id, isFavorite: !prevState } } });
            dispatch(PROPERTIES.CHANGE_FAVORITE, { _id: id, isFavorite: !prevState });
        }, []);

        const wallets = useMemo(() => storedValues[PROPERTIES.WALLETS] ? storedValues[PROPERTIES.WALLETS] : [], [storedValues[PROPERTIES.WALLETS]]);
        const activeExchange: any = useMemo(() => storedValues.exchanges ? first(storedValues.exchanges.filter((e: any) => e.name == storedValues.activeExchange)) : {}, [storedValues.activeExchange, storedValues.exchanges]);
        
        return (
            <div className="site-statistic-demo-card">
                {
                loading ? <Skeleton active /> : (
                    <div>
                        <Row gutter={24}>
                        {
                            wallets.length ?
                                orderBy(wallets, 'isFavorite', 'desc').map((e: any) => (
                                    <Col key={e.address} lg={8} md={24} sm={24}>
                                        <Ribbon color='black' text={e.isFavorite ? <StarFilled style={{ color: 'yellow'}} onClick={() => updateIsFavorite(e._id, e.isFavorite)} /> : <StarOutlined onClick={() => updateIsFavorite(e._id, e.isFavorite)} />} >
                                            <Card style={{ height: 150 }}>
                                                <Statistic
                                                    title={<span style={{ wordWrap: 'break-word' }}>{`address: ${e.address}`}</span>}
                                                    value={e.loadingBalance ? 'Getting' : e.balance * activeExchange.rate}
                                                    precision={2}
                                                    valueStyle={{ color: e.loadingBalance ? '#1890ff' : '#3f8600' }}
                                                    suffix={e.loadingBalance ? <Spin indicator={<EllipsisOutlined style={{ fontSize: 48 }} />} /> : <span>{activeExchange.name}</span>}
                                                />
                                                {
                                                    e.isOld && <Alert message="This wallet is old" type="warning" showIcon />
                                                }
                                            </Card>
                                        </Ribbon>
                                    </Col>
                                )) : <Empty />
                        }
                        </Row>
                        <NewWalletForm />
                    </div>
                )}
            </div>
        )
    };

export default Wallets;
