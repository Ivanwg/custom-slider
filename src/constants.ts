export interface ICardDataObj {
  id?: number;
  date: Date;
  title: string;
  desc: string
}

export type TCardsArray = Array<ICardDataObj>;

const miniCardsDataList: TCardsArray = [
  {
    title: 'Ким и Валерия Брейтбурги написали книгу про искусство',
    desc: 'Работа над книгой велась более пяти лет, и действенные методики, описанные в ней, созданные в результате анализа и синтеза идей…'
  },
  {
    title: 'Юрий Колокольников пытается спасти Землю в клипе «Космические силы»',
    desc: 'Премьера клипа «Космические силы» группы «Мумий Тролль» состоялась 6 ноября 2020 года.'
  },
  {
    title: 'BTS получили четыре награды MTV EMA',
    desc: 'BTS получили четыре награды MTV EMA 27-я ежегодная церемония награждения MTV Europe Music Awards состоялась 8 ноября 2020 г.'
  },
  {
    title: 'Открытие сезона «Ла Скала» отменено',
    desc: 'Миланский театр La Scala отменил открытие сезона. Первый спектакль был назначен на 7 декабря — «Лючия ди Ламмермур».'
  }
].map(obj => Object.assign(obj, {date: new Date('2020.11.10')}));

const newCardsDataList = [...miniCardsDataList, ...miniCardsDataList, ...miniCardsDataList, ...miniCardsDataList, ...miniCardsDataList, ...miniCardsDataList];
export const cardsDataList = newCardsDataList.map((obj, index) => {
  return {
    id: index + 1,
    ...obj
  }
});                  

export const mobileCardGap = 10;
export const mediumCardGap = 20;
export const largeCardGap = 40;

export const media2CardsWidth = 580;
export const media3CardsWidth = 840;
export const media4CardsWidth = 1200;

export const cardWidth = 260;
export const slidesTime = 4000;