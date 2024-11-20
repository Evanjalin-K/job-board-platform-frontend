import React, { useEffect, useState } from 'react';
import { companyServices } from '../services/companyServices';
import HomeFooter from './HomeFooter';

const Companies = () => {
    const [logos, setLogos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLogos = async () => {
            try {
                const response = await companyServices.getLogo();
                setLogos(response.data);
                console.log("Logo:", response.data);
                
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch company logos');
                setLoading(false);
            }
        };

        fetchLogos();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div >
            
            <div className="row">
                {logos.map((company, index) => (
                    <div key={index} className="col-md-3 mb-4">
                        <div className="card offset-md-4" style={{ border: 'none' }}>
                            <img
                                src={company.logoUrl}
                                alt={company.name}
                                className="card-img-top"
                                style={{ height: '100px', objectFit: 'contain', width: '70px' }}
                            />
                            </div>
                        </div>
                ))}
            </div>
            <HomeFooter/>
        </div>
    );
};

export default Companies;
