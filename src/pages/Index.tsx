import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const slides = [
  {
    id: 1,
    title: 'История происхождения названия улицы Жореса',
    subtitle: 'г. Тула',
    content: 'Проектная работа',
    type: 'title'
  },
  {
    id: 2,
    title: 'Улица Жореса сегодня',
    content: 'Улица Жореса расположена в центральной части города Тулы. Это тихая жилая улица с историческими зданиями, которая хранит память о революционных событиях начала XX века.',
    facts: [
      'Протяжённость улицы',
      'Год застройки',
      'Архитектурные особенности'
    ],
    type: 'content'
  },
  {
    id: 3,
    title: 'Прежнее название улицы',
    subtitle: 'Вторая Подьяческая',
    content: 'До 1925 года улица называлась Вторая Подьяческая. Название происходит от слова «подьячий» — служащий канцелярии в Российской империи.',
    historicalNote: 'Подьяческие улицы были характерны для губернских городов России',
    type: 'historical'
  },
  {
    id: 4,
    title: 'Переименование улицы',
    date: '28 января 1925 года',
    content: 'В период активного переименования улиц в СССР, улица получила новое название в честь французского политического деятеля Жана Жореса.',
    context: 'В 1920-е годы по всей стране присваивали улицам имена известных борцов за мир и социализм',
    type: 'event'
  },
  {
    id: 5,
    title: 'Жан Жорес',
    years: '1859–1914',
    content: 'Французский политик, философ, историк и лидер социалистического движения',
    achievements: [
      'Активно выступал против войны',
      'Боролся за социальную справедливость',
      'Основал газету «Юманите»',
      'Убит накануне Первой мировой войны'
    ],
    type: 'biography'
  },
  {
    id: 6,
    title: 'Результаты опроса одноклассников',
    questions: [
      { q: 'Знаете ли вы, в честь кого названа улица?', yes: 15, no: 85 },
      { q: 'Было ли у улицы другое название?', yes: 10, no: 90 },
      { q: 'Хотели бы узнать историю своей улицы?', yes: 92, no: 8 },
      { q: 'Важно ли знать историю города?', yes: 95, no: 5 }
    ],
    type: 'survey'
  },
  {
    id: 7,
    title: 'Интересные факты',
    facts: [
      'Улица сохранила историческую застройку конца XIX века',
      'На улице находятся здания, являющиеся памятниками архитектуры',
      'Название улицы связывает Тулу с мировой историей',
      'Жан Жорес никогда не был в России, но его идеи повлияли на многих'
    ],
    type: 'facts'
  },
  {
    id: 8,
    title: 'Выводы проекта',
    conclusions: [
      'Изучили историю переименования улицы Жореса',
      'Узнали о французском политике Жане Жоресе',
      'Выяснили прежнее название — Вторая Подьяческая',
      'Провели опрос среди одноклассников',
      'Большинство не знали историю названия улицы',
      'Повысили интерес к истории родного города'
    ],
    callToAction: 'Узнайте историю улицы, на которой живёте вы!',
    type: 'conclusion'
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

              {slide.type === 'content' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-4xl font-bold text-[#2C2416] border-b-2 border-[#8B7355] pb-4">
                    {slide.title}
                  </h2>
                  <p className="font-body text-lg text-[#3E2723] leading-relaxed">
                    {slide.content}
                  </p>
                  {slide.facts && (
                    <div className="space-y-4 mt-8">
                      {slide.facts.map((fact, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-[#E8DCC8] p-4 border-l-4 border-[#8B7355]">
                          <Icon name="FileText" className="text-[#654321] mt-1" size={20} />
                          <span className="font-body text-[#3E2723]">{fact}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {slide.type === 'historical' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="font-heading text-4xl font-bold text-[#2C2416] mb-2">
                      {slide.title}
                    </h2>
                    <p className="font-heading text-2xl text-[#654321] italic">{slide.subtitle}</p>
                  </div>
                  <div className="bg-[#E8DCC8] p-8 border-4 border-double border-[#8B7355]">
                    <p className="font-body text-lg text-[#3E2723] leading-relaxed mb-6">
                      {slide.content}
                    </p>
                    <div className="border-t-2 border-[#8B7355] pt-4">
                      <p className="font-body text-sm text-[#654321] italic">
                        📜 {slide.historicalNote}
                      </p>
                    </div>
                  </div>
                </div>
              )}

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
                  <div className="bg-[#E8DCC8] p-6 border-l-4 border-[#8B7355]">
                    <p className="font-body text-[#3E2723] italic">{slide.context}</p>
                  </div>
                </div>
              )}

              {slide.type === 'biography' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="font-heading text-4xl font-bold text-[#2C2416] mb-2">
                      {slide.title}
                    </h2>
                    <p className="font-heading text-2xl text-[#654321]">{slide.years}</p>
                  </div>
                  <p className="font-body text-lg text-[#3E2723] text-center italic">
                    {slide.content}
                  </p>
                  <div className="grid gap-4 mt-8">
                    {slide.achievements?.map((achievement, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-[#E8DCC8] p-4 border-l-4 border-[#8B7355]">
                        <Icon name="Award" className="text-[#654321] mt-1" size={20} />
                        <span className="font-body text-[#3E2723]">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.type === 'survey' && (
                <div className="space-y-6">
                  <h2 className="font-heading text-4xl font-bold text-[#2C2416] border-b-2 border-[#8B7355] pb-4">
                    {slide.title}
                  </h2>
                  <div className="space-y-6">
                    {slide.questions?.map((item, idx) => (
                      <div key={idx} className="bg-[#E8DCC8] p-6 border-2 border-[#8B7355]">
                        <p className="font-body text-[#3E2723] mb-4 font-semibold">{item.q}</p>
                        <div className="flex gap-4">
                          <div className="flex-1 bg-[#F5E6D3] p-3 border-l-4 border-green-700">
                            <p className="font-body text-sm text-[#654321]">Да: {item.yes}%</p>
                            <div className="w-full bg-[#E8DCC8] h-2 mt-2">
                              <div 
                                className="bg-green-700 h-2" 
                                style={{ width: `${item.yes}%` }}
                              />
                            </div>
                          </div>
                          <div className="flex-1 bg-[#F5E6D3] p-3 border-l-4 border-red-700">
                            <p className="font-body text-sm text-[#654321]">Нет: {item.no}%</p>
                            <div className="w-full bg-[#E8DCC8] h-2 mt-2">
                              <div 
                                className="bg-red-700 h-2" 
                                style={{ width: `${item.no}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.type === 'facts' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-4xl font-bold text-[#2C2416] border-b-2 border-[#8B7355] pb-4">
                    {slide.title}
                  </h2>
                  <div className="grid gap-6">
                    {slide.facts?.map((fact, idx) => (
                      <div key={idx} className="flex items-start gap-4 bg-[#E8DCC8] p-6 border-2 border-[#8B7355] hover:bg-[#DCC9B3] transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#8B7355] flex items-center justify-center">
                          <span className="font-heading text-[#F5E6D3] text-lg font-bold">{idx + 1}</span>
                        </div>
                        <p className="font-body text-[#3E2723] text-lg">{fact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.type === 'conclusion' && (
                <div className="space-y-8">
                  <h2 className="font-heading text-4xl font-bold text-[#2C2416] text-center border-b-2 border-[#8B7355] pb-4">
                    {slide.title}
                  </h2>
                  <div className="space-y-4">
                    {slide.conclusions?.map((conclusion, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-[#E8DCC8] p-4 border-l-4 border-[#8B7355]">
                        <Icon name="CheckCircle2" className="text-green-700 mt-1" size={20} />
                        <span className="font-body text-[#3E2723]">{conclusion}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#8B7355] text-[#F5E6D3] p-8 border-4 border-double border-[#654321] text-center mt-12">
                    <p className="font-heading text-2xl font-bold">{slide.callToAction}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-between mt-8 gap-4">
          <Button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            variant="outline"
            size="lg"
            className="bg-[#F5E6D3] border-2 border-[#8B7355] text-[#654321] hover:bg-[#E8DCC8] disabled:opacity-30"
          >
            <Icon name="ChevronLeft" size={24} />
            <span className="ml-2 font-body">Назад</span>
          </Button>

          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentSlide 
                    ? 'bg-[#654321] w-8' 
                    : 'bg-[#8B7355] opacity-50 hover:opacity-80'
                }`}
                aria-label={`Слайд ${idx + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            variant="outline"
            size="lg"
            className="bg-[#F5E6D3] border-2 border-[#8B7355] text-[#654321] hover:bg-[#E8DCC8] disabled:opacity-30"
          >
            <span className="mr-2 font-body">Вперёд</span>
            <Icon name="ChevronRight" size={24} />
          </Button>
        </div>

        <div className="text-center mt-6">
          <p className="font-body text-[#654321] text-sm">
            Используйте стрелки ← → или кликайте по точкам для навигации
          </p>
        </div>
      </div>
    </div>
  );
}
