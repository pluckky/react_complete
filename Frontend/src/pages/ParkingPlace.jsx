import { useParams } from 'react-router-dom';
import { ParkingZone } from '../components/ParkingZone';
import { Header2 } from '../components/Header2';


export function ParkingPlace() {
    const { zone } = useParams();

    return (
        <>
            <Header2 />
            <ParkingZone zone={zone} />
            
        </>
    )
}