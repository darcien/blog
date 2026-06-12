import type { TimelineGroup } from "../components/Timeline.astro";

export type Platform =
  | "ASOBI STAGE"
  | "eplus"
  | "Niconico"
  | "OPENREC.tv"
  | "SPWN"
  | "Stagecrowd"
  | "Z-aN"
  | "Zaiko";

/** YYYY-MM-DD */
export type IsoDate = `${number}-${number}-${number}`;

export type WatchedLive = { date: IsoDate; title: string; platform: Platform };

export const WATCHED_LIVES: WatchedLive[] = [
  // ASOBI STAGE
  {
    date: "2024-08-09",
    title:
      "学園アイドルマスター DEBUT LIVE 初 TOUR -初声公演- (Nagoya, special)",
    platform: "ASOBI STAGE",
  },
  {
    date: "2024-08-17",
    title:
      "学園アイドルマスター DEBUT LIVE 初 TOUR -初声公演- (Umeda, day-night)",
    platform: "ASOBI STAGE",
  },
  {
    date: "2024-08-25",
    title:
      "学園アイドルマスター DEBUT LIVE 初 TOUR -初声公演- (Shibuya, day-night)",
    platform: "ASOBI STAGE",
  },
  {
    date: "2024-09-07",
    title:
      "学園アイドルマスター DEBUT LIVE 初 TOUR -初心公演- (Nagoya, special, day)",
    platform: "ASOBI STAGE",
  },
  {
    date: "2024-10-14",
    title:
      "学園アイドルマスター DEBUT LIVE 初 TOUR -初恋公演- (Umeda, special, day-night)",
    platform: "ASOBI STAGE",
  },
  {
    date: "2024-10-19",
    title:
      "学園アイドルマスター DEBUT LIVE 初 TOUR -初恋公演- (Hiroshima, day-night)",
    platform: "ASOBI STAGE",
  },
  {
    date: "2024-10-27",
    title:
      "学園アイドルマスター DEBUT LIVE 初 TOUR -初恋公演- (Shibuya, day-night)",
    platform: "ASOBI STAGE",
  },
  {
    date: "2024-12-14",
    title: "THE IDOLM@STER M@STER EXPO エキスポステージDAY1",
    platform: "ASOBI STAGE",
  },
  {
    date: "2025-02-08",
    title:
      "学園アイドルマスター DEBUT LIVE 初 TOUR -初陣公演- (Nagoya, special, day-night)",
    platform: "ASOBI STAGE",
  },
  {
    date: "2025-02-11",
    title:
      "学園アイドルマスター DEBUT LIVE 初 TOUR -初陣公演- (Umeda, day-night)",
    platform: "ASOBI STAGE",
  },
  {
    date: "2025-02-16",
    title:
      "学園アイドルマスター DEBUT LIVE 初 TOUR -初陣公演- (Shibuya, day-night)",
    platform: "ASOBI STAGE",
  },
  {
    date: "2025-05-24",
    title: "学園アイドルマスター The 1st Period Spotlight Star DAY1",
    platform: "ASOBI STAGE",
  },
  {
    date: "2025-05-25",
    title: "学園アイドルマスター The 1st Period Spotlight Star DAY2",
    platform: "ASOBI STAGE",
  },
  {
    date: "2025-05-31",
    title: "学園アイドルマスター The 1st Period Harmony Star DAY1",
    platform: "ASOBI STAGE",
  },
  {
    date: "2025-06-01",
    title: "学園アイドルマスター The 1st Period Harmony Star DAY2",
    platform: "ASOBI STAGE",
  },
  {
    date: "2025-06-15",
    title:
      "学園アイドルマスター 初星学園放送部 公開録音2025 ～放送部の優雅で軽やかで大騒ぎな一日～",
    platform: "ASOBI STAGE",
  },
  {
    date: "2025-07-04",
    title:
      "学園アイドルマスター DEBUT LIVE 初 TOUR -初陣公演- (Shinjuku addition, special, day-night)",
    platform: "ASOBI STAGE",
  },
  {
    date: "2025-09-20",
    title: "学園アイドルマスター クラス対抗初星大運動会 DAY1",
    platform: "ASOBI STAGE",
  },
  {
    date: "2025-09-21",
    title: "学園アイドルマスター クラス対抗初星大運動会 DAY2",
    platform: "ASOBI STAGE",
  },
  // eplus
  { date: "2023-03-18", title: "hololive 4th fes.", platform: "eplus" },
  // Niconico
  { date: "2023-03-15", title: "Nornis 1st live", platform: "Niconico" },
  // OPENREC.tv
  {
    date: "2025-11-01",
    title: "第１回 お花さん みーてぃんぐっ！ (day, night)",
    platform: "OPENREC.tv",
  },
  // SPWN
  {
    date: "2020-12-21",
    title: 'hololive 2nd fes "Beyond the Stage"',
    platform: "SPWN",
  },
  { date: "2021-02-17", title: 'hololive 1st live "Bloom"', platform: "SPWN" },
  {
    date: "2021-10-21",
    title: 'Hoshimachi Suisei 1st solo live "STELLAR into the GALAXY"',
    platform: "SPWN",
  },
  {
    date: "2022-03-20",
    title: 'hololive 3rd fes "Link Your Wish"',
    platform: "SPWN",
  },
  // Stagecrowd (JP)
  {
    date: "2025-08-03",
    title:
      "春咲暖 presents　「☆夏のうたたねまつり☆ 〜トキめく準備はできてるか〜」",
    platform: "Stagecrowd",
  },
  {
    date: "2025-08-03",
    title:
      "陽高真白 presents　「☆夏の大暴走まつり☆ 〜ハジける準備はできてるか〜」",
    platform: "Stagecrowd",
  },
  // Z-aN
  { date: "2023-06-17", title: "Planet Station stage 8", platform: "Z-aN" },
  { date: "2023-08-27", title: "Hololive Splash Party", platform: "Z-aN" },
  {
    date: "2023-09-03",
    title: 'KOKO 2nd one-man live "PLAYER II -Kamitsubaki City AREA 4-"',
    platform: "Z-aN",
  },
  {
    date: "2023-09-13",
    title: 'Blue Journey 1st live "Yoake no Uta"',
    platform: "Z-aN",
  },
  {
    date: "2024-01-13",
    title: 'V.W.P 2nd one-man live "GENSHO II -MAJYOKAKUSEI-"',
    platform: "Z-aN",
  },
  {
    date: "2024-01-14",
    title: 'KAF 4th solo live concert "KAIKA"',
    platform: "Z-aN",
  },
  {
    date: "2024-04-09",
    title: 'Albemuth 1st one-man live "Guilty and Eden"',
    platform: "Z-aN",
  },
  {
    date: "2024-04-10",
    title: 'Harusaruhi 3rd one-man live "Shamanism III"',
    platform: "Z-aN",
  },
  {
    date: "2024-08-07",
    title: 'Isekaijoucho 3rd one-man live "Anima III"',
    platform: "Z-aN",
  },
  {
    date: "2024-08-08",
    title: "KAMITSUBAKI FES '24 THE DAY THE EARTH STOOD STILL",
    platform: "Z-aN",
  },
  {
    date: "2024-09-15",
    title: 'RIM 3rd one-man live "NEUROMANCE III"',
    platform: "Z-aN",
  },
  {
    date: "2024-11-02",
    title: 'KAMITSUBAKI WARS 2024 DAY-1 "Re:The PhenomenonⅡ"',
    platform: "Z-aN",
  },
  { date: "2024-12-28", title: 'ASU 1st ONE-MAN LIVE "RAY"', platform: "Z-aN" },
  {
    date: "2025-05-14",
    title: 'KOKO 3rd ONE-MAN LIVE "PLAYER III"',
    platform: "Z-aN",
  },
  {
    date: "2025-06-14",
    title: "KAMITSUBAKI KORAKUEN BATTLEFRONT KAMITSUBAKI XPERIENCE DAY 2",
    platform: "Z-aN",
  },
  {
    date: "2025-08-30",
    title: 'ASU 2nd ONE-MAN LIVE "BIRTH"',
    platform: "Z-aN",
  },
  // Zaiko
  {
    date: "2023-01-28",
    title: 'Hoshimachi Suisei 2nd solo live "Shout in Crisis"',
    platform: "Zaiko",
  },
  {
    date: "2024-05-04",
    title: 'Hanabasami Kyo 4th one-man live "FLORIST"',
    platform: "Zaiko",
  },
  {
    date: "2025-09-06",
    title:
      "薄井友里・川村玲奈のすーぱーかわちぃ☆ゆりれいしょん レク1〜なちゅまちゅり〜",
    platform: "Zaiko",
  },
];

const monthName = (yearMonth: string) =>
  new Date(`${yearMonth}-01T00:00:00Z`).toLocaleString("en", {
    month: "long",
    timeZone: "UTC",
  });

/** Group watched lives by month, newest first, for the Timeline component. */
export function watchedLivesGroups(): TimelineGroup[] {
  const byYearMonth = Map.groupBy(
    WATCHED_LIVES.toSorted((a, b) => b.date.localeCompare(a.date)),
    (live) => live.date.slice(0, 7),
  );

  // show each year once, on its newest month
  return [...byYearMonth.entries()].map(([yearMonth, lives], i, entries) => {
    const year = yearMonth.slice(0, 4);
    const prevYear = entries[i - 1]?.[0].slice(0, 4);
    return {
      separatorLabel: year === prevYear ? undefined : year,
      label: monthName(yearMonth),
      items: lives.map((live) => ({
        title: live.title,
        date: live.date,
        detail: live.platform,
      })),
    };
  });
}
