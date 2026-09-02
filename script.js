// ============================================================
// ПОЛНЫЙ script.js — ВСЕ ФУНКЦИИ РАБОТАЮТ
// ============================================================

const $ = id => document.getElementById(id);

const startButton = $("startButton");
const startScreen = $("startScreen");
const questScreen = $("questScreen");
const analysisScreen = $("analysisScreen");
const resultScreen = $("resultScreen");
const comicScreen = $("comicScreen");
const chatScreen = $("chatScreen");

const music = $("music");
const musicHint = $("musicHint");
const character = $("character");
const dialogue = $("dialogue");
const readyAnswers = $("readyAnswers");
const questionAnswers = $("questionAnswers");
const nextQuestionButton = $("nextQuestionButton");
const yesButton = $("yesButton");
const noButton = $("noButton");
const continueButton = $("continueButton");

const comicFrame = $("comicFrame");
const comicImage = $("comicImage");
const comicCounter = $("comicCounter");
const comicHint = $("comicHint");
const comicBackButton = $("comicBackButton");
const comicSoundButton = $("comicSoundButton");
const chatMessages = $("chatMessages");
const chatOptions = $("chatOptions");

const comicNight = $("comicNight");
const mysticMusic = $("mysticMusic");
const typingSound = $("typingSound");
const knockSound = $("knockSound");
const scaredCatSound = $("scaredCatSound");
const oldWhisperSound = $("oldWhisperSound");
const appearSound = $("appearSound");
const witchLaughSound = $("witchLaughSound");
const spellSound = $("spellSound");
const phoneFallSound = $("phoneFallSound");
const cricketsSound = $("cricketsSound");
const catMeowSound = $("catMeowSound");
const chatMusic = $("chatMusic");
const messageSendSound = $("messageSendSound");
const messageReceiveSound = $("messageReceiveSound");

const confidenceScreen = $("confidenceScreen");
const confidenceGrid = $("confidenceGrid");
const confidenceCount = $("confidenceCount");
const confidenceModal = $("confidenceModal");
const confidenceModalClose = $("confidenceModalClose");
const confidenceModalNumber = $("confidenceModalNumber");
const confidenceModalText = $("confidenceModalText");
const confidenceConfirmButton = $("confidenceConfirmButton");

// ===== ФИНАЛЬНЫЙ КОМИКС — ВСЕ ПЕРЕМЕННЫЕ =====
const finalScreen = $("finalScreen");
const finalComicFrame = $("finalComicFrame");
const finalComicImage = $("finalComicImage");
const finalComicCounter = $("finalComicCounter");
const finalComicHint = $("finalComicHint");
const finalComicBackButton = $("finalComicBackButton");
const finalComicSoundButton = $("finalComicSoundButton");

// ЗВУКИ ВТОРОГО КОМИКСА.
const finalPlaneSound = new Audio("assets/music/plane.mp3");
const finalAirportSound = new Audio("assets/music/airport-crowd.mp3");
const finalAirportMuffledSound = new Audio("assets/music/airport-muffled.mp3");
const finalCuteMusic = new Audio("assets/music/cute-melody.mp3");

finalPlaneSound.preload = "auto";
finalAirportSound.preload = "auto";
finalAirportMuffledSound.preload = "auto";
finalCuteMusic.preload = "auto";
finalAirportSound.loop = true;
finalAirportMuffledSound.loop = true;
finalCuteMusic.loop = true;
comicNight.loop = true;

let currentQuestion = 0;
let currentPanel = 0;
let finalComicPanel = 0;
let comicSoundEnabled = true;
let chatStarted = false;
let selectedConfidenceItem = null;
let confidenceScreenStarted = false;
let finalComicEnding = false;
let finalComicSoundGroup = null;
let finalComicDirection = "forward";

const panelAudioTimers = [];
const confirmedConfidenceItems = new Set();

// ===== СОСТОЯНИЕ ДЛЯ ЗВУКОВ ПЕРВОГО КОМИКСА =====
let currentComicSoundGroup = null;

const faces = {
  normal: "assets/characters/normal.png",
  happy: "assets/characters/happy.png",
  thinking: "assets/characters/thinking.png",
  angry: "assets/characters/angry.png"
};

const startDialogue = "Xin chào, Quỳnh Anh! 💗 Hôm nay em sẽ có một cuộc phiêu lưu nhỏ ✨ mà anh đã chuẩn bị đặc biệt cho em 🥰 Nhưng trước hết, em cần trả lời một vài câu hỏi đơn giản nhé 💭 Em sẵn sàng chưa? 🌸";

const questions = [
  {
    text: 'Anh nghĩ em sẽ nói thế mà 💗 Vậy câu hỏi đầu tiên dành cho em nè ✨ "Điều gì có thể khiến em cười ngay cả trong một ngày tồi tệ?" 😊',
    answers: [
      ["Những cái ôm ấm áp 🫂", "happy", "Ôm ấm áp thì còn gì bằng nhỉ 🥰"],
      ["Đồ ăn rất ngon 🍰", "happy", "Đồ ăn ngon thì ai mà chẳng thích nhỉ 😋"],
      ["Một ai đó đặc biệt 💗", "thinking", "Ai có thể là người đó nhỉ? 🤭"]
    ]
  },
  {
  text: "Câu hỏi thứ hai nè 🌷 Nếu có một ngày hoàn toàn dành cho bản thân, em muốn làm gì nhất? ✨",
  answers: [
    ["Đi chơi và khám phá nơi mới 🌍", "happy", "Anh sẽ tạo ra những kỷ niệm đẹp cùng em 🌍💗"],
    ["Ở nhà nghỉ ngơi thật lâu 🛋️", "normal", "Nghe thật bình yên... đôi khi nghỉ ngơi cũng là điều tuyệt vời nhất 🌸"],
    ["Đi ăn thật ngon 🍜", "happy", "Lựa chọn này rất đáng yêu đó 😋 Anh cũng muốn đi ăn cùng em!"]
  ]
},
  {
    text: "Và câu hỏi cuối cùng nha 💌 Điều nhỏ bé nào có thể làm em cảm thấy hạnh phúc hơn mỗi ngày? 🌼",
    answers: [
      ["Một lời hỏi thăm dịu dàng 💬", "happy", "Những lời hỏi thăm nhỏ bé nhưng luôn làm trái tim ấm áp hơn 💗"],
      ["Một bài nhạc mình thích 🎵", "happy", "Âm nhạc luôn có phép màu... chỉ một bài hát cũng đủ làm ngày mới vui hơn 🎶✨"],
      ["Ở bên người mình thương 🫶", "thinking", "Anh không ngờ em lại chọn thế này đó 😮"]
    ]
  }
];

const comicPanels = Array.from({ length: 13 }, (_, i) => ({
  image: `assets/comic/${i + 1}.jpg`,
  alt: `Khung truyện ${i + 1}`
}));

// ===== ПРЕДЗАГРУЗКА КАРТИНОК КОМИКСА =====
function preloadComicImages() {
  comicPanels.forEach((panel, index) => {
    const img = new Image();
    img.src = panel.image;
    // Для отладки (можно удалить потом)
    img.onload = () => console.log(`✅ Загружена картинка ${index + 1}`);
    img.onerror = () => console.log(`❌ Ошибка загрузки ${index + 1}`);
  });
  console.log('🎬 Начата предзагрузка всех картинок комикса');
}

const finalComicPanels = Array.from({ length: 11 }, (_, i) => ({
  image: `assets/final-comic/${i + 1}.jpg`,
  alt: `Khung truyện cuối cùng ${i + 1}`
}));

const confidenceTexts = [
"Em luôn biết quan tâm chân thành, khiến những người bên cạnh cảm thấy bình yên hơn.",
"Em biết tìm vẻ đẹp trong những điều giản dị và quen thuộc quanh mình.",
"Em biết lắng nghe bằng cả sự chú ý, không chỉ nghe cho có.",
"Em dịu dàng nhưng không yếu đuối, vì em biết bảo vệ những điều quan trọng.",
"Em luôn biết động viên đúng lúc, giúp người khác có thêm niềm tin.",
"Em tự tin theo cách nhẹ nhàng, không cần cố gắng thu hút sự chú ý.",
"Em biết vui với những điều nhỏ bé và làm cuộc sống trở nên đáng yêu.",
"Em luôn là chính mình, không cần thay đổi để được bất kỳ ai yêu thích.",
"Em có khiếu hài hước duyên dáng, khiến không khí xung quanh luôn bớt căng thẳng.",
"Em nhìn cuộc sống tích cực, vì vậy em dễ truyền năng lượng tốt cho mọi người.",
"Em rất tinh tế, thường nhận ra những thay đổi nhỏ trong cảm xúc của người khác.",
"Em cởi mở khi cần thiết và biết giữ riêng tư cho những điều đáng quý.",
"Em biết tạo cảm giác gần gũi, khiến mọi người dễ dàng muốn trò chuyện cùng em.",
"Em ham học hỏi và luôn hào hứng khi khám phá một điều mới mẻ.",
"Em biết chọn lời phù hợp khi ai đó đang buồn hoặc cần được an ủi.",
"Em thể hiện sự quan tâm qua những chi tiết nhỏ mà người khác thường quên.",
"Em chăm sóc vẻ ngoài của mình nhưng cũng nuôi dưỡng một tâm hồn đẹp.",
"Em dám mơ ước và kiên trì theo đuổi những mục tiêu mà em chọn.",
"Em luôn biết ơn những điều mình có, dù đó chỉ là niềm vui nhỏ.",
"Em biết biến những khoảnh khắc bình thường thành kỷ niệm khiến người ta mỉm cười.",
"Em rộng lượng với người thân yêu và không tính toán khi cho đi tình cảm.",
"Em là người đáng tin, biết giữ kín những điều người khác gửi gắm.",
"Em tôn trọng ước mơ của mọi người, ngay cả khi chúng khác với em.",
"Em biết yêu sâu sắc và không sợ nói ra những cảm xúc thật của mình.",
"Em độc lập, có thể tự quyết định những điều quan trọng cho cuộc sống của mình.",
"Em rất nhạy bén, thường nhìn ra vấn đề trước khi nó trở nên phức tạp.",
"Em biết trân trọng thời gian bên người thân thay vì xem đó là điều hiển nhiên.",
"Em cho mọi người đủ thời gian và không ép họ phải thay đổi ngay.",
"Em thật lòng vui trước thành công của người khác, không so sánh hay ganh tị.",
"Em biết khen ngợi đúng lúc, khiến người khác cảm thấy nỗ lực của họ được nhìn thấy",
"Em quan tâm dịu dàng, không kiểm soát hay đòi hỏi quá nhiều từ người khác.",
"Em sống đúng với cảm xúc và những giá trị mà trái tim em tin tưởng.",
"Em biết cân bằng giữa vui vẻ, nghiêm túc, dịu dàng và bản lĩnh trong cuộc sống.",
"Em có gu thẩm mỹ riêng, biết làm những điều giản đơn trở nên đẹp mắt.",
"Em là người đặc biệt vì sự ấm áp, chân thành và nét đáng yêu rất riêng.",
"Em luôn cố gắng giữ lời hứa, vì em hiểu niềm tin cần được trân trọng.",
"Em biết chăm sóc những người em yêu quý bằng sự dịu dàng và chân thành.",
"Em biết tận hưởng hiện tại thay vì chỉ lo lắng về những điều chưa xảy ra.",
"Em thường mang đến những bất ngờ nhỏ khiến những người thân yêu cảm thấy vui.",
"Em không ngừng cố gắng để trở thành phiên bản tốt hơn của chính mình.",
"Em có thể nhìn thấy điều tốt đẹp trong người khác trước khi họ nhận ra.",
"Em biết chăm chút từng việc nhỏ, vì em muốn mọi thứ được làm bằng cả lòng.",
"Em biết tận dụng thời gian để làm những điều có ý nghĩa cho bản thân.",
"Em luôn sẵn lòng giúp đỡ khi ai đó thật sự cần một bàn tay bên cạnh.",
"Em luôn nhớ những điều nhỏ về người khác, vì em thực sự để tâm.",
"Em luôn giữ sự tò mò về cuộc sống và không ngừng tìm niềm vui mới.",
"Em biết giữ những kỷ niệm đẹp và trân trọng ý nghĩa của từng khoảnh khắc.",
"Em biết biến một ngày buồn thành nhẹ nhàng hơn bằng những điều rất nhỏ.",
"Em có sự chân thành khiến lời nói của em luôn tạo được cảm giác tin tưởng.",
"Em biết quý trọng sự chân thành hơn những lời nói đẹp nhưng không có thật"
];

music.volume = 0.65;
comicNight.volume = 0.28;
typingSound.volume = 0.16;
mysticMusic.volume = 0.25;
knockSound.volume = 0.74;
scaredCatSound.volume = 0.7;
oldWhisperSound.volume = 0.38;
appearSound.volume = 0.76;
witchLaughSound.volume = 0.65;
spellSound.volume = 0.68;

// Громкость новых звуков второго комикса
finalPlaneSound.volume = 0.65;
finalAirportSound.volume = 0.42;
finalAirportMuffledSound.volume = 0.22;
finalCuteMusic.volume = 0.42;

phoneFallSound.volume = 0.8;
cricketsSound.volume = 0.3;
catMeowSound.volume = 0.65;
chatMusic.volume = 0.16;
messageSendSound.volume = 0.42;
messageReceiveSound.volume = 0.45;

musicHint.classList.remove("hidden");

function clearPanelAudioTimers() {
  while (panelAudioTimers.length) clearTimeout(panelAudioTimers.pop());
}

function stopSound(sound) {
  sound.pause();
  sound.currentTime = 0;
}

function playMessageSound(sound) {
  sound.pause();
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function playClip(sound, startAt = 0, duration = null, delay = 0) {
  if (!comicSoundEnabled) return;
  const timer = setTimeout(() => {
    sound.pause();
    const start = () => {
      const total = sound.duration || 0;
      sound.currentTime = total ? Math.min(startAt, Math.max(0, total - 0.05)) : startAt;
      sound.play().catch(() => {});
      if (duration !== null) {
        const stopTimer = setTimeout(() => stopSound(sound), duration);
        panelAudioTimers.push(stopTimer);
      }
    };
    if (sound.readyState >= 1) start();
    else sound.addEventListener("loadedmetadata", start, { once: true });
  }, delay);
  panelAudioTimers.push(timer);
}

function stopSceneEffects() {
  clearPanelAudioTimers();
  [knockSound, scaredCatSound, oldWhisperSound, appearSound, witchLaughSound, spellSound, phoneFallSound, catMeowSound].forEach(stopSound);
}

function stopComicSounds() {
  clearPanelAudioTimers();
  [comicNight, mysticMusic, typingSound, knockSound, scaredCatSound, oldWhisperSound, appearSound, witchLaughSound, spellSound, phoneFallSound, cricketsSound, catMeowSound].forEach(stopSound);
  currentComicSoundGroup = null;
}

// ===== ОСНОВНАЯ ФУНКЦИЯ ЗВУКА ДЛЯ ПЕРВОГО КОМИКСА =====
function playPanelSound(index) {
  // Останавливаем только звуковые эффекты (не фоновую музыку)
  [knockSound, scaredCatSound, oldWhisperSound, appearSound, witchLaughSound, spellSound, phoneFallSound, catMeowSound].forEach(stopSound);

  // Определяем группу для текущей панели
  let targetGroup = null;
  let targetSound = null;
  let extraSound = null;

  if (index <= 4) {
    // Кадры 1-5 (индексы 0-4): comicNight + typingSound
    targetGroup = "comicNight";
    targetSound = comicNight;
    extraSound = typingSound;
  } else if (index >= 5 && index <= 11) {
    // Кадры 6-12 (индексы 5-11): mysticMusic
    targetGroup = "mysticMusic";
    targetSound = mysticMusic;
  } else if (index === 12) {
    // Кадр 13 (индекс 12): crickets + catMeow
    targetGroup = "crickets";
    targetSound = cricketsSound;
  } else {
    // Если индекс вне диапазона — останавливаем всё
    stopComicSounds();
    currentComicSoundGroup = null;
    return;
  }

  // Если группа не изменилась — музыка продолжает играть,
  // просто проигрываем эффекты для этой панели
  if (targetGroup === currentComicSoundGroup && targetSound && !targetSound.paused) {
    playPanelEffects(index);
    return;
  }

  // === ГРУППА ИЗМЕНИЛАСЬ — переключаем звуки ===
  
  // Останавливаем все фоновые звуки
  [comicNight, mysticMusic, cricketsSound, typingSound].forEach(sound => {
    sound.pause();
    sound.currentTime = 0;
  });

  // Запускаем новый фоновый звук
  if (targetSound) {
    targetSound.currentTime = 0;
    targetSound.play().catch(() => {});
    currentComicSoundGroup = targetGroup;
  } else {
    currentComicSoundGroup = null;
  }

  // Если есть дополнительный звук (typingSound для кадров 1-5)
  if (extraSound && index <= 4) {
    extraSound.currentTime = 0;
    extraSound.play().catch(() => {});
  }

  // Проигрываем эффекты для панели
  playPanelEffects(index);
}

function playPanelEffects(index) {
  // Эффекты для конкретных панелей
  if (index === 5) {
    playClip(knockSound, 0, 1500);
  } else if (index === 6) {
    playClip(scaredCatSound, 1, 2000);
    playClip(catMeowSound, 0, 2000);
  } else if (index === 7) {
    playClip(oldWhisperSound, 0.2, 2000);
  } else if (index === 8) {
    playClip(appearSound, 1);
  } else if (index === 9) {
    playClip(witchLaughSound);
  } else if (index === 10) {
    playClip(spellSound, 0.2);
  } else if (index === 11) {
    stopSound(spellSound);
    playClip(phoneFallSound, 0.1, 2000);
  } else if (index === 12) {
    playClip(catMeowSound, 0, null, 500);
  }
}

function changeCharacter(face) {
  character.classList.add("character-changing");
  setTimeout(() => {
    character.src = faces[face];
    character.classList.remove("character-changing");
  }, 180);
}

startButton.addEventListener("click", async () => {
  try {
    await music.play();
  } catch {}
  musicHint.classList.add("is-invisible");
  startScreen.classList.add("start-screen-hidden");
  setTimeout(() => {
    startScreen.style.display = "none";
    questScreen.classList.add("quest-screen-active");
  }, 600);
});

noButton.addEventListener("click", () => {
  changeCharacter("angry");
  dialogue.textContent = "Thử lại nhé 🐱";
  readyAnswers.classList.add("waiting");
  setTimeout(() => {
    changeCharacter("normal");
    dialogue.textContent = startDialogue;
    readyAnswers.classList.remove("waiting");
  }, 1500);
});

yesButton.addEventListener("click", () => {
  readyAnswers.classList.add("hidden");
  currentQuestion = 0;
  showQuestion();
});

function showQuestion() {
  const question = questions[currentQuestion];
  changeCharacter("normal");
  dialogue.textContent = question.text;
  questionAnswers.innerHTML = "";
  nextQuestionButton.classList.add("hidden");

  question.answers.forEach(([text, face, reaction]) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = text;
    button.addEventListener("click", () => {
      changeCharacter(face);
      dialogue.textContent = reaction;
      questionAnswers.classList.add("hidden");
      nextQuestionButton.classList.remove("hidden");
    });
    questionAnswers.appendChild(button);
  });

  questionAnswers.classList.remove("hidden");
}

nextQuestionButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) return showQuestion();

  questScreen.classList.remove("quest-screen-active");
  analysisScreen.classList.add("analysis-screen-active");

  setTimeout(() => {
    analysisScreen.classList.remove("analysis-screen-active");
    resultScreen.classList.add("result-screen-active");
  }, 4000);
});

continueButton.addEventListener("click", () => {
  resultScreen.classList.remove("result-screen-active");
  comicScreen.classList.add("comic-screen-active");
  music.pause();
  currentPanel = 0;
  currentComicSoundGroup = null;
  stopComicSounds();
  // 👇 ЭТУ СТРОЧКУ ДОБАВИТЬ
  preloadComicImages();
  
  showComicPanel(false);
  playPanelSound(0);
  showComicPanel(false);
  playPanelSound(0);
});

function showComicPanel(animated = true) {
  const panel = comicPanels[currentPanel];
  comicCounter.textContent = `${currentPanel + 1} / ${comicPanels.length}`;
  comicBackButton.classList.toggle("is-invisible", currentPanel === 0);
  comicImage.alt = panel.alt;
  comicHint.textContent = currentPanel === 12 ? "Tiếp tục ✨" : "Nhấn để tiếp tục ✨";

  // МГНОВЕННАЯ СМЕНА КАРТИНКИ
  comicImage.src = panel.image;
  
  // ЗВУК ВКЛЮЧАЕТСЯ СРАЗУ
  playPanelSound(currentPanel);
}

function nextComicPanel() {
  if (currentPanel === 12) return openMosquitoChat();
  currentPanel++;
  showComicPanel(true);
}

function previousComicPanel() {
  if (currentPanel <= 0) return;
  currentPanel--;
  showComicPanel(true);
}

comicFrame.addEventListener("click", nextComicPanel);

comicBackButton.addEventListener("click", event => {
  event.stopPropagation();
  previousComicPanel();
});

comicSoundButton.addEventListener("click", () => {
  comicSoundEnabled = !comicSoundEnabled;
  comicSoundButton.textContent = comicSoundEnabled ? "♫" : "🔇";
  if (comicSoundEnabled) {
    playPanelSound(currentPanel);
  } else {
    stopComicSounds();
  }
});

document.addEventListener("keydown", event => {
  if (!comicScreen.classList.contains("comic-screen-active")) return;
  if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "Enter" || event.key === " ") {
    if (event.key === "ArrowLeft") {
      previousComicPanel();
    } else {
      event.preventDefault();
      nextComicPanel();
    }
  }
});

function scrollChatToBottom() {
  setTimeout(() => chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: "smooth" }), 70);
}

function addChatMessage(sender, text) {
  const row = document.createElement("div");
  const avatar = document.createElement("img");
  const bubble = document.createElement("div");

  row.className = sender === "alex" ? "message-row alex-row" : "message-row girl-row";
  avatar.className = "message-avatar";
  bubble.className = sender === "alex" ? "message-bubble alex-bubble" : "message-bubble girl-bubble";
  bubble.textContent = text;

  if (sender === "alex") {
    avatar.src = "assets/characters/mosquito.png";
    avatar.alt = "Alex";
    row.append(avatar, bubble);
    playMessageSound(messageReceiveSound);
  } else {
    avatar.src = "assets/characters/girl-avatar.png";
    avatar.alt = "Quỳnh Anh";
    row.append(bubble, avatar);
    playMessageSound(messageSendSound);
  }

  chatMessages.appendChild(row);
  scrollChatToBottom();
}

function clearChatOptions() {
  chatOptions.innerHTML = "";
}

function addChatOption(text, action) {
  const button = document.createElement("button");
  button.className = "chat-option-button";
  button.type = "button";
  button.textContent = text;
  button.addEventListener("click", () => {
    clearChatOptions();
    action();
  });
  chatOptions.appendChild(button);
}

function openMosquitoChat() {
  comicScreen.classList.remove("comic-screen-active");
  stopComicSounds();
  chatScreen.classList.add("chat-screen-active");
  chatMusic.currentTime = 0;
  chatMusic.play().catch(() => {});

  if (chatStarted) {
    scrollChatToBottom();
    return;
  }

  chatStarted = true;
  addChatMessage("alex", "Ôi không! Ôi không, không, không! 😰 Anh cảm thấy thế giới đang phình to ra! Hay là anh đang thu nhỏ lại?! Khoan đã... KHOAN ĐÃ!");
  addChatOption("Em bị làm sao thế? 🥺", chatStepTwo);
}

function chatStepTwo() {
  addChatMessage("girl", "Em bị làm sao thế? 🥺");
  setTimeout(() => {
    addChatMessage("alex", "Quỳnh Anh à, anh đang gặp nguy rồi... 🦟 Một mụ phù thủy độc ác đã biến anh thành con muỗi, để anh và em không bao giờ có thể gặp được nhau. Em có giúp anh không? ");
    addChatOption("Tất nhiên là em sẽ giúp anh. Anh cần em làm gì? ✨", chatStepThree);
  }, 700);
}

function chatStepThree() {
  addChatMessage("girl", "Vẫn? Tất nhiên là em sẽ giúp anh. Anh cần em làm gì? ✨");
  setTimeout(() => {
    addChatMessage("alex", "Thế này nhé. Mụ phù thủy có để lại chỉ dẫn. Em nhìn đây: viết rằng muốn anh trở lại làm người, em phải đọc những tài năng của em. Chỉ cần đọc thôi — rồi đồng ý ở dưới là xong. Em chịu không? 📜");
    addChatOption("Vâng, em đồng ý rồi đây. 💗", chatStepFour);
  }, 700);
}

function chatStepFour() {
  addChatMessage("girl", "Vâng, em đồng ý rồi đây. 💗");
  setTimeout(() => {
    chatMusic.pause();
    chatMusic.currentTime = 0;
    chatScreen.classList.remove("chat-screen-active");
    openConfidenceScreen();
  }, 900);
}

function openConfidenceScreen() {
  confidenceScreen.classList.add("confidence-screen-active");
  comicNight.pause();
  comicNight.currentTime = 0;
  comicNight.play().catch(() => {});

  if (confidenceScreenStarted) return;
  confidenceScreenStarted = true;
  createConfidenceItems();
}

function createConfidenceItems() {
  confidenceGrid.innerHTML = "";
  confidenceTexts.forEach((text, index) => {
    const number = index + 1;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "confidence-item";
    button.dataset.itemNumber = number;
    button.innerHTML = `<span class="confidence-item-number">${number}</span><span class="confidence-item-heart">♡</span>`;
    button.addEventListener("click", () => openConfidenceModal(number, text));
    confidenceGrid.appendChild(button);
  });
}

function openConfidenceModal(number, text) {
  selectedConfidenceItem = number;
  confidenceModalNumber.textContent = number;
  confidenceModalText.textContent = text;
  confidenceConfirmButton.textContent = confirmedConfidenceItems.has(number)
    ? "Em đã biết điều này rồi 💗"
    : "Đúng, điều này là về em 💗";
  confidenceModal.classList.add("confidence-modal-active");
  confidenceModal.setAttribute("aria-hidden", "false");
}

function closeConfidenceModal() {
  confidenceModal.classList.remove("confidence-modal-active");
  confidenceModal.setAttribute("aria-hidden", "true");
  selectedConfidenceItem = null;
}

function confirmConfidenceItem() {
  if (selectedConfidenceItem === null) return;
  const number = selectedConfidenceItem;

  if (confirmedConfidenceItems.has(number)) return closeConfidenceModal();

  confirmedConfidenceItems.add(number);
  const button = confidenceGrid.querySelector(`[data-item-number="${number}"]`);
  button.classList.add("confidence-item-completed");
  button.querySelector(".confidence-item-heart").textContent = "♥";
  confidenceCount.textContent = `${confirmedConfidenceItems.size} / 50`;

  closeConfidenceModal();

  if (confirmedConfidenceItems.size === 50) setTimeout(openFinalScreen, 500);
}

confidenceModalClose.addEventListener("click", closeConfidenceModal);
confidenceConfirmButton.addEventListener("click", confirmConfidenceItem);
confidenceModal.addEventListener("click", event => {
  if (event.target === confidenceModal) closeConfidenceModal();
});

// ============================================================
// ФИНАЛЬНЫЙ КОМИКС
// ============================================================

function stopFinalComicSounds() {
  [
    spellSound,
    comicNight,
    finalPlaneSound,
    finalAirportSound,
    finalAirportMuffledSound,
    finalCuteMusic
  ].forEach(sound => {
    sound.pause();
    sound.currentTime = 0;
  });

  finalComicSoundGroup = null;
}

function playFinalComicSound(panelNumber) {
  if (!comicSoundEnabled) {
    stopFinalComicSounds();
    return;
  }

  let sound = null;
  let group = null;

  if (panelNumber === 1 || panelNumber === 2) {
    sound = spellSound;
    group = "spell";
  } else if (panelNumber >= 3 && panelNumber <= 5) {
    sound = comicNight;
    group = "night";
  } else if (panelNumber === 6) {
    sound = finalPlaneSound;
    group = "plane";
  } else if (panelNumber === 7 || panelNumber === 9) {
    sound = finalAirportSound;
    group = "airport";
  } else if (panelNumber === 8) {
    sound = finalAirportMuffledSound;
    group = "airport-muffled";
  } else if (panelNumber === 10 || panelNumber === 11) {
    sound = finalCuteMusic;
    group = "cute";
  }

  if (!sound) {
    stopFinalComicSounds();
    return;
  }

  const restartSpellOnBackToFirstSlide =
    group === "spell" &&
    panelNumber === 1 &&
    finalComicDirection === "backward";

  if (finalComicSoundGroup === group && !restartSpellOnBackToFirstSlide) {
    return;
  }

  [
    spellSound,
    comicNight,
    finalPlaneSound,
    finalAirportSound,
    finalAirportMuffledSound,
    finalCuteMusic
  ].forEach(otherSound => {
    if (otherSound !== sound) {
      otherSound.pause();
      otherSound.currentTime = 0;
    }
  });

  sound.pause();
  sound.currentTime = 0;
  sound.play().catch(() => {});

  finalComicSoundGroup = group;
}

function fadeOutFinalComicSounds(duration = 1200) {
  const sounds = [spellSound, comicNight, finalPlaneSound, finalAirportSound, finalAirportMuffledSound, finalCuteMusic];
  const activeSounds = sounds.filter(sound => !sound.paused);
  if (!activeSounds.length) return;

  const steps = 24;
  const stepDuration = duration / steps;
  const initialVolumes = activeSounds.map(sound => sound.volume);
  let step = 0;

  const timer = setInterval(() => {
    step++;
    activeSounds.forEach((sound, index) => {
      sound.volume = Math.max(0, initialVolumes[index] * (1 - step / steps));
    });
    if (step >= steps) {
      clearInterval(timer);
      activeSounds.forEach((sound, index) => {
        sound.pause();
        sound.currentTime = 0;
        sound.volume = initialVolumes[index];
      });
    }
  }, stepDuration);
}

function showFinalComicPanel(animated = true) {
  const panel = finalComicPanels[finalComicPanel];
  playFinalComicSound(finalComicPanel + 1);
  finalComicCounter.textContent = `${finalComicPanel + 1} / ${finalComicPanels.length}`;
  if (finalComicBackButton) {
    finalComicBackButton.classList.toggle("is-invisible", finalComicPanel === 0);
  }
  finalComicImage.alt = panel.alt;
  finalComicHint.textContent = finalComicPanel === finalComicPanels.length - 1 ? "Tiếp tục ✨" : "Nhấn để tiếp tục ✨";

  if (!animated) {
    finalComicImage.src = panel.image;
    return;
  }

  finalComicFrame.classList.add("final-comic-frame-changing");
  setTimeout(() => {
    finalComicImage.src = panel.image;
    finalComicFrame.classList.remove("final-comic-frame-changing");
  }, 230);
}

function nextFinalComicPanel() {
  if (finalComicEnding) return;

  if (finalComicPanel === finalComicPanels.length - 1) {
    finalComicEnding = true;
    fadeOutFinalComicSounds(1200);
    setTimeout(() => createSurpriseOverlay(), 1200);
    return;
  }

  finalComicPanel++;
  finalComicDirection = "forward";
  showFinalComicPanel(true);
}

function previousFinalComicPanel() {
  if (finalComicPanel <= 0) return;

  finalComicPanel--;
  finalComicDirection = "backward";
  showFinalComicPanel(true);
}

function openFinalScreen() {
  comicNight.pause();
  comicNight.currentTime = 0;
  confidenceScreen.classList.remove("confidence-screen-active");
  finalComicEnding = false;
  finalComicPanel = 0;
  showFinalComicPanel(false);
  setTimeout(() => {
    finalScreen.classList.add("final-screen-active");
  }, 120);
}

if (finalComicFrame) {
  finalComicFrame.addEventListener("click", nextFinalComicPanel);
}

if (finalComicBackButton) {
  finalComicBackButton.addEventListener("click", (event) => {
    event.stopPropagation();
    previousFinalComicPanel();
  });
}

if (finalComicSoundButton) {
  finalComicSoundButton.addEventListener("click", event => {
    event.stopPropagation();
    comicSoundEnabled = !comicSoundEnabled;
    finalComicSoundButton.textContent = comicSoundEnabled ? "♫" : "🔇";

    if (comicSoundEnabled) playFinalComicSound(finalComicPanel + 1);
    else stopFinalComicSounds();
  });
}

document.addEventListener("keydown", (event) => {
  if (!finalScreen.classList.contains("final-screen-active")) return;
  
  if (event.key === "ArrowLeft") {
    previousFinalComicPanel();
  } else if (event.key === "ArrowRight" || event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    nextFinalComicPanel();
  }
});

// ============================================================
// ФИНАЛЬНЫЙ СЮРПРИЗ — С МУЗЫКОЙ
// ============================================================

let surpriseMusic = null;

function playSurpriseMusic() {
  if (surpriseMusic) {
    surpriseMusic.pause();
    surpriseMusic.currentTime = 0;
    surpriseMusic = null;
  }
  
  surpriseMusic = new Audio('assets/music/celebration.mp3');
  surpriseMusic.loop = true;
  surpriseMusic.volume = 0.7;
  surpriseMusic.play()
    .then(() => console.log('✅ Музыка играет на финальном экране!'))
    .catch(err => console.log('❌ Ошибка музыки:', err));
}

function stopSurpriseMusic() {
  if (surpriseMusic) {
    surpriseMusic.pause();
    surpriseMusic.currentTime = 0;
    surpriseMusic = null;
    console.log('⏹️ Музыка остановлена');
  }
}

function createSurpriseOverlay() {
  const existingOverlay = document.getElementById('finalSurpriseOverlay');
  if (existingOverlay) {
    existingOverlay.remove();
  }
  
  const overlay = document.createElement('div');
  overlay.id = 'finalSurpriseOverlay';
  overlay.className = 'surprise-screen';
  overlay.style.display = 'none';
  overlay.innerHTML = `
    <canvas id="fireworksCanvas"></canvas>
    <button id="surpriseCloseBtn" class="surprise-close" type="button" aria-label="Закрыть">×</button>
    <div class="surprise-content">
      <img class="surprise-image" src="assets/final-surprise.jpg" alt="Мой подарок для тебя">
    </div>
  `;
  document.body.appendChild(overlay);
  
  overlay.style.display = 'flex';
  overlay.classList.add('surprise-screen-active');
  
  playSurpriseMusic();
  
  const canvas = overlay.querySelector('#fireworksCanvas');
  if (canvas) {
    startFireworks(canvas);
  }
  
  const closeBtn = document.getElementById('surpriseCloseBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      stopSurpriseMusic();
      overlay.remove();
      window.location.reload();
    });
  }
}

// ============================================================
// ФЕЙЕРВЕРК
// ============================================================

function startFireworks(canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let frame;
  let lastBurst = 0;
  const colors = ['#ff4ea4', '#ffd166', '#ffffff', '#a970ff', '#63e6ff'];
  
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  
  function burst(x, y) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 100; i++) {
      const a = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 5;
      particles.push({
        x, y,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed,
        alpha: 1,
        color,
        size: 1 + Math.random() * 2.5,
        decay: 0.011 + Math.random() * 0.012
      });
    }
  }
  
  function draw(time) {
    ctx.fillStyle = 'rgba(5,2,8,.2)';
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    
    if (time - lastBurst > 400) {
      burst(innerWidth * (0.15 + Math.random() * 0.7), innerHeight * (0.12 + Math.random() * 0.42));
      lastBurst = time;
    }
    
    particles = particles.filter(p => p.alpha > 0.03);
    particles.forEach(p => {
      p.vy += 0.055;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    
    frame = requestAnimationFrame(draw);
  }
  
  resize();
  addEventListener('resize', resize);
  frame = requestAnimationFrame(draw);
}

// ============================================================
// БЫСТРЫЙ ПРОПУСК К СЮРПРИЗУ (для тестирования)
// ============================================================

function openSurpriseNow() {
  console.log('🎆 Открываем сюрприз...');
  createSurpriseOverlay();
}

document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.shiftKey && (e.key === 'S' || e.key === 's' || e.key === 'Ы' || e.key === 'ы')) {
    e.preventDefault();
    openSurpriseNow();
  }
});

console.log('🔑 Для открытия сюрприза: нажмите Ctrl+Shift+S');
console.log('   Или введите в консоли: openSurpriseNow()');

// ============================================================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('audio').forEach(a => {
    a.pause();
    a.currentTime = 0;
  });
  
  finalComicPanel = 0;
  
  const startScreenEl = document.getElementById('startScreen');
  if (startScreenEl) {
    startScreenEl.style.display = 'flex';
    startScreenEl.classList.remove('start-screen-hidden');
  }
  
  const allScreens = document.querySelectorAll(
    '.quest-screen, .analysis-screen, .result-screen, ' +
    '.comic-screen, .chat-screen, .confidence-screen, .final-screen'
  );
  allScreens.forEach(el => {
    el.classList.remove(
      'quest-screen-active', 'analysis-screen-active', 'result-screen-active',
      'comic-screen-active', 'chat-screen-active', 'confidence-screen-active',
      'final-screen-active'
    );
  });
  
  const overlay = document.getElementById('finalSurpriseOverlay');
  if (overlay) {
    overlay.remove();
  }
  
  if (typeof confirmedConfidenceItems !== 'undefined') {
    confirmedConfidenceItems.clear();
  }
  
  const countEl = document.getElementById('confidenceCount');
  if (countEl) {
    countEl.textContent = '0 / 50';
  }
  
  console.log('🔄 Всё сброшено в начальное состояние');
});

console.log('✅ Скрипт загружен!');