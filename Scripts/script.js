const piDigits = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989...";

const canvas = document.getElementById('piCanvas');
const ctx = canvas.getContext('2d');

let positions = [];

function preparePositions() {
    positions = [];
    const baseSize = Math.max(14, Math.floor(canvas.width / 60));
    const largeScale = 3;
    const count = piDigits.length;
    const y = canvas.height / 2 - baseSize / 2;
    let x = canvas.width + 20;

    for (let i = 0; i < count; i++) {
        const ch = piDigits[i];
        let size = baseSize;
        if (i < 1) size *= largeScale;
        ctx.font = `${size}px monospace`;
        const charWidth = ctx.measureText(ch).width;
        const color = `hsl(${(i * 5) % 360}, 80%, 60%)`;
        const itemY = y - (size - baseSize) / 2;
        positions.push({ x, y: itemY, ch, color, size });
        x += charWidth;
    }
}

function drawBackground() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = '#00111a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
}

let scrollSpeed = 2;
function animate() {
    if (positions.length === 0) {
        return;
    }
    drawBackground();
    let anyVisible = false;
    for (let i = 0; i < positions.length; i++) {
        const item = positions[i];
        item.x -= scrollSpeed;
        if (item.x + ctx.measureText(item.ch).width > 0) {
            anyVisible = true;
            ctx.fillStyle = item.color;
            ctx.font = `${item.size}px monospace`;
            ctx.fillText(item.ch, item.x, item.y);
        }
    }
    if (anyVisible) {
        requestAnimationFrame(animate);
    } else {
        setTimeout(() => {
            fadeOut();
            setTimeout(startDrawing, 500);
        }, 500);
    }
}

function fadeOut() {
    let alpha = 1;
    const step = 0.02;
    function stepFade() {
        alpha -= step;
        if (alpha <= 0) {
            drawBackground();
        } else {
            ctx.fillStyle = `rgba(0,0,0,${step})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            requestAnimationFrame(stepFade);
        }
    }
    stepFade();
}

function startDrawing() {
    drawBackground();
    preparePositions();
    animate();
}

let facts = [];
const embeddedFacts = [
    "Pi irrasyonel bir sayıdır; basit bir kesir olarak ifade edilemez ve ondalık gösterimi hiç bitmez veya tekrar etmez.",
    "Pi'nin ilk 100 basamağı 0–9 arasındaki tüm rakamları içerir, ancak 0 rakamı ilk 100 basamakta diğerlerinden daha az görünür.",
    "Pi Günü her yıl 14 Mart'ta (3/14) matematikçiler ve matematik meraklıları tarafından kutlanır.",
    "Antik Babilliler pi'yi yaklaşık 3,125 olarak buldular; Arşimet ise pi'nin 3,1408 ile 3,1429 arasında olduğunu hesapladı.",
    "Modern bilgisayarlarla pi'nin 100 trilyondan fazla basamağı hesaplandı, ancak pratik uygulamalarda genellikle sadece yaklaşık 39 basamak kullanılır.",
    "Pi'yi temsil etmek için 'π' sembolünü ilk kullanan 1706'da Galli matematikçi William Jones'tur.",
    "Pi, çember alanı, salınımlar ve kuantum mekaniği dahil olmak üzere matematik ve fiziğin birçok alanında doğal olarak ortaya çıkar.",
    "1897'de Indiana eyaleti 'çemberi kareleştirdiklerini' iddia eden ve pi'yi 3.2 olarak belirten bir yasa tasarısı geçirdi, ancak uygulanmadı.",
    "Pi'nin basamaklarının bilinen bir deseni yoktur; bu da pi'yi rastgele görünen bir transandantal sayı yapar.",
    "Pi'yi ezberlemek popüler bir hobi; dünya rekoru sahibi 100.000'den fazla basamağı sıralayabilmektedir.",
    "Pi, pizza kutusu boyutlarından uyduların yörünge mekaniğine kadar birçok hesaplamada kullanılır.",
    "Bir çemberin çevresinin çapına oranı sabittir ve çemberin boyutundan bağımsız olarak pi'ye eşittir.",
    "Albert Einstein Pi Günü'nde doğmuştur (14 Mart 1879).",
    "Euler kimliği e^(iπ) + 1 = 0, matematikte en güzel denklem olarak görülür ve pi'yi içerir.",
    "1995'te keşfedilen Bailey–Borwein–Plouffe formülü, önceki basamakları hesaplamadan pi'nin belirli basamaklarını doğrudan hesaplamaya olanak tanır.",
    "Eski Mısır, Çin ve Hindistan pi için yapılan tahminlerde gerçeğe oldukça yakın değerler bulmuştur.",
    "Pi'nin basamakları süper bilgisayarlar kullanılarak 62 trilyondan fazla ondalık basamağa kadar hesaplanmıştır.",
    "Pi'nin ondalıktan sonraki ilk basamağı 1'dir; bu nedenle pi yaklaşık olarak 3,14159265359'dur.",
    "Pi, özellikle normal dağılım formülünde olmak üzere istatistik ve olasılık teorisinde kullanılır.",
    "1988'de geliştirilen Chudnovsky algoritması, pi basamaklarını hesaplamak için en hızlı yöntemlerden biridir.",
    "Pi'nin basamaklarını bir çember etrafına başlangıç noktasından yazıp bağlarsanız, desen sonsuz kez kendine dokunur.",
    "Son yıllarda pi hesaplamasına adanmış bilgisayarlar, basamaklarının tekrarlanmaya devam etmediğini doğrulamıştır.",
    "Dünyanın çevresinin çapına oranı yaklaşık olarak pi'ye eşittir.",
    "Pi, köprü inşaatından akıllı telefon anten tasarımına kadar mühendislik uygulamalarında kullanılır.",
    "Bir ezber cümlesi 'How I need a drink, alcoholic of course, after the heavy lectures involving quantum mechanics' pi'nin ilk 15 basamağını verir.",
    "Pi Yaklaşık Gün'ü 22 Temmuz'da (22/7) kutlanır; çünkü 22/7 kesri pi için yaygın bir yaklaşık değerdir.",
    "Pi'nin ilk 9 milyon basamağı içinde rastgele kendi doğum tarihinizi bulma olasılığı şaşırtıcı derecede yüksektir.",
    "1593'te yayımlanan Viète formülü, sonsuz bir çarpım kullanarak pi için ilk kesin formüldü.",
    "Pi, tarih boyunca müzik, sanat ve edebiyata ilham verdi; sonsuzluğu ve matematiksel güzelliği simgeler.",
    "9 rakamı, pi'nin ilk 100 basamağında 10 kez görünerek en sık görülen rakamdır.",
    "Pi'nin ondalıklı gösterimi bir matematik kitabının tamamını doldurabilecek kadar uzundur.",
    "Bazı sanatçılar pi'nin basamaklarını tuval üzerine yazıp görsel eserler ortaya koyarlar.",
    "Bilgisayar bilimi derslerinde pi hesaplamaları genellikle performans testi olarak kullanılır.",
    "Pi, Fourier serileri ve dalgacık çözümlerinde sıkça karşımıza çıkar.",
    "İnsanlar pi gününü genellikle pasta yiyerek kutladıkları için 'Pi' İngilizce'de 'pie' (pasta) ile oyun yapılır.",
    "Pi’nin basamakları hiçbir matematiksel formül tarafından tamamen tahmin edilememiştir.",
    "Pi, diferansiyel denklemlerde ve fiziksel sabitlerde doğal olarak yer alır.",
    "Bazı programlama yarışmalarında pi'yi mümkün olduğunca az kodla hesaplamak yarışma konusudur.",
    "Pi hakkında yazılmış şiir ve hikayeler matematik dünyasında yaygındır.",
    "Eski Çinliler pi'yi 355/113 kesriyle yaklaşık hesaplamışlardır; bu gün bile oldukça isabetlidir.",
    "Pi hesaplamak için kullanılan algoritmalar modern kriptolojideki karmaşık sayı işlemlerine benzerdir.",
    "Bazı zecek filmlerinde pi'nin bir mesaj içerdiği varsayılır; bu bir şehir efsanesidir.",
    "Pi'nin ondalık basamakları arasında film replikleri veya doğum tarihleri arayanlar vardır.",
    "Matematikçiler pi'nin normal olup olmadığını yani basamaklarının eşit dağılmasını hâlâ kanıtlayamamıştır.",
    "Pi'nin hacim hesaplarında görünmesi kürelerin temel geometrik özelliğidir.",
    "Pi'nin yaklaşık değerleri antik metinlerde çakış ablannın bulgularında ortaya çıkmıştır.",
    "14 Mart, Pi Günü olarak da Einstein’in doğum günü olması nedeniyle iki kutlama bir arada olur.",
    "Pi üzerine en uzun makale yüzlerce sayfa sürebilir; bazı kitaplar sadece bu sabitten bahseder.",
    "Bazı programcılar, pi'nin ilk 100000 basamağını ekrana yazdırmak için 'hello world' programını değiştirir.",
    "Pi basamaklarını bilgisayarın hafızasında saklamak birçok depolama sorununa yol açabilir."
];
let factIndex = 0;
const FACT_INTERVAL = 15 * 1000;

function showFact(index) {
    const el = document.getElementById('fact');
    if (!el) return;
    el.textContent = `Bilgi: ${facts[index]}`;
}

function rotateFact() {
    if (!facts || facts.length === 0) return;
    factIndex = (factIndex + 1) % facts.length;
    showFact(factIndex);
}

async function loadFacts() {
    console.log('loadFacts: starting');
    try {
        const res = await fetch('Data/funfacts.json');
        console.log('loadFacts: fetch status', res.status);
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
        if (data && Array.isArray(data.funFacts) && data.funFacts.length) {
            facts = data.funFacts.map(f => f.fact);
            console.log('loadFacts: loaded', facts.length, 'facts from JSON');
        } else {
            facts = embeddedFacts.slice();
            console.log('loadFacts: JSON empty, using embedded');
        }
    } catch (e) {
        console.error('loadFacts error', e);
        facts = embeddedFacts.slice();
        console.log('loadFacts: fallback to embedded facts', embeddedFacts.length);
    }
    factIndex = 0;
    if (facts.length) showFact(0);
    setInterval(rotateFact, FACT_INTERVAL);
}


window.addEventListener('resize', startDrawing);
window.addEventListener('load', () => { startDrawing(); loadFacts(); });
canvas.addEventListener('click', startDrawing);
canvas.addEventListener('touchstart', startDrawing);

const audio = document.getElementById('backgroundAudio');

let audioPlaying = false;

function updateSoundButton() {
    const btn = document.getElementById('soundBtn');
    if (!btn) return;
    btn.classList.toggle('active', audioPlaying);
    btn.src = audioPlaying ? 'Media/sound.png' : 'Media/Soundclosed.png';
}

function toggleSound() {
    if (!audio) return;
    if (audioPlaying) {
        audio.pause();
        audio.currentTime = 0;
        audioPlaying = false;
    } else {
        audio.play().catch(e => console.warn('audio play prevented', e));
        audioPlaying = true;
    }
    updateSoundButton();
}

const soundBtn = document.getElementById('soundBtn');
if (soundBtn) {
    soundBtn.addEventListener('click', toggleSound);
    updateSoundButton();
}
