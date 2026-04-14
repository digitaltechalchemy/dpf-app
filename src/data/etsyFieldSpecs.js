/**
 * Etsy field constraints — character limits, max counts, etc.
 */

const etsyFieldSpecs = {
  title: { maxChars: 140, label: 'Listing Title' },
  tags: { maxCount: 13, maxCharsPerTag: 20, label: 'Tags' },
  description: { searchPreview: 160, label: 'Description' },
  photos: { maxCount: 20, recommended: '2000x2000px', formats: ['JPG', 'PNG'], label: 'Photos' },
  video: { maxCount: 1, maxSize: '100MB', duration: '5-15 sec', label: 'Video' },
  digitalFiles: { maxCount: 5, label: 'Digital Files' },
  price: { label: 'Price' },
  quantity: { digitalDefault: 999, label: 'Quantity' },
}

export default etsyFieldSpecs
