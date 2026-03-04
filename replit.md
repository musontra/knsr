# Meme Kanseri Destek Mobil

A breast cancer support mobile application built with Expo / React Native.

## Architecture

### Frontend (Expo React Native)
- **Framework**: Expo SDK with Expo Router (file-based routing)
- **State**: React Context (AuthContext) + AsyncStorage for persistence
- **UI**: Custom components with React Native StyleSheet
- **Icons**: @expo/vector-icons (Ionicons, MaterialIcons, MaterialCommunityIcons, Feather)

### Backend (Express.js)
- **Port**: 5000
- **Routes**: `/api/*` prefix
- Serves landing page at root `/`

## App Structure

```
app/
  _layout.tsx          # Root layout with AuthProvider, QueryClientProvider
  index.tsx            # Entry point: redirects based on auth state
  (auth)/
    _layout.tsx        # Auth stack layout
    login.tsx          # Login screen
    register.tsx       # Registration screen
  (main)/
    _layout.tsx        # Main stack layout with header theming
    dashboard.tsx      # Home dashboard with 9 feature tiles
    belirtiler.tsx     # Symptoms list
    belirti-detay.tsx  # Symptom detail with video recommendations
    belirti-takvimi.tsx # Symptom timeline with SVG bar charts
    uzmana-sor.tsx     # Ask expert (text or audio)
    hasta-deneyimleri.tsx # Patient experience videos
    kan-tahlili.tsx    # Blood test upload (camera/gallery)
    covid19.tsx        # COVID-19 information
    meme-kanseri.tsx   # Breast cancer information
    iletisim.tsx       # Contact form
    hakkinda.tsx       # About page
context/
  AuthContext.tsx      # Auth state with AsyncStorage persistence
constants/
  colors.ts            # Theme colors (teal/pink palette)
```

## Theme Colors
- Primary: `#4CBFB4` (teal)
- Accent: `#F48FB1` (pink)
- Background: `#FFFFFF`
- Background Secondary: `#F5F9F9`
- Text: `#1A2E35`

## Key Features
- Auth: Login/Register with AsyncStorage persistence
- Dashboard: 9 feature cards grid
- Symptom Management: List + detail with video recommendations
- Symptom Calendar: Weekly charts (frequency & severity) with log form
- Ask Expert: Text or simulated audio recording flow
- Patient Experiences: Video grid with duration badges
- Blood Test Upload: Camera or gallery picker with success modal
- COVID-19 & Breast Cancer Info: Rich info pages with video lists
- Contact Form: Full form with send simulation
- About Page: App info, stats, legal links

## Workflows
- **Start Backend**: `npm run server:dev` (port 5000)
- **Start Frontend**: `npm run expo:dev` (port 8081)
