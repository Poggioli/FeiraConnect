import { HttpResponse, http } from "msw";

export const getStreetMarketsByCityHandlers = {
  filledOnePage: http.get(/^.+\/street-markets/, () => {
    return HttpResponse.json({
      metadata: {
        currentPage: 1,
        itemsPerPage: 10,
        totalPages: 1,
        totalItems: 1,
        isLastPage: true,
      },
      items: [
        {
          id: 'id',
          name: 'name 1',
          slug: 'name-1',
          neighborhood: 'Centro',
          apperture: 17,
          closure: 21,
          weekday: 'monday',
          location: 'https://maps.app.goo.gl/MNs44SnyPPXMfHGW6'
        },
      ],
    });
  }),
  filledMultPagesPageOne: http.get(/^.+\/street-markets/, () => {
    return HttpResponse.json({
      metadata: {
        currentPage: 1,
        itemsPerPage: 10,
        totalPages: 2,
        totalItems: 11,
        isLastPage: false,
      },
      items: [
        ...Array.from(Array(10).keys()).map((item) => ({
          id: item,
          name: `name ${item}`,
          slug: `name-${item}`,
          neighborhood: item,
          apperture: 17,
          closure: 21,
          weekday: 'monday',
          location: 'https://maps.app.goo.gl/MNs44SnyPPXMfHGW6'
        })),
      ],
    });
  }),
  empty: http.get(/^.+\/street-markets/, () => {
    return HttpResponse.json({
      metadata: {
        currentPage: 1,
        itemsPerPage: 10,
        totalPages: 1,
        totalItems: 0,
        isLastPage: true,
      },
      items: [],
    });
  }),
};
