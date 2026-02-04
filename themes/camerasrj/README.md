# CamerasRJ Theme

Custom Hugo theme for Cameras da CET RJ.

## Configuration
Define site and theme settings in `config.yaml`.

Suggested params:

```yaml
params:
  description: Cameras da CET-RIO (CET-RJ) em tempo real. Condicoes do transito ao vivo gratuitamente.
  keywords: cameras,cet-rio,cetrj,cet rj,cet rio,ao vivo,cameras cet rio ao vivo,transito,linha vermelha,avenida brasil,linha amarela
  googleSiteVerification: your-google-verification-token
  fbAdmins: 000000000
  adsenseAccount: ca-pub-xxxxxxxxxxxxxxxx
  analytics:
    ga4: G-XXXXXXXXXX
    ua: UA-XXXXXXXXX-X
```

## Layouts
- Base layout: `layouts/_default/baseof.html`
- Head metadata: `layouts/partials/head.html`
- Analytics: `layouts/partials/analytics.html`

## Assets
- Tailwind source lives in `assets/css/main.css`
- JavaScript lives in `static/js/js.js`
