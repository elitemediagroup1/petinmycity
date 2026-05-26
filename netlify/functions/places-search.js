const fetch = require('node-fetch');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { zip, type } = JSON.parse(event.body);
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    // First geocode the ZIP to get coordinates
    const geoRes = await fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' + zip + '&key=' + apiKey);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ error: 'ZIP code not found' })
      };
    }

    const location = geoData.results[0].geometry.location;
    const lat = location.lat;
    const lng = location.lng;
    const cityName = geoData.results[0].address_components
      .find(c => c.types.includes('locality'))?.long_name || zip;

    // Search for pet services nearby
    const keyword = type || 'pet';
    const placesRes = await fetch(
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng +
      '&radius=8000&keyword=' + encodeURIComponent(keyword) + '&key=' + apiKey);
    const placesData = await placesRes.json();

    const results = (placesData.results || [])
      .slice(0, 6)
      .map(place => ({
        name: place.name,
        address: place.vicinity,
        rating: place.rating || null,
        total_ratings: place.user_ratings_total || 0,
        open_now: place.opening_hours?.open_now,
        place_id: place.place_id,
        maps_url: 'https://www.google.com/maps/place/?q=place_id:' + place.place_id
      }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        city: cityName,
        lat,
        lng,
        results
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
