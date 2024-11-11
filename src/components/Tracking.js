import React, { useState } from 'react';
import { fetchDeliveryStatus } from '../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faSearch, faBarcode, faExclamationCircle, faCheckCircle, faTruck } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const Tracking = () => {
    const { t } = useTranslation();
    const [deliveryCode, setDeliveryCode] = useState('');
    const [deliveryStatus, setDeliveryStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTrackStatus = async () => {
        if (!deliveryCode) {
            setError(t('tracking.enter_code_error'));
            return;
        }

        setLoading(true);
        setError(null);
        setDeliveryStatus(null);

        try {
            const status = await fetchDeliveryStatus(deliveryCode);
            setDeliveryStatus(status);
        } catch (err) {
            setError(t('tracking.fetch_error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tracking-container mx-auto max-w-full p-8 bg-white rounded-lg shadow-lg border border-dark-blue min-h-[450px]">
            <div className="bg-gradient-to-r from-[#1f237e] via-[#1a032e] to-[#0a237e] text-white p-8 rounded-t-lg shadow-lg mb-6 p-12">
                <h2 className="text-3xl font-semibold text-center mb-4">
                    <FontAwesomeIcon icon={faTruck} className="mr-2" />
                    {t('tracking.track_your_delivery')}
                </h2>
                <p className="text-lg text-center mb-6">
                    {t('tracking.enter_code_prompt')}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative w-full sm:w-2/3 max-w-md">
                    <FontAwesomeIcon icon={faBarcode} className="absolute left-3 top-3 text-dark-blue" />
                    <input
                        type="text"
                        value={deliveryCode}
                        onChange={(e) => setDeliveryCode(e.target.value)}
                        placeholder={t('tracking.enter_delivery_code')}
                        className="border border-dark-blue rounded-l-md pl-10 pr-3 py-3 focus:border-blue-800 focus:outline-none w-full"
                    />
                </div>

                <button
                    onClick={handleTrackStatus}
                    className="bg-dark-blue text-white font-semibold p-3 rounded-md hover:bg-blue-800 transition-all duration-300 w-full sm:w-auto"
                >
                    <FontAwesomeIcon icon={faSearch} className="mr-2" />
                    {t('tracking.check_progress')}
                </button>
            </div>

            {loading && (
                <div className="flex justify-center mt-4 text-dark-blue">
                    <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                </div>
            )}

            {error && (
                <div className="flex items-center justify-center text-red-600 font-semibold mt-4">
                    <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                    {error}
                </div>
            )}

            {deliveryStatus && !loading && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-dark-blue mb-4">
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                        {t('tracking.delivery_information')}
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-blue-50 border border-blue-300 table-auto">
                            <thead>
                                <tr className="text-left bg-dark-blue text-white">
                                    <th className="border px-4 py-2">{t('tracking.delivery_code')}</th>
                                    <th className="border px-4 py-2">{t('tracking.recipient_name')}</th>
                                    <th className="border px-4 py-2">{t('tracking.item_description')}</th>
                                    <th className="border px-4 py-2">{t('tracking.cost')}</th>
                                    <th className="border px-4 py-2">{t('tracking.from_address')}</th>
                                    <th className="border px-4 py-2">{t('tracking.to_address')}</th>
                                    <th className="border px-4 py-2">{t('tracking.status')}</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="text-left">
                                    <td className="border px-4 py-2">{deliveryStatus.delivery_code}</td>
                                    <td className="border px-4 py-2">{deliveryStatus.recipient_name}</td>
                                    <td className="border px-4 py-2">{deliveryStatus.item_description}</td>
                                    <td className="border px-4 py-2">{deliveryStatus.cost}</td>
                                    <td className="border px-4 py-2">{deliveryStatus.from_address}</td>
                                    <td className="border px-4 py-2">{deliveryStatus.to_address}</td>
                                    <td className="border px-4 py-2">{deliveryStatus.delivery_status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 p-4 bg-blue-100 border border-blue-300 rounded-lg">
                        <h4 className="text-lg font-semibold text-dark-blue mb-2">
                            <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                            {t('tracking.important_notes')}
                        </h4>
                        <div className="note-typing">
                            <p className="text-sm text-dark-blue">
                                {t('tracking.important_note_message')}
                            </p>
                            <ul className="mt-4 list-disc pl-5 text-sm text-dark-blue">
                                <li>{t('tracking.note_1')}</li>
                                <li>{t('tracking.note_2')}</li>
                                <li>{t('tracking.note_3')}</li>
                                <li>{t('tracking.note_4')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tracking;
