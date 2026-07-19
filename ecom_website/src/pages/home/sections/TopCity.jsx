import React from 'react';
import { useNavigate } from 'react-router-dom';
import { topCities } from '../../../utils/apiData';
import Container from '../../../components/common/Container';
import CardLayout from '../../../components/layout/CardLayout';

const TopCity = () => {
    const navigate = useNavigate();

    return (
        <Container className="bg-white">
            <div className='py-50 w-full'>
                <h2 className="title-text text-dark font-600">Top Cities</h2>

                {/* --- Slider Layout of Cities using CardLayout --- */}
                <CardLayout
                    items={topCities}
                    cardType="city"
                    isSlider={true}
                    cols="4"
                    mdCols="2"
                    smCols="1"
                    className="mt-20"
                    onCardClick={(item) => navigate('/products', { state: { city: item.name } })}
                />
            </div>
        </Container>
    );
};

export default TopCity;