const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export const getEvents = async () => {
  const res = await fetch(`${base_url}/events`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();

  return data.events;
};

export const getEventById = async (id: number) => {
  try {
    const res = await fetch(`${base_url}/events/${id}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();

    return data.events;
  } catch (err) {
    console.log(err);
  }
};

export const getAllEvents = async (
  currentPage: number,
  category?: string,
  location?: string,
  search?: string
) => {
  const categoryQuery = category
    ? `&category=${encodeURIComponent(category)}`
    : "";
  const locationQuery = location
    ? `&location=${encodeURIComponent(location)}`
    : "";
  const searchQuery = search ? `&search=${encodeURIComponent(search)}` : "";

  const url = `${base_url}/events/all?page=${currentPage}${categoryQuery}${locationQuery}${searchQuery}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const data = await res.json();
  console.log("Response data:", data); // Log the response data

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

export const getEventDetail = async (id: number, status?: string) => {
  try {
    const statusQuery = status ? `&status=${encodeURIComponent(status)}` : "";

    const url = `${base_url}/events/${id}?${statusQuery}`;

    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch event with ID: ${id}`);
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Error fetching event details:", err);
    throw err;
  }
};
