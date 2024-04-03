import { HttpResponse, http } from "msw";

export const getStreetMarketBySlugHandlers = {
  filled: http.get(/street-markets\/.+/, () => {
    return HttpResponse.json({
      id: 'id',
      name: 'name 1',
      slug: 'name-1',
      neighborhood: 'Centro',
      apperture: 17,
      closure: 21,
      weekday: 'monday',
      location: 'https://maps.app.goo.gl/MNs44SnyPPXMfHGW6'
    });
  }),
};
