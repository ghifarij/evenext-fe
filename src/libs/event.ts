const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export const getEvents = async () => {
  const res = await fetch(`${base_url}/events`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();

  return data.events;
};

export const getAllEvents = async (currentPage: number, category?: string) => {
  const query = category ? `&category=${category}` : "";
  const res = await fetch(
    `${base_url}/events/all?page=${currentPage}${query}`,
    {
      next: { revalidate: 60 },
    }
  );
  const data = await res.json();

  return {
    events: data.events,
    totalPage: data.totalPage,
  };
};

export const getEventSlug = async (slug: string) => {
  const res = await fetch(`${base_url}/events/${slug}`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();

  return data.event;
};
