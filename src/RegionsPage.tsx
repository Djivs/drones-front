import {FC, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import './RegionsPage.css'

import { Region } from './modules/ds'
import { getRegions } from './modules/get-regions';

import { Col, Row, Modal, Button } from 'react-bootstrap'
import RegionCard from './components/RegionCard';
import RegionsFilter from './components/RegionsFilter';

import store, { useAppDispatch } from './store/store';
import cartSlice from './store/cartSlice';

import ModRegionsPage from './ModRegionsPage';

const RegionsPage: FC = () => {
    const {userRole} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const dispatch = useAppDispatch()

    const [regions, setRegions] = useState<Region[]>([])
    const {booked} = useSelector((state: ReturnType<typeof store.getState> ) => state.cart)

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        var regionName = urlParams.get('name_pattern')
        var status = urlParams.get('status')
        if (regionName == null) {
            regionName = "";
        }
        if (status == null) {
            status = "";
        }

        const loadRegions = async()  => {
            const result = await getRegions(String(regionName), String(status))
            setRegions(result)

        }

        loadRegions()

    }, []);

    const handleModalClose= () => {
        dispatch(cartSlice.actions.disableBooked())
    }

    if (userRole?.toString() == '2' || userRole?.toString() == '3') {
        return (
            <ModRegionsPage></ModRegionsPage>
        )
    }

    return (

        <div>
            <Modal show = {booked} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Регион добавлен в корзину</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="success" onClick={() => {dispatch(cartSlice.actions.disableBooked())}}>
                      Ок
                    </Button>
                </Modal.Footer>
            </Modal>

            <RegionsFilter></RegionsFilter>
            <p></p>

            <Row xs={4} md={4} className='row row-cols-3 g-4'>
                {regions.map((item, index) => (
                    <Col key={index} > 
                        <RegionCard {...{
                             imageUrl: (item.ImageName == '' ? '/region_image/empty.webp' : "/region_image/" + item.ImageName?.toString()),
                             regionName: item.Name,
                             pageUrl: window.location.href.split('?')[0] + "region?region_name=" + item.Name
                        }}></RegionCard>
                    </Col>
                ))}
            </Row>
            
            

        </div>
        
    )
}

export default RegionsPage