/**
 * Prompt templates with {{variable}} slots — Sections 7 + 12
 */

const promptTemplates = {
  '2': `List all Brand Kits available in my connected Canva account. For each kit, show the Kit Name and Kit ID. If no kits are found, confirm whether Canva is properly connected.`,

  '3': `You are an expert Etsy digital product researcher. Perform a comprehensive Pain-Mining Triangle (PMT) analysis for the following niche:

SELLER IDENTITY:
{{step1.sellerIdentity}}

CUSTOMER HYPOTHESIS:
{{step1.customerHypothesis}}

NICHE KEYWORDS:
{{step1.nicheKeywords}}

Deliver a structured three-section report:

SECTION 1 — LANGUAGE MINING
- Search the Etsy marketplace for the niche keywords above
- Extract exact buyer phrases from: Etsy search autocomplete, top listing titles, buyer reviews (especially 4-star reviews with constructive feedback), and competitor listing descriptions
- Identify emotional trigger words and pain-point language
- List the top 20 buyer search phrases ranked by relevance

SECTION 2 — COMPETITOR ANALYSIS MATRIX
- Identify the top 10 competitors in this niche on Etsy
- For each competitor, analyze: price point, number of sales, star rating, key features, identified weaknesses (from reviews), and positioning strategy
- Create a comparison matrix
- Identify pricing sweet spots and feature gaps

SECTION 3 — SYNTHESIS & RECOMMENDATION
- Identify the top 3 underserved sub-niches
- List unmet buyer needs discovered through review mining
- Provide a clear GO or STOP recommendation with reasoning
- If GO: define the optimal product positioning, suggested price range, and key differentiators
- If STOP: explain why and suggest niche pivots to explore`,

  '4': `You are a digital product strategist. Using the Pain-Mining Triangle (PMT) Research below, create a comprehensive 10-section Product Brief.

PMT RESEARCH REPORT:
{{step3.aiOutput}}

ORIGINAL NICHE CONTEXT:
- Seller: {{step1.sellerIdentity}}
- Customer: {{step1.customerHypothesis}}
- Niche: {{step1.nicheKeywords}}
Create a detailed Product Brief with these 10 sections:

1. PRODUCT NAME — A compelling, SEO-friendly product name
2. TARGET CUSTOMER — Specific buyer persona with demographics, pain points, and buying motivation
3. CORE PROBLEM — The primary problem this product solves, in the buyer's own language
4. FORMAT & DELIVERABLES — Complete list of files: names, formats (XLSX, PDF, DOCX), what each contains
5. FEATURE LIST — All features organized by deliverable file, with specific counts and details
6. DIFFERENTIATOR — What makes this unique vs. top competitors from the PMT analysis
7. CONTENT OUTLINE — Detailed outline of every file: section headers, page breakdowns, tab structures, formulas
8. DESIGN DIRECTION — Visual style: color palette, fonts, layout preferences, mockup style
9. BUYER INSTRUCTIONS SUMMARY — Setup steps, customization guidance, support info overview
10. PRICING RECOMMENDATION — Price with justification from competitor analysis and market positioning`,

  '5a': `Using the approved Product Brief below, generate a Build Manifest: the complete ordered list of files to create for this digital product.

PRODUCT BRIEF:
{{step4.aiOutput}}

For each file in the manifest, provide:
1. FILE NUMBER (in build order)
2. FILE NAME (exact filename with extension)
3. FORMAT (XLSX, PDF, DOCX, etc.)
4. PURPOSE (one-line description of what this file does for the buyer)
5. CONTENT SUMMARY (bullet list of sections, tabs, pages, or key elements to include)
6. ESTIMATED COMPLEXITY (Simple / Medium / Complex)

List ALL deliverable files including the primary product file, supporting documents, bonus materials, and the READ_ME_FIRST buyer instructions.`,

  '5b': `Using the Product Brief and Build Manifest below, create the complete primary product file. Generate the ACTUAL file content — not a description of it.

PRODUCT BRIEF:
{{step4.aiOutput}}

BUILD MANIFEST:
{{step5a.aiOutput}}

CRITICAL INSTRUCTIONS:
- For spreadsheets: create an Excel workbook with ALL tabs, ALL column headers, ALL formulas, ALL dropdown values, and sample data rows. Include every cell.
- For PDFs: generate a formatted document with ALL pages, ALL copy, ALL section headers, and complete content.
- For documents: write the complete text with formatting, headings, and all content sections.
- Do NOT provide descriptions or outlines. Generate the ACTUAL finished content.
- Include professional formatting and layout structure.`,

  '5c': `Using the Product Brief and Build Manifest below, create the second product file (guide/PDF). Generate the ACTUAL complete content — not a description.

PRODUCT BRIEF:
{{step4.aiOutput}}

BUILD MANIFEST:
{{step5a.aiOutput}}

CRITICAL INSTRUCTIONS:
- Generate complete page-by-page content for the PDF guide
- Write ALL copy for every page: headers, body text, callout boxes, tips, and examples
- Include page structure: title page, table of contents, all content sections, closing page
- Do NOT provide an outline or brief. Write the FINISHED document copy.
- Format with clear hierarchy: H1, H2, H3, body text, bullet points, numbered lists`,

  '5d': `Using the Product Brief and Build Manifest below, create the remaining supporting product files. Generate the ACTUAL complete content for each file.

PRODUCT BRIEF:
{{step4.aiOutput}}

BUILD MANIFEST:
{{step5a.aiOutput}}

PREVIOUSLY CREATED FILES:
- File 1 (primary): {{step5b.aiOutput}}
- File 2 (guide): {{step5c.aiOutput}}

CRITICAL INSTRUCTIONS:
- Create complete content for EACH remaining file in the Build Manifest
- For each file: generate ALL content, ALL formatting, ALL data
- If no additional files are needed beyond what's been created, confirm that all deliverables are complete
- Do NOT provide descriptions. Generate ACTUAL finished content.`,

  '5e': `Using the Product Brief below, write the complete READ_ME_FIRST buyer instructions document. Generate the FULL finished document copy — not an outline.

PRODUCT BRIEF:
{{step4.aiOutput}}

BUILD MANIFEST:
{{step5a.aiOutput}}

Write the complete buyer-facing text for EVERY page:

PAGE 1: WELCOME
- Warm welcome message thanking the buyer
- Brief product overview (what they purchased)
- Contents list of all included files with descriptions

PAGE 2: GETTING STARTED
- Step-by-step setup instructions with exact actions
- Software requirements (if any)
- How to access/open each file type

PAGE 3: CUSTOMIZATION GUIDE
- Detailed instructions for personalizing each deliverable
- Which fields/sections to edit and how
- Tips for making it their own

PAGE 4: IMPLEMENTATION STRATEGY
- Recommended workflow for using the product
- Timeline suggestions
- Best practices for maximum value

PAGE 5: SUPPORT & THANK YOU
- FAQ section with common questions
- How to reach seller for support
- Review request (polite, not pushy)
- Thank you message

CRITICAL: This is the FINISHED document. Write all copy in full. Do NOT provide bullet-point summaries.`,

  '6a': `{{step4.aiOutput}}`,

  '6b': `Create a complete 15-30 second Etsy product promo video script for the product described in the Product Brief below. Format as a detailed shot list with exact timings.

PRODUCT BRIEF:
{{step4.aiOutput}}

For EACH shot in the video, provide:
1. TIMESTAMP (e.g., 0:00-0:03)
2. EXACT ON-SCREEN TEXT to display (word for word)
3. VISUAL DESCRIPTION (what the viewer sees — mockup, screen recording, lifestyle shot, etc.)
4. TRANSITION TYPE (cut, fade, slide left, zoom in, etc.)
5. CAPCUT-SPECIFIC INSTRUCTION (text animation style, zoom percentage, pan direction, speed ramp)

Required structure:
- OPENING HOOK (0:00-0:03): Attention-grabbing text + visual that stops the scroll
- PROBLEM STATEMENT (0:03-0:06): Pain point in buyer's language
- FEATURE SHOWCASE (0:06-0:18): 3-4 shots showing key product features/pages/tabs
- SOCIAL PROOF / BENEFIT (0:18-0:22): Transformation statement or benefit highlight
- CLOSING CTA (0:22-0:27): Price, "Shop Now", and urgency element

Include background music suggestion (royalty-free) and overall color/mood direction.`,

  '7': `You are an Etsy SEO specialist. Using the PMT Research and Product Brief below, generate a complete SEO package for this digital product listing.

PMT RESEARCH:
{{step3.aiOutput}}

PRODUCT BRIEF:
{{step4.aiOutput}}

Generate ALL of the following:

1. TITLE (max 140 characters)
- Front-load the most important keywords
- Include the product type and key differentiator
- Use natural language, not keyword stuffing
- Show character count

2. TAGS (exactly 13 tags, each max 20 characters)
- Use long-tail keyword phrases, not single words
- Do NOT repeat words already in the title
- Include buyer intent phrases from the PMT language mining
- Mix broad and specific terms
- Show character count for each tag

3. DESCRIPTION
- First 160 characters are visible in Etsy search — make them count
- Open with the core value proposition
- Include feature list with bullet points
- Address buyer pain points using PMT language
- End with call-to-action and what's included

4. RECOMMENDED ETSY CATEGORY PATH
- Provide the full category path (e.g., "Digital Prints > Planners & Calendars > Digital Planners")
- Base on niche research and competitor analysis

5. ATTRIBUTE RECOMMENDATIONS
- List applicable Etsy attributes for the selected category
- Include: item type, occasion, style, color, material (if relevant)`,

  '8': `You are an Etsy listing specialist. Assemble a complete, publication-ready listing package using all the data generated in this factory run.

PRODUCT BRIEF:
{{step4.aiOutput}}

SEO PACKAGE:
{{step7.aiOutput}}

Assemble the COMPLETE listing with every Etsy field populated:

LISTING TITLE: (from SEO Package)
TAGS: (all 13 from SEO Package)
DESCRIPTION: (full description from SEO Package)
CATEGORY: (recommended path from SEO Package)
ITEM TYPE: Digital files
PRICE: (from Product Brief pricing recommendation)
QUANTITY: 999
WHO MADE IT: I did
WHAT IS IT: A finished product
WHEN WAS IT MADE: Made to order

DIGITAL FILES INCLUDED:
(List all files from the Build Manifest with filenames and formats)

SHOP SECTION: (recommend based on product type)
RENEWAL: Automatic

LISTING CHECKLIST:
- [ ] Title is under 140 characters
- [ ] All 13 tags are unique and under 20 characters each
- [ ] Description opens with value proposition
- [ ] Category path is accurate
- [ ] All digital files are uploaded
- [ ] Thumbnails are 2000x2000px
- [ ] Price matches competitive analysis
- [ ] Buyer instructions are included as a file`,
}

export default promptTemplates
