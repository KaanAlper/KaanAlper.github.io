# kaanalper.github.io — Portfolyo Tasarım Spec'i

Tarih: 2026-07-04
Durum: Kullanıcı onayı bekliyor
Demo referansı: `.superpowers/brainstorm/*/content/hybrid-demo.html` (onaylanan görsel yön)

## 1. Amaç ve hedef kitle

Kaan Alper Karaaslan için kişisel portfolyo sitesi (GitHub Pages user site, `https://kaanalper.github.io`).
Birincil kitle: işe alımcılar ve teknik topluluk. Amaç: mühendislik kimliğini
(yazılım + EEE·CS öğrencisi, CV/SLAM + ağ araçları + Linux sistemleri) akılda kalıcı,
şablon-dışı bir tasarımla sunmak.

Dil: **İngilizce**. Güncel yarışmalar (TEKNOFEST, AI Grand Prix) bu sürümde **kapsam dışı**.

## 2. Tasarım yönü: "Engineering Index" (hibrit)

1616 portfolyo sitesinin taranmasından çıkan sonuçlara dayanır
(`.superpowers/brainstorm/research/synthesis.md`):
sitelerin ~%60'ı koyu zemin + partikül + "Hi, I'm X" klişesinde; açık/kağıt zemin ve
tek konsepte tam bağlılık en güçlü farklılaştırıcılar.

Konsept: **krem "mühendislik gazetesi" iskeleti + dozunda "dosya/exhibit" dokunuşları.**

- **İskelet (B yönü):** krem kağıt zemin, cetvel çizgileri, dev serif manşet,
  monospace metadata, numaralı bölümler (§01–§04).
- **Dokunuşlar (A yönü):** projeler raptiyeli "EXHIBIT A/B/C" kartları, hero'da tek bir
  kırmızı `EST. 2024–2029` damgası, iletişimde sarı yapışkan not. Başka damga/pano
  öğesi eklenmez — doz bilinçli olarak düşük.

### 2.1 Görsel dil

| Öğe | Değer |
|---|---|
| Zemin | `#f3eee0` + çok hafif kağıt grain (repeating-linear-gradient) |
| Mürekkep | `#1e1a12` (ana), `#4c463a` (yumuşak), `#8a8270` (soluk) |
| Vurgu | yanık turuncu `#a35020` (linkler, numaralar, italik vurgular) |
| Damga | kırmızı `#a3271e` (yalnızca hero damgası + exhibit etiketi) |
| Kart | `#fbf8ee`, `1px` `#b8ae94` çerçeve, sıcak gölge |
| Display font | **Fraunces** (600/900, italikler) |
| Mono font | **IBM Plex Mono** (400/500/600) — tüm gövde ve metadata |
| Yasak | Inter/Roboto/system-ui, mor gradientler, koyu tema, partikül arka planı, `transition-all` |

### 2.2 Sayfa yapısı (tek sayfa)

1. **Masthead** — `KAAN ALPER KARAASLAN — ENGINEERING INDEX`; sağda `ANKARA, TR · <canlı saat> +03 · ● OPEN TO WORK`.
2. **Hero** — Fraunces manşet: "Software that *sees*, *maps* and *connects* — built close to the metal." + kısa tanıtım paragrafı + kırmızı damga + §nav (anchor linkler).
3. **§01 Projects** — 3 raptiyeli exhibit kartı: **AsenaPlug**, **DROID-SLAM Research**, **hypr-droid**; her kartta etiket, Fraunces başlık, açıklama, stack satırı, GitHub linki. Altında mono "FULL INDEX →" satırı (byedpi-turkey vb. + GitHub profil linki).
4. **§02 Capabilities** — 3 kolon: Languages / Systems / Domains (madde başları `▪` turuncu).
5. **§03 Education** — Çankaya University kartı, "B.Sc. EEE · CS", `2024 — 2029`.
6. **§04 Contact** — GITHUB / LINKEDIN / E-MAIL / INSTAGRAM linkleri + sarı yapışkan not (`say hello: kaanalperkaraaslan@gmail.com`).
7. **Footer** — mono künye: `KAANALPER.GITHUB.IO · REV. 2026` vb.

### 2.3 Etkileşim ve hareket

- Exhibit kartları: hafif rotasyon (−1.2°/0.8°/−0.6°); hover'da düzelip 4px yükselir (yalnızca `transform`+`box-shadow` transition).
- Linkler: turuncu alt çizgi, hover'da renk değişimi.
- Canlı saat: JS ile `Europe/Istanbul`, 30 sn'de bir güncellenir.
- Scroll: `scroll-behavior: smooth` anchor navigasyonu; isteğe bağlı hafif section fade-in (IntersectionObserver, `prefers-reduced-motion` saygılı).
- JS kapalıysa: saat öğesi CSS ile gizlenir (boş "--:--" görünmez); sitenin geri kalanı tamamen çalışır.

### 2.4 Responsive

- `max-width: 1060px` konteyner; 760px altında exhibit ve capabilities grid'leri tek kolon, damga statik konuma iner, masthead alt alta sarar.
- Yatay taşma yok; kartlar dokunmatik cihazda rotasyonsuz da okunaklı.

## 3. İçerik verileri

- İsim: Kaan Alper Karaaslan · Rol: Software Engineer, EEE & CS Student
- Eğitim: Çankaya University, 2024–2029, Ankara TR
- E-posta: kaanalperkaraaslan@gmail.com · GitHub: `KaanAlper`
- **AÇIK KALEM:** LinkedIn ve Instagram URL'leri kullanıcıdan alınacak (yer tutucuyla başlanır, yayın öncesi doldurulur).
- **AÇIK KALEM:** DROID-SLAM repo'su private — kartın linki ya GitHub profiline gider ya da link kaldırılıp "private research" ibaresi konur (implementasyonda kullanıcıya tek soru).

## 4. Teknik yaklaşım

- **Stack: saf statik** — `index.html` + `css/style.css` + `js/main.js` (yalnızca saat + IntersectionObserver). Framework/derleme yok; GitHub Pages `main` branch'ten direkt servis eder.
- Google Fonts: `preconnect` + tek CSS isteği; `font-display: swap`; fallback yığını `Georgia, serif` / `ui-monospace, monospace`.
- SEO/paylaşım: `<title>`, meta description, Open Graph + favicon (turuncu `K.` monogramı, SVG).
- Erişilebilirlik: semantik `header/nav/section/footer`, tek `h1`, kontrast ≥ 4.5:1 (soluk mürekkep yalnızca dekoratif metinlerde), `prefers-reduced-motion` desteği.
- Repo: `~/kaanalper.github.io` git deposu; `.superpowers/` ve `docs/` gitignore'a **girmez** (spec repo'da kalır), `research/` klasörü ise `.superpowers/` altında olduğundan `.gitignore`'a `.superpowers/` eklenir.

## 5. Hata durumları / kenar senaryolar

- Font yüklenemezse fallback serif/mono ile sayfa okunur kalır (FOUT kabul).
- JS hatası/engeli: saat ve fade-in kaybolur, içerik ve navigasyon etkilenmez.
- Küçük ekran + uzun kelimeler: manşette `overflow-wrap: break-word`.

## 6. Test / doğrulama

- Her görsel değişiklikten sonra Playwright ile 1440×900 + 390×844 screenshot alınıp gözle doğrulanır (kullanıcının site-builder-v2 screenshot-iteration kuralı).
- Yayın öncesi kontrol listesi: linkler çalışıyor, `prefers-reduced-motion` senaryosu, Lighthouse hızlı geçiş (performans/a11y ≥ 90), yatay scroll yok.

## 7. Kapsam dışı (v1)

- Koyu tema, blog, çok dillilik, yarışma bölümleri, analytics, form tabanlı iletişim.
