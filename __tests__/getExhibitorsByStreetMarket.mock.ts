import { HttpResponse, http, delay } from "msw";

export const getExhibitorsByStreetMarketHandlers = {
  filledOnePage: http.get(/^.+\/exhibitors/, () => {
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
          id: "id",
          name: "name 1",
          slug: "name-1",
          description: "description",
          whatsApp: "19912345678",
          website: "http://google.com.br",
          phone: "19912345678",
          items: ["item 1", "item 2"],
        },
      ],
    });
  }),
  filledMultPagesPageOne: http.get(/^.+\/exhibitors/, () => {
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
          description: "description",
          whatsApp: "19912345678",
          website: "http://google.com.br",
          phone: "19912345678",
          items: ["item 1", "item 2"],
        })),
      ],
    });
  }),
  filledOnePageWithDelay: http.get(/^.+\/exhibitors/, async () => {
    await delay(1000);

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
          id: "id",
          name: "name 1",
          slug: "name-1",
          description: "description",
          whatsApp: "19912345678",
          website: "http://google.com.br",
          phone: "19912345678",
          items: ["item 1", "item 2"],
        },
      ],
    });
  }),
  empty: http.get(/^.+\/exhibitors/, () => {
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
  error: http.get(/^.+\/exhibitors/, () => {
    return HttpResponse.json(
      {},
      {
        status: 500,
      }
    );
  }),
};
