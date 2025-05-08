'use client';

export const LocationWidget = ({ location, address }) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const locationParam = `lat=${lat}&lon=${lon}`;
            document.querySelector('input[name="location"]').value = locationParam;

            try {
                const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?${locationParam}&limit=1&appid=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch location data');
                }
                const data = await response.json();

                if (data && data.length > 0) {
                    const locationInfo = data[0];
                    // Update form fields with the data
                    document.querySelector('input[name="city"]').value = locationInfo.name || '';
                    document.querySelector('input[name="state"]').value = locationInfo.state || '';
                    // document.querySelector('input[name="zip"]').value = locationInfo.postalCode || '';
                    // You might need to adjust how you extract street information
                    // as the OpenWeatherMap API might not provide it directly
                }
            } catch (error) {
                console.error('Error fetching location data:', error);
            }
        });
    };

    return (
        <div>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Street</legend>
                <input name="street" type="text" className="input validator w-full" placeholder="Street" defaultValue={address?.street} />
            </fieldset>
            <div className="grid grid-cols-12 gap-4">
                <fieldset className="fieldset col-span-6">
                    <legend className="fieldset-legend">City</legend>
                    <input name="city" type="text" className="input validator w-full" placeholder="City" defaultValue={address?.city} />
                </fieldset>
                <fieldset className="fieldset col-span-2">
                    <legend className="fieldset-legend">State</legend>
                    <input name="state" type="text" className="input validator w-full" placeholder="State" defaultValue={address?.state} />
                </fieldset>
                <fieldset className="fieldset col-span-4">
                    <legend className="fieldset-legend">Zip Code</legend>
                    <input name="postalCode" type="text" className="input validator w-full" placeholder="Zip Code" defaultValue={address?.postalCode} />
                </fieldset>
            </div>
            <fieldset className="fieldset">
                <div className="indicator">
                    <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                    <legend className="fieldset-legend">Location</legend>
                </div>
                <div className="join">
                    <input name="location" type="text" className="input validator w-full" placeholder="Location" required defaultValue={location} />
                    <button type="button" className="btn btn-primary join-item" onClick={getLocation}>
                        <i className="fas fa-crosshairs"></i>
                    </button>
                </div>
                <p className="validator-hint">This field is required</p>
            </fieldset>
        </div>
    );
}