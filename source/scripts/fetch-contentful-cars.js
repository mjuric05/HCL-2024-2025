require('dotenv').config({ path: '.env.local' });
const { createClient } = require('contentful');

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

async function fetchCarsAndGenerateSQL() {
  try {
    console.log('Fetching cars from Contentful...');
    
    const response = await client.getEntries({
      content_type: 'car'
    });

    const cars = response.items;
    console.log(`Found ${cars.length} cars in Contentful`);

    // Generate SQL INSERT statement
    const sqlValues = cars.map(car => {
      const title = car.fields.title || 'Unknown';
      const price = car.fields.price || 0;
      const size = car.fields.size || 'medium';
      
      // Extract plain text from description
      let description = 'No description available';
      if (car.fields.description && car.fields.description.content) {
        const textNodes = car.fields.description.content
          .filter(node => node.nodeType === 'paragraph')
          .map(paragraph => 
            paragraph.content
              .filter(content => content.nodeType === 'text')
              .map(text => text.value)
              .join('')
          )
          .join(' ');
        description = textNodes || 'No description available';
      }
      
      // Get image URL - ensure it's clean without line breaks and extra slashes
      let imageUrl = '';
      if (car.fields.thumbnail?.fields?.file?.url) {
        const rawUrl = car.fields.thumbnail.fields.file.url;
        // Remove any leading slashes and ensure proper https prefix
        const cleanUrl = rawUrl.startsWith('//') ? `https:${rawUrl}` : rawUrl;
        imageUrl = cleanUrl.replace(/\s+/g, '').replace(/\/+/g, '/').replace(':/', '://');
      }

      return `('${title}', '${description}', ${price}, '${size}', '${imageUrl}')`;
    }).join(',\n');

    console.log('--- CLEAN SQL INSERT STATEMENT ---');
    console.log(`INSERT INTO public.cars (title, description, price, size, thumbnail_url) VALUES`);
    console.log(sqlValues + ';');
    
    console.log('\n--- CAR DATA PREVIEW ---');
    cars.forEach((car, index) => {
      console.log(`${index + 1}. ${car.fields.title} - $${car.fields.price} (${car.fields.size})`);
    });

  } catch (error) {
    console.error('Error fetching cars:', error);
  }
}

fetchCarsAndGenerateSQL();
