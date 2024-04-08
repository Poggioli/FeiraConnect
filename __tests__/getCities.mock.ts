import { HttpResponse, http, delay } from "msw";

export const getCitiesHandlers = {
  filledOnePage: http.get(/cities/, () => {
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
          id: "222",
          slug: "slug",
          name: "Slug",
        },
      ],
    });
  }),
  filledMultPagesPageOne: http.get(/cities/, () => {
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
          slug: `slug-${item}`,
          name: `Slug ${item}`,
        })),
      ],
    });
  }),
  empty: http.get(/cities/, () => {
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
  error: http.get(/cities/, () => {
    return HttpResponse.json(
      {},
      {
        status: 500,
      }
    );
  }),
  filledOnePageWithDelay: http.get(/cities/, async () => {
    await delay(500);

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
          id: "222",
          slug: "slug",
          name: "Slug",
        },
      ],
    });
  }),
};
