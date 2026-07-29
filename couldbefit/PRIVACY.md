# Gizlilik Politikası — CouldBeFit

**Son güncelleme: 28 Temmuz 2026**

CouldBeFit ("uygulama"), tamamen çevrimdışı çalışan, sunucusuz bir vücut geliştirme/beslenme ajandası uygulamasıdır. Bu belge, uygulamanın hangi verileri nasıl işlediğini açıklar.

## 1. Veri toplama — genel ilke

CouldBeFit **hiçbir kullanıcı verisini** geliştiriciye, bir sunucuya veya üçüncü bir tarafa **göndermez**. Uygulamada:

- Analitik/izleme (analytics) yok
- Reklam SDK'sı yok
- Çökme raporlama (crash reporting) servisi yok
- Kullanıcı hesabı, giriş (login), Google/Apple/Facebook girişi yok
- Sunucu/backend yok

Tüm veriler **yalnızca cihazında**, yerel bir veritabanında (Room/SQLite) saklanır: boy/kilo/yaş/hedef bilgilerin, öğün ve kalori kayıtların, antrenman programın ve geçmişin, özel eklediğin yiyecekler.

## 1a. Sağlık ve fitness verisi (Health Connect)

Uygulama, **isteğe bağlı** olarak açabileceğin "Sağlık senkronu" özelliğiyle Android'in **Health Connect** deposundan sağlık verisi okuyabilir. Bu bölüm, Google Play "Health apps" politikasının istediği açıklamadır.

**Hangi veriler okunur (yalnızca bunlar):**

| Health Connect izni | Veri türü | Ne için |
|---|---|---|
| `READ_STEPS` | **Adım sayısı** | Yürüyüşü antrenman günlüğüne "Yürüyüş" seti olarak yazmak; üst kademe veri yoksa süre/mesafeyi buradan tahmin etmek |
| `READ_EXERCISE` | **Yürüyüş ve doğa yürüyüşü** türündeki antrenman kayıtlarının **başlangıç/bitiş zamanı** | Yürüyüşün süresini TAHMİN etmek yerine gerçek kayıttan okumak (isteğe bağlı; verilmezse süre günlük adım toplamından tahmin edilir). Yalnız yürüyüş/doğa yürüyüşü türü okunur; koşu, bisiklet, yüzme vb. **okunmaz** |
| `READ_DISTANCE` | **Yürüme mesafesi** | Tahmin yerine gerçek mesafeyi yazmak (isteğe bağlı; verilmezse adımdan tahmin edilir) |
| `READ_SPEED` | **Ortalama hız** | Mesafe okunamadığında yürüyüşün hızını uydurmak yerine ölçülen ortalamayı kullanmak (isteğe bağlı) |
| `READ_ACTIVE_CALORIES_BURNED` | **Aktif yakılan kalori** (bazal metabolizma hariç) | Tahmin yerine ölçülen kaloriyi yazmak (isteğe bağlı; verilmezse ACSM formülüyle tahmin edilir) |
| `READ_HEALTH_DATA_IN_BACKGROUND` | (veri türü değil) | Günlük otomatik içe aktarmanın uygulama kapalıyken de çalışabilmesi (isteğe bağlı; verilmezse senkron uygulamayı açtığında yapılır) |

Okuma penceresi **son 7 gündür**. Daha eski veriye erişim izni (`READ_HEALTH_DATA_HISTORY`) **istenmez**.

**Ne YAPILMAZ:**

- Uygulama Health Connect'e **hiçbir şey yazmaz** (`WRITE_*` izinleri hiç istenmez).
- Kalp atışı, uyku, tansiyon, kan şekeri, âdet döngüsü, konum/rota ve **başka hiçbir sağlık verisi okunmaz**. Antrenman kayıtlarından yalnızca **yürüyüş/doğa yürüyüşü** türünün başlangıç-bitiş zamanı okunur; diğer spor türlerine ve egzersiz rotasına (`READ_EXERCISE_ROUTE`) erişilmez.
- Okunan sağlık verisi **cihazından hiç çıkmaz**: hiçbir sunucuya, geliştiriciye veya üçüncü tarafa gönderilmez.
- Sağlık verisi **reklam, pazarlama, analitik, profilleme veya yapay zeka eğitimi için kullanılmaz**; hiçbir şekilde satılmaz veya paylaşılmaz.
- Bulut yedeği (Ayarlar > "Online save") açık olsa bile: yedeğe giren şey senin antrenman günlüğündür (yürüyüş setleri dâhil, çünkü onlar artık senin girdiğin herhangi bir set gibidir); Health Connect'ten okunan **ham sağlık kayıtları yedeğe girmez**. Bulut yedeği ayrıca uçtan uca şifrelidir — anahtar yalnızca sende olan hesap kodundan türetilir.

**Kontrol ve silme:**

- Özellik **varsayılan olarak kapalıdır**; yalnız Ayarlar > "Sağlık senkronu" anahtarını sen açarsan çalışır.
- İzinleri istediğin an Health Connect uygulamasından (Android Ayarlar > Sağlık Connect > Uygulama izinleri) geri alabilirsin.
- Anahtarı kapattığında okuma durur ve arka plan görevi iptal edilir.
- Daha önce içe aktarılmış yürüyüş setleri normal antrenman kaydın gibi davranır: tek tek silebilir ya da uygulamayı kaldırarak tüm yerel veriyle birlikte silebilirsin.
- **Saklama süresi:** okunan veriler için ayrı bir arşiv tutulmaz; yalnızca son 7 günün özeti günlük yürüyüş seti olarak yazılır ve senin antrenman geçmişinin bir parçası hâline gelir.

## 2. Ağ (internet) erişimi — ne zaman, ne için

Uygulama varsayılan olarak **hiçbir ağ isteği yapmaz**. İstisnalar:

1. **Yedekleme dışa/içe aktarma:** Ayarlar'daki "Yedek al" özelliği, verilerini bir JSON dosyası olarak **cihazının seçtiğin bir konumuna** kaydeder (Android'in dosya seçici sistemi ile). Bu dosya hiçbir sunucuya gönderilmez — tamamen senin kontrolündedir.
2. **Opsiyonel "Yerel AI" özelliği:** Kullanıcı isterse, Ayarlar'dan bir yapay zeka modeli dosyasını (~1.1GB, GGUF formatı) [Hugging Face](https://huggingface.co) üzerinden bir kez indirebilir. Bu indirme:
   - Herkese açık, kimlik doğrulama gerektirmeyen bir dosya indirmedir (kullanıcı verisi göndermez)
   - Yalnızca kullanıcı açıkça "İndir" dediğinde başlar
   - İndirme sonrası model **tamamen cihazda** çalışır; sohbet mesajların hiçbir sunucuya gönderilmez
   - İstenildiği zaman silinebilir (Ayarlar > Yerel AI > Sil)
3. **Barkod tarama (Öğünler > "Barkod tara"):** Kullanıcı bir ürün barkodu okuttuğunda, o ürünün besin değerlerini almak için [Open Food Facts](https://world.openfoodfacts.org) veri tabanına bir sorgu gönderilir. Bu sorguda:
   - Gönderilen **tek veri barkod rakamıdır** (ör. `5449000000996`). Kullanıcı kimliği, cihaz kimliği, konum, öğün geçmişi veya başka hiçbir kişisel bilgi gönderilmez; hesap/oturum/çerez yoktur.
   - **Kamera görüntüsü hiçbir zaman gönderilmez ve kaydedilmez.** Barkod çözümlemesi tamamen cihazda (Google ML Kit, çevrimdışı model) yapılır; kameradan gelen kareler çözüldükten hemen sonra bellekten atılır, diske yazılmaz.
   - İstek yalnızca kullanıcı barkod taradığında (ya da barkodu elle girdiğinde) yapılır.

Bu özellikler için `INTERNET` ve `ACCESS_NETWORK_STATE` izinleri istenir — başka hiçbir amaçla kullanılmazlar.

## 3. Üçüncü taraf servisler

- **Hugging Face (huggingface.co):** Sadece opsiyonel yapay zeka modelinin indirilmesi için iletişim kurulur (bkz. madde 2). Kullanıcı adına veya davranışına dair hiçbir bilgi gönderilmez — düz bir dosya indirme isteğidir.
- **Health Connect (Android sistem bileşeni / `com.google.android.apps.healthdata`):** Yalnızca "Sağlık senkronu" açıkken, **cihaz içinde** okuma yapılır (bkz. madde 1a). Bu bir ağ servisi değildir; Health Connect verinin cihazdaki deposudur ve iletişim tamamen cihaz içi (IPC) gerçekleşir. Bu okuma sırasında **hiçbir ağ isteği yapılmaz**.
- **Open Food Facts (openfoodfacts.org):** Sadece barkod tarandığında ürün bilgisini almak için iletişim kurulur (bkz. madde 2). Gönderilen tek şey barkod rakamıdır. Open Food Facts açık bir veri tabanıdır ve verisi **ODbL** lisansı altındadır; uygulama, lisansın gerektirdiği atfı ürünün gösterildiği ekranda görünür biçimde belirtir.
- Başka hiçbir üçüncü taraf servis, SDK veya kütüphane kullanıcı verisine erişmez. (Barkod çözümü için kullanılan Google ML Kit kütüphanesi **çevrimdışı** çalışır — model uygulamanın içinde gömülüdür, ağa çıkmaz.)

## 4. Veri saklama ve silme

- Tüm veriler cihazında kaldığı sürece saklanır.
- Uygulamayı kaldırdığında (uninstall) tüm yerel veriler (veritabanı + indirilen yapay zeka modeli) cihazından silinir.
- Yedek dosyaların (JSON) sildiğin/sakladığın konum tamamen senin kontrolündedir.
- **Sağlık verisi:** ayrı bir kopya/arşiv tutulmaz. Health Connect'ten okunan günlük özetler, senin elle girebileceğin bir yürüyüş seti hâline gelir ve bundan sonra sıradan bir antrenman kaydı gibi yaşar — tek tek silinebilir. Health Connect'teki asıl kayıtlar bizim tarafımızdan hiçbir zaman değiştirilmez veya silinmez (yazma iznimiz yoktur).

## 5. Çocukların gizliliği

Uygulama belirli bir yaş grubuna özel tasarlanmamıştır ve çocuklardan bilerek veri toplamaz (zaten hiçbir veri hiçbir yere gönderilmediği için toplanacak bir şey yoktur).

## 6. İzinler

| İzin | Amaç |
|---|---|
| `INTERNET` | Opsiyonel yapay zeka modeli indirmesi ve barkod sorgusu için |
| `ACCESS_NETWORK_STATE` | İndirme durumunu kontrol etmek için |
| `CAMERA` | **Yalnızca barkod tarama için.** Kamera görüntüsü cihazdan çıkmaz, kaydedilmez; sadece barkod rakamı okunur. İzin isteğe bağlıdır — reddedilirse barkod elle girilebilir, uygulamanın geri kalanı etkilenmez. |
| `health.READ_STEPS` | **Yalnızca "Sağlık senkronu" için** (bkz. madde 1a). Adım sayısı okunur; cihazdan çıkmaz. |
| `health.READ_EXERCISE` | Aynı özellik için, isteğe bağlı: yürüyüş/doğa yürüyüşü kayıtlarının başlangıç-bitiş zamanı — süreyi tahmin etmek yerine ölçmek için. Diğer spor türleri ve rota okunmaz. |
| `health.READ_DISTANCE` | Aynı özellik için, isteğe bağlı: yürüme mesafesi. Verilmezse adımdan tahmin edilir. |
| `health.READ_SPEED` | Aynı özellik için, isteğe bağlı: ortalama hız. Yalnız mesafe okunamadığında kullanılır. |
| `health.READ_ACTIVE_CALORIES_BURNED` | Aynı özellik için, isteğe bağlı: aktif yakılan kalori (bazal metabolizma hariç). Verilmezse formülle tahmin edilir. |
| `health.READ_HEALTH_DATA_IN_BACKGROUND` | Aynı özellik için, isteğe bağlı: otomatik senkronun uygulama kapalıyken de çalışabilmesi. Verilmezse senkron uygulamayı açtığında yapılır. |

Konum, mikrofon, kişiler, telefon durumu gibi hiçbir başka izin istenmez. Kamera izni yalnızca kullanıcı "Barkod tara" (veya "Fotoğraftan kalori" akışında "Fotoğraf çek") dediğinde, gerekçesiyle birlikte sorulur; uygulama açılışında istenmez. Sağlık izinleri yalnızca kullanıcı Ayarlar'daki "Sağlık senkronu" anahtarını açtığında, Health Connect'in kendi izin ekranı üzerinden istenir; uygulama açılışında istenmez ve reddedilirse özellik sessizce kapalı kalır.

## 7. Değişiklikler

Bu politika değişirse, güncellenmiş sürüm bu sayfada yayınlanır ("Son güncelleme" tarihi güncellenir).

## 8. İletişim

Sorularınız için: **kaanalperkaraaslan@gmail.com**
