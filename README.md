# RadekWeb - Video Portfolio
https://brychjakub.github.io/radekweb.github.io/

## Jak změnit hlavní obrázky na stránce

Stránka používá **plně dynamickou detekci**

### Sekce "O mně" 
- Přidej jakýkoliv obrázek do složky: `images/introImage/`
- Systém automaticky najde a použije **první dostupný obrázek**

### Sekce "Co dělám a proč"
- Přidej jakýkoliv obrázek do složky: `images/workImage/`
- Systém automaticky najde a použije **první dostupný obrázek**

### Sekce "Portfolio"
- Přidej jakýkoliv obrázek do složky: `images/portfolioImage/`
- Systém automaticky najde a použije **první dostupný obrázek**

**Prostě přidej obrázek s JAKÝMKOLIV názvem do příslušné složky!**
**Systém je plně dynamický - načítá pouze obrázky, které skutečně existují.**

## Jak přidat obrázky do slideshow

1. Přidej obrázky do složky `images/slideshow/`
2. **Plně dynamická detekce** - systém najde VŠECHNY obrázky ve složce
3. **Žádné hardcoded názvy** - funguje s jakýmkoliv názvem souboru
4. Podporované formáty: JPG, JPEG, PNG, GIF, WEBP (včetně velkých písmen)
5. Obrázky se automaticky načtou a budou se přepínat každých 5 sekund
6. **Sekvenční detekce** - minimální 404 chyby
7. **Není potřeba upravovat kód** - stačí přidat obrázky do složky!

### Automatická aktualizace seznamu obrázků

Pro aktualizaci JavaScript souborů se seznamy obrázků spusť lokálně v terminálu:

```bash
php generate-slideshow-list.php
```

nebo změň názvy v .js souborech (intro-images.js, portfolio-images.js, work-images.js nebo slideshow-images.js)

**Tento script automaticky:**
- Prohledá všechny složky s obrázky (slideshow, introImage, portfolioImage, workImage)
- Vygeneruje JavaScript soubory se seznamy obrázků:
  - `slideshow-images.js` - pro slideshow
  - `intro-images.js` - pro sekci "O mně"
  - `portfolio-images.js` - pro sekci "Portfolio"  
  - `work-images.js` - pro sekci "Co dělám a proč"
- **Vynechá složku favicon** - ta se nezpracovává
- Podporuje všechny běžné formáty obrázků
- **Spusť po každém přidání nových obrázků** do kterékoliv složky!

## Jak přidat video do portfolia

1. Otevři `index.html`
2. Najdi sekci `<article id="about">`
3. Zkopíruj existující video položku:

```html
<div class="video-item" data-youtube-id="YOUR_VIDEO_ID" title="YOUR_VIDEO_TITLE">
    <a href="https://youtu.be/YOUR_VIDEO_ID" target="_blank" class="video-thumbnail">
        <img src="https://img.youtube.com/vi/YOUR_VIDEO_ID/mqdefault.jpg" alt="YOUR_VIDEO_TITLE" />
        <div class="play-button"></div>
    </a>
    <div class="video-title">YOUR_VIDEO_TITLE</div>
</div>
```

4. Nahraď `YOUR_VIDEO_ID` za YouTube ID videa
5. Nahraď `YOUR_VIDEO_TITLE` za název videa
6. Vlož do příslušné kategorie (Svatby, Cestování, Teambuilding)

## Jak přidat favicon

1. Přidej favicon soubory do složky `images/favicon/`
2. Obrázek musí mít název:
   - `favicon.ico` - klasický favicon
3. Soubory se automaticky načtou při obnovení stránky

## Konfigurace Google Analytics

Pro změnu Google Analytics účtu:

1. Otevři `index.html`
2. Najdi řádek s Google Analytics tracking ID:
   ```html
   gtag('config', 'G-F62S0BW9H3');
   ```
3. Nahraď `G-F62S0BW9H3` za své vlastní tracking ID
4. Také změň tracking ID v script src:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-F62S0BW9H3"></script>
   ```

**Aktuální tracking ID:** `G-F62S0BW9H3`

## Konfigurace emailu pro kontaktní formulář

 1. Jděte na https://web3forms.com a vytvořte si účet
 2. Získejte svůj Access Key
 3. Nahraďte "YOUR_WEB3FORMS_ACCESS_KEY" níže svým skutečným klíčem


## Test nových cookies - promazání už daného souhlasu
- F12
- do konsole: localStorage.removeItem('analytics-consent');