import { HttpResponse, http } from "msw";

export const getCityBySlugHandlers = {
  filled: http.get(/cities\/.+/, () => {
    return HttpResponse.json({
      id: 'id',
      slug: 'slug-1',
      name: 'Slug 1'
    });
  }),
};
