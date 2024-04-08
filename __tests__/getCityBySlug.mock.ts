import { HttpResponse, delay, http } from "msw";

export const getCityBySlugHandlers = {
  filled: http.get(/cities\/.+/, () => {
    return HttpResponse.json({
      id: 'id',
      slug: 'slug-1',
      name: 'Slug 1'
    });
  }),
  filledWithDelay: http.get(/cities\/.+/, async () => {
    await delay(500);

    return HttpResponse.json({
      id: 'id',
      slug: 'slug-1',
      name: 'Slug 1'
    });
  }),
  error: http.get(/cities\/.+/, () => {
    return HttpResponse.json(
      {},
      {
        status: 404,
      }
    );
  }),
};
