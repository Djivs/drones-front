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
        let regionName = urlParams.get('name_pattern')
        let status = urlParams.get('status')
        let district = urlParams.get('district') 
        if (regionName == null) {
            regionName = "";
        }
        if (status == null) {
            status = "";
        }
        if (district == null) {
            district = "";
        }

        const loadRegions = async()  => {
            const result = await getRegions(String(regionName), String(status), String(district))
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

            <Row xs={8} md={8} className='row row-cols-8 g-8'>
                {regions.map((item, index) => (
                    <div className="col-2" key={index} > 
                        <RegionCard {...{
                             imageUrl: (item.ImageName == '' ? '/region_image/empty.webp' : "/region_image/" + item.ImageName?.toString()),
                             regionName: item.Name,
                             pageUrl: window.location.href.split('?')[0] + "region?region_name=" + item.Name
                        }}></RegionCard>
                    </div>
                ))}
            </Row>
            
            

        </div>
        
    )
}

export default RegionsPage