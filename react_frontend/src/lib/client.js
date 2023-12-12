import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

//creates connection to sanity cms
export const client = createClient({
    projectId: import.meta.env.VITE_PROJECT_ID,
    dataset: 'production',
    apiVersion: 'v2022-03-07',
    useCdn: true,
    token: import.meta.env.VITE_FORM_KEY
  });
  
  const builder = imageUrlBuilder(client);

  export const urlFor = (source) => builder.image(source);

