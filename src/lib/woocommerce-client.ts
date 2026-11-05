import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const hasWooCredentials = Boolean(
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL &&
  process.env.WC_CONSUMER_KEY &&
  process.env.WC_CONSUMER_SECRET
);

const api = hasWooCredentials
  ? new WooCommerceRestApi({
      url: process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string,
      consumerKey: process.env.WC_CONSUMER_KEY as string,
      consumerSecret: process.env.WC_CONSUMER_SECRET as string,
      version: 'wc/v3',
      queryStringAuth: true, // use ?consumer_key=...&consumer_secret=... — required for local Apache/XAMPP which strips Authorization headers
    })
  : {
      get: async () => ({ data: [] }),
      post: async () => ({ data: [] }),
      put: async () => ({ data: [] }),
    };

export default api;