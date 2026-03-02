# Routes & Click Map

## Route Definitions

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `HomePage` | Landing page with categories and latest posts |
| `/blog` | `BlogListPage` | Main blog feed with filters |
| `/blog/:slug` | `BlogDetailsPage` | Single post view |
| `/about` | `AboutPage` | Placeholder about page |
| `*` | `NotFoundPage` | 404 Error page |

## User Flows

### Header Navigation
- **Logo** -> `/`
- **Home** -> `/`
- **Blog** -> `/blog`
- **About** -> `/about`

### Blog Browsing
- **Category Card (Home)** -> `/blog?category={id}`
- **Post Card (Home/List)** -> `/blog/:slug`
- **Back Button (Details)** -> `/blog` (preserve previous query filters if possible)

### URL Parameters (Query Strings)
- `category`: Filter by category ID (e.g., `?category=nature`)
- `q`: Search keyword (e.g., `?q=sunset`)
- `page`: Pagination index (e.g., `?page=2`)
