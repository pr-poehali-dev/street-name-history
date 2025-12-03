import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const slides = [
  {
    id: 1,
    title: 'История названия улицы Жореса',
    subtitle: 'города Тулы',
    content: 'Проектная работа ученика 4 класса',
    type: 'title'
  },
  {
    id: 2,
    title: '1. Тема нашего проекта',
    content: '"История названия улицы Жореса города Тулы: от Попова болота до современности"',
    author: 'Проект выполнен учеником 4 класса',
    type: 'theme'
  },
  {
    id: 3,
    title: '2. Цель проекта',
    content: 'Узнать, почему наша улица называется именем французского политика Жана Жореса и как она называлась раньше',
    goal: 'Изучить историю переименования улицы и понять связь между старым и новым названием',
    type: 'goal'
  },
  {
    id: 4,
    title: '3. Задачи проекта',
    tasks: [
      'Изучить историю района Попово болото и Подьячее',
      'Собрать информацию о старом названии улицы',
      'Выяснить биографию Жана Жореса',
      'Понять причины переименования улицы',
      'Провести опрос одноклассников',
      'Найти фотоматериалы об улице',
      'Сделать выводы о важности сохранения исторической памяти'
    ],
    type: 'tasks'
  },
  {
    id: 5,
    title: '4. Работа с информацией',
    subtitle: 'Что мы узнали?',
    content: 'Мы изучили архивные источники, городские справочники, опросили старожилов района и нашли исторические фотографии',
    sources: [
      'Книги по истории Тулы',
      'Архивы городской библиотеки',
      'Интернет-ресурсы о Туле',
      'Беседы с жителями улицы'
    ],
    type: 'research'
  },
  {
    id: 6,
    title: 'Старое название улицы',
    subtitle: 'Попово болото и Подьячее',
    oldName: 'Улица в районе Попово болото',
    content: 'В старину территория, где сейчас проходит улица Жореса, была частью заболоченной местности. Эту территорию называли "Попово болото" - возможно, здесь были церковные земли. Также район был известен как Подьячее - место, где жили подьячие (мелкие канцелярские служащие).',
    explanation: 'Название отражало природные особенности местности и социальный состав населения в XVI-XIX веках',
    type: 'historical'
  },
  {
    id: 7,
    title: 'Фотоматериалы',
    subtitle: 'Улица в прошлом и настоящем',
    photos: [
      { description: 'Историческая застройка района Подьячее', era: 'начало XX века' },
      { description: 'Современная улица Жореса', era: 'наши дни' },
      { description: 'Старинные дома сохранились до сих пор', era: 'архитектура XIX века' }
    ],
    type: 'photos'
  },
  {
    id: 8,
    title: 'Переименование улицы',
    date: '1918 год',
    content: 'После революции 1917 года по всей России начали переименовывать улицы. Старые "царские" и церковные названия заменяли на имена революционеров и борцов за социализм.',
    newName: 'Улица Жореса',
    context: 'В Туле множество улиц получили новые названия в 1918-1925 годах',
    type: 'event'
  },
  {
    id: 9,
    title: 'Жан Жорес',
    years: '1859–1914',
    content: 'Французский политик, философ, историк. Боролся за права рабочих, выступал против войны и несправедливости.',
    achievements: [
      '🎓 Был учителем и профессором философии',
      '📰 Основал газету "Юманите" (Человечность)',
      '✊ Защищал права рабочих',
      '☮️ Боролся против войны',
      '⚔️ Убит в 1914 году накануне Первой мировой войны'
    ],
    why: 'Жореса считали героем борьбы за справедливость, поэтому его именем называли улицы в разных странах',
    type: 'biography'
  },
  {
    id: 10,
    title: 'Опрос одноклассников',
    subtitle: 'Мы опросили 20 учеников нашего класса',
    questions: [
      { q: 'Знаешь ли ты, кто такой Жан Жорес?', yes: 2, no: 18 },
      { q: 'Знаешь ли старое название улицы?', yes: 0, no: 20 },
      { q: 'Интересно ли тебе узнать историю своей улицы?', yes: 18, no: 2 },
      { q: 'Важно ли помнить историю родного города?', yes: 20, no: 0 }
    ],
    type: 'survey'
  },
  {
    id: 11,
    title: 'Интервью с одноклассниками',
    interviews: [
      { name: 'Маша', quote: 'Я не знала, что наша улица была Поповым болотом! Это так интересно!' },
      { name: 'Дима', quote: 'Жан Жорес был смелым человеком. Жаль, что его убили' },
      { name: 'Катя', quote: 'Я теперь буду рассказывать родителям историю нашей улицы' }
    ],
    type: 'interview'
  },
  {
    id: 12,
    title: 'Гипотеза проекта',
    hypothesis: 'Мы предположили, что старое название улицы связано с природой и профессиями жителей, а новое - с идеями революции и справедливости',
    type: 'hypothesis'
  },
  {
    id: 13,
    title: 'Проверка гипотезы',
    result: 'ГИПОТЕЗА ПОДТВЕРДИЛАСЬ! ✓',
    proof: [
      '✓ Попово болото - действительно отражало природу местности',
      '✓ Подьячее - указывало на профессии жителей (подьячие)',
      '✓ Жан Жорес - символ борьбы за справедливость',
      '✓ Переименование случилось после революции в период массовых изменений'
    ],
    type: 'validation'
  },
  {
    id: 14,
    title: '5. Результаты исследования',
    results: [
      '📍 Изучили историю района Попово болото',
      '📜 Узнали о старом названии улицы (Подьячее)',
      '👤 Познакомились с биографией Жана Жореса',
      '📅 Выяснили время переименования (1918 год)',
      '📊 Провели опрос 20 одноклассников',
      '🗣️ Взяли интервью у учеников',
      '✓ Подтвердили нашу гипотезу'
    ],
    type: 'results'
  },
  {
    id: 15,
    title: 'Выводы по проекту',
    conclusions: [
      '🏛️ Старые названия улиц хранят память о природе и людях прошлого',
      '🌍 Новые названия связывают наш город с мировой историей',
      '📚 Большинство людей не знают историю своих улиц',
      '💡 Изучать историю родного города очень интересно',
      '🤝 Важно сохранять историческую память'
    ],
    finalThought: 'Каждое название улицы - это целая история!',
    type: 'conclusion'
  },
  {
    id: 16,
    title: 'Работа над проектом',
    reflection: 'Мы начали свою работу с того, что задались вопросом: "Почему наша улица называется именем француза?" Потом мы приступили к изучению архивов и книг. Мы завершили работу тем, что узнали интересную историю и поделились ею с одноклассниками.',
    learned: 'Работа над проектом мне понравилась тем, что я открыл для себя историю родного города и научился работать с разными источниками информации',
    type: 'reflection'
  },
  {
    id: 17,
    title: 'Спасибо за внимание!',
    message: 'Узнайте историю улицы, на которой живёте вы!',
    emoji: '🏠📚🌟',
    type: 'ending'
  }
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-[#E8DCC8] paper-texture flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl">
        <Card className={`bg-[#F5E6D3] border-4 border-[#8B7355] shadow-2xl overflow-hidden ${isAnimating ? 'animate-page-turn' : ''}`}>
          <div className="relative min-h-[600px] p-8 sm:p-12 paper-texture">
            <div className="absolute top-4 right-4 text-sm font-body text-[#654321] opacity-60">
              {currentSlide + 1} / {slides.length}
            </div>

            <div className="animate-fade-in">
              {/* Титульный слайд */}
              {slide.type === 'title' && (
                <div className="flex flex-col items-center justify-center h-[550px] text-center">
                  <div className="border-8 border-double border-[#8B7355] p-12 vintage-border">
                    <h1 className="font-heading text-5xl sm:text-6xl font-bold text-[#2C2416] mb-6">
                      {slide.title}
                    </h1>
                    <p className="font-heading text-3xl text-[#654321] mb-8">{slide.subtitle}</p>
                    <p className="font-body text-xl text-[#8B7355]">{slide.content}</p>
                  </div>
                </div>
              )}

              {/* Тема проекта */}
              {slide.type === 'theme' && (
                <div className="space-y-8 flex flex-col justify-center min-h-[500px]">
                  <h2 className="font-heading text-4xl font-bold text-[#2C2416] border-b-2 border-[#8B7355] pb-4">
                    {slide.title}
                  </h2>
                  <div className="bg-[#E8DCC8] p-8 border-4 border-[#8B7355] text-center">
                    <Icon name="BookOpen" className="mx-auto mb-6 text-[#654321]" size={64} />
                    <p className="font-heading text-2xl text-[#2C2416] leading-relaxed italic">
                      {slide.content}
                    </p>
                  </div>
                  <p className="text-center font-body text-lg text-[#654321]">{slide.author}</p>
                </div>
              )}

              {/* Цель проекта */}
              {slide.type === 'goal' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-4xl font-bold text-[#2C2416] border-b-2 border-[#8B7355] pb-4">
                    {slide.title}
                  </h2>
                  <div className="bg-[#E8DCC8] p-8 border-l-8 border-[#8B7355]">
                    <Icon name="Target" className="mb-4 text-[#654321]" size={48} />
                    <p className="font-body text-2xl text-[#3E2723] leading-relaxed mb-6">
                      {slide.content}
                    </p>
                    <div className="border-t-2 border-[#8B7355] pt-4">
                      <p className="font-body text-lg text-[#654321] italic">
                        {slide.goal}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Задачи проекта */}
              {slide.type === 'tasks' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-4xl font-bold text-[#2C2416] border-b-2 border-[#8B7355] pb-4">
                    {slide.title}
                  </h2>
                  <div className="space-y-4">
                    {slide.tasks?.map((task: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-4 bg-[#E8DCC8] p-4 border-l-4 border-[#8B7355]">
                        <span className="font-heading text-2xl text-[#654321] min-w-[32px]">{idx + 1}.</span>
                        <span className="font-body text-lg text-[#3E2723]">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Работа с информацией */}
              {slide.type === 'research' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-4xl font-bold text-[#2C2416] border-b-2 border-[#8B7355] pb-4">
                    {slide.title}
                  </h2>
                  <p className="font-heading text-xl text-[#654321] italic">{slide.subtitle}</p>
                  <p className="font-body text-lg text-[#3E2723] leading-relaxed">
                    {slide.content}
                  </p>
                  <div className="bg-[#E8DCC8] p-6 border-4 border-[#8B7355]">
                    <h3 className="font-heading text-2xl text-[#2C2416] mb-4">Источники информации:</h3>
                    <div className="space-y-3">
                      {slide.sources?.map((source: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Icon name="Book" className="text-[#654321]" size={20} />
                          <span className="font-body text-[#3E2723]">{source}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Старое название */}
              {slide.type === 'historical' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="font-heading text-4xl font-bold text-[#2C2416] mb-2">
                      {slide.title}
                    </h2>
                    <p className="font-heading text-2xl text-[#654321] italic">{slide.subtitle}</p>
                  </div>
                  <div className="bg-[#E8DCC8] p-8 border-4 border-double border-[#8B7355]">
                    <div className="mb-6 text-center">
                      <Icon name="MapPin" className="mx-auto mb-3 text-[#654321]" size={56} />
                      <p className="font-heading text-3xl text-[#2C2416]">{slide.oldName}</p>
                    </div>
                    <p className="font-body text-lg text-[#3E2723] leading-relaxed mb-6">
                      {slide.content}
                    </p>
                    <div className="border-t-2 border-[#8B7355] pt-4">
                      <p className="font-body text-sm text-[#654321] italic">
                        📜 {slide.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Фотоматериалы */}
              {slide.type === 'photos' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-4xl font-bold text-[#2C2416] border-b-2 border-[#8B7355] pb-4">
                    {slide.title}
                  </h2>
                  <p className="font-heading text-xl text-[#654321] italic text-center">{slide.subtitle}</p>
                  <div className="space-y-6">
                    {slide.photos?.map((photo: any, idx: number) => (
                      <div key={idx} className="bg-[#E8DCC8] p-6 border-4 border-[#8B7355]">
                        <div className="flex items-center gap-4 mb-3">
                          <Icon name="Camera" className="text-[#654321]" size={32} />
                          <div>
                            <p className="font-body text-lg text-[#2C2416] font-bold">{photo.description}</p>
                            <p className="font-body text-sm text-[#654321] italic">{photo.era}</p>
                          </div>
                        </div>
                        <div className="h-40 bg-[#D4C4A8] border-2 border-[#8B7355] flex items-center justify-center">
                          <span className="text-[#654321] font-body italic">📷 Фотография из архива</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Переименование */}
              {slide.type === 'event' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-4xl font-bold text-[#2C2416] border-b-2 border-[#8B7355] pb-4">
                    {slide.title}
                  </h2>
                  <div className="text-center bg-[#E8DCC8] p-6 border-4 border-[#8B7355] vintage-border">
                    <Icon name="Calendar" className="mx-auto mb-4 text-[#654321]" size={48} />
                    <p className="font-heading text-3xl font-bold text-[#2C2416]">{slide.date}</p>
                  </div>
                  <p className="font-body text-lg text-[#3E2723] leading-relaxed">
                    {slide.content}
                  </p>
                  <div className="bg-[#E8DCC8] p-6 border-l-8 border-[#8B7355]">
                    <p className="font-heading text-2xl text-[#2C2416] mb-2">→ {slide.newName}</p>
                    <p className="font-body text-sm text-[#654321] italic">{slide.context}</p>
                  </div>
                </div>
              )}

              {/* Биография */}
              {slide.type === 'biography' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="font-heading text-4xl font-bold text-[#2C2416] mb-2">
                      {slide.title}
                    </h2>
                    <p className="font-heading text-2xl text-[#654321]">{slide.years}</p>
                  </div>
                  <p className="font-body text-lg text-[#3E2723] text-center italic bg-[#E8DCC8] p-4 border-l-4 border-[#8B7355]">
                    {slide.content}
                  </p>
                  <div className="space-y-3">
                    {slide.achievements?.map((achievement: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 bg-[#E8DCC8] p-4 border-l-4 border-[#8B7355]">
                        <span className="font-body text-lg text-[#3E2723]">{achievement}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#E8DCC8] p-4 border-4 border-[#8B7355] text-center">
                    <p className="font-body text-sm text-[#654321] italic">💡 {slide.why}</p>
                  </div>
                </div>
              )}

              {/* Опрос */}
              {slide.type === 'survey' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-4xl font-bold text-[#2C2416] border-b-2 border-[#8B7355] pb-4">
                    {slide.title}
                  </h2>
                  <p className="font-heading text-xl text-[#654321] italic text-center">{slide.subtitle}</p>
                  <div className="space-y-6">
                    {slide.questions?.map((item: any, idx: number) => (
                      <div key={idx} className="bg-[#E8DCC8] p-6 border-4 border-[#8B7355]">
                        <p className="font-body text-lg text-[#2C2416] mb-4 font-bold">{item.q}</p>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="font-body text-[#3E2723]">✓ Да</span>
                              <span className="font-body font-bold text-[#2C2416]">{item.yes}%</span>
                            </div>
                            <div className="h-6 bg-[#D4C4A8] border-2 border-[#8B7355] overflow-hidden">
                              <div 
                                className="h-full bg-[#8B7355]" 
                                style={{ width: `${item.yes}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="font-body text-[#3E2723]">✗ Нет</span>
                              <span className="font-body font-bold text-[#2C2416]">{item.no}%</span>
                            </div>
                            <div className="h-6 bg-[#D4C4A8] border-2 border-[#8B7355] overflow-hidden">
                              <div 
                                className="h-full bg-[#654321]" 
                                style={{ width: `${item.no}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Интервью */}
              {slide.type === 'interview' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-4xl font-bold text-[#2C2416] border-b-2 border-[#8B7355] pb-4">
                    {slide.title}
                  </h2>
                  <div className="space-y-6">
                    {slide.interviews?.map((interview: any, idx: number) => (
                      <div key={idx} className="bg-[#E8DCC8] p-6 border-l-8 border-[#8B7355]">
                        <div className="flex items-start gap-4">
                          <Icon name="MessageCircle" className="text-[#654321] mt-1" size={32} />
                          <div>
                            <p className="font-heading text-xl text-[#2C2416] mb-2">{interview.name}:</p>
                            <p className="font-body text-lg text-[#3E2723] italic">"{interview.quote}"</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Гипотеза */}
              {slide.type === 'hypothesis' && (
                <div className="space-y-8 flex flex-col justify-center min-h-[500px]">
                  <h2 className="font-heading text-4xl font-bold text-[#2C2416] border-b-2 border-[#8B7355] pb-4 text-center">
                    {slide.title}
                  </h2>
                  <div className="bg-[#E8DCC8] p-10 border-8 border-double border-[#8B7355]">
                    <Icon name="Lightbulb" className="mx-auto mb-6 text-[#654321]" size={64} />
                    <p className="font-body text-2xl text-[#3E2723] leading-relaxed text-center">
                      {slide.hypothesis}
                    </p>
                  </div>
                </div>
              )}

              {/* Проверка гипотезы */}
              {slide.type === 'validation' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-4xl font-bold text-[#2C2416] border-b-2 border-[#8B7355] pb-4">
                    {slide.title}
                  </h2>
                  <div className="bg-[#E8DCC8] p-8 border-4 border-[#8B7355] text-center">
                    <p className="font-heading text-3xl font-bold text-green-700 mb-6">{slide.result}</p>
                  </div>
                  <div className="space-y-4">
                    {slide.proof?.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-4 bg-[#E8DCC8] p-4 border-l-4 border-green-600">
                        <span className="font-body text-lg text-[#3E2723]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Результаты */}
              {slide.type === 'results' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-4xl font-bold text-[#2C2416] border-b-2 border-[#8B7355] pb-4">
                    {slide.title}
                  </h2>
                  <div className="space-y-4">
                    {slide.results?.map((result: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-4 bg-[#E8DCC8] p-4 border-l-4 border-[#8B7355]">
                        <span className="font-body text-lg text-[#3E2723]">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Выводы */}
              {slide.type === 'conclusion' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-4xl font-bold text-[#2C2416] border-b-2 border-[#8B7355] pb-4">
                    {slide.title}
                  </h2>
                  <div className="space-y-4">
                    {slide.conclusions?.map((conclusion: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-4 bg-[#E8DCC8] p-4 border-l-4 border-[#8B7355]">
                        <span className="font-body text-lg text-[#3E2723]">{conclusion}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#E8DCC8] p-8 border-4 border-[#8B7355] text-center">
                    <Icon name="Heart" className="mx-auto mb-4 text-red-600" size={48} />
                    <p className="font-heading text-2xl text-[#2C2416] italic">{slide.finalThought}</p>
                  </div>
                </div>
              )}

              {/* Рефлексия */}
              {slide.type === 'reflection' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-4xl font-bold text-[#2C2416] border-b-2 border-[#8B7355] pb-4">
                    {slide.title}
                  </h2>
                  <div className="bg-[#E8DCC8] p-8 border-4 border-[#8B7355]">
                    <p className="font-body text-lg text-[#3E2723] leading-relaxed mb-6">
                      {slide.reflection}
                    </p>
                    <div className="border-t-2 border-[#8B7355] pt-6">
                      <p className="font-body text-lg text-[#3E2723] leading-relaxed italic">
                        {slide.learned}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Финал */}
              {slide.type === 'ending' && (
                <div className="flex flex-col items-center justify-center h-[550px] text-center space-y-8">
                  <p className="text-6xl">{slide.emoji}</p>
                  <h2 className="font-heading text-5xl font-bold text-[#2C2416]">
                    {slide.title}
                  </h2>
                  <div className="bg-[#E8DCC8] p-8 border-4 border-[#8B7355]">
                    <p className="font-body text-2xl text-[#3E2723] italic">
                      {slide.message}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Навигация */}
        <div className="flex items-center justify-between mt-6 gap-4">
          <Button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="bg-[#8B7355] hover:bg-[#654321] text-white px-8 py-3 text-lg disabled:opacity-50"
          >
            <Icon name="ChevronLeft" size={24} />
            Назад
          </Button>

          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentSlide 
                    ? 'bg-[#654321] w-8' 
                    : 'bg-[#8B7355] hover:bg-[#654321]'
                }`}
                aria-label={`Перейти к слайду ${idx + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="bg-[#8B7355] hover:bg-[#654321] text-white px-8 py-3 text-lg disabled:opacity-50"
          >
            Вперёд
            <Icon name="ChevronRight" size={24} />
          </Button>
        </div>

        <div className="text-center mt-4 text-[#654321] font-body">
          <p className="text-sm">💡 Используйте стрелки клавиатуры ← → для навигации</p>
        </div>
      </div>
    </div>
  );
}
