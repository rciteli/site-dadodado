export type PlayerId = string;
export type Platform = 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'x';

export type Player = {
  id: PlayerId;
  name: string;
  color: string;
  avatar: string;
  sirIndex: number;
  trend: 'up' | 'down';
  trendValue: number;
  isClient?: boolean;
};

export type RadarRow = {
  metric: 'Presença' | 'Popularidade' | 'Atividade' | 'Engajamento' | 'Difusão';
  [playerName: string]: number | string;
};

export type TimeSeriesRow = {
  date: string;
  [playerName: string]: number | string;
};

export type PlatformMetricsRow = {
  platform: Platform;
  followers?: number;
  subscribers?: number;
  posts?: number;
  videos?: number;
  tweets?: number;
  engagementPct: number;
  likes?: number;
  comments?: number;
  shares?: number;
  views?: number;
  mentions?: number;
};

export const players: Player[] = [
  { id: '1', name: 'Candidato A', color: '#3b82f6', avatar: 'CA', sirIndex: 87, trend: 'up',   trendValue: 5.2, isClient: true },
  { id: '2', name: 'Candidato B', color: '#ef4444', avatar: 'CB', sirIndex: 73, trend: 'down', trendValue: -2.1 },
  { id: '3', name: 'Marca X',    color: '#10b981', avatar: 'MX', sirIndex: 65, trend: 'up',    trendValue: 3.8 },
  { id: '4', name: 'Marca Y',    color: '#f59e0b', avatar: 'MY', sirIndex: 58, trend: 'up',    trendValue: 1.5 },
];

export const radarData: RadarRow[] = [
  { metric: 'Presença',     'Candidato A': 85, 'Candidato B': 70, 'Marca X': 60, 'Marca Y': 55 },
  { metric: 'Popularidade', 'Candidato A': 90, 'Candidato B': 75, 'Marca X': 68, 'Marca Y': 62 },
  { metric: 'Atividade',    'Candidato A': 88, 'Candidato B': 72, 'Marca X': 65, 'Marca Y': 58 },
  { metric: 'Engajamento',  'Candidato A': 82, 'Candidato B': 78, 'Marca X': 70, 'Marca Y': 60 },
  { metric: 'Difusão',      'Candidato A': 89, 'Candidato B': 69, 'Marca X': 63, 'Marca Y': 56 },
];

const dates = ['Jan', 'Fev', 'Mar', 'Abr'] as const;
export const dimKeys = ['Presença','Popularidade','Atividade','Engajamento','Difusão'] as const;

export const dimensionSeries: Record<(typeof dimKeys)[number], TimeSeriesRow[]> = Object.fromEntries(
  dimKeys.map((dim) => {
    const baseRow = radarData.find(r => r.metric === dim)!;
    return [
      dim,
      dates.map((d, i) => {
        const row: any = { date: d };
        players.forEach(p => {
          const v = Number(baseRow[p.name] || 0);
          row[p.name] = Math.max(0, Math.min(100, v - 3 + i * 2));
        });
        return row;
      })
    ];
  })
) as any;

export const platformDataByPlayer: Record<string, PlatformMetricsRow[]> = {
  'Candidato A': [
    { platform: 'facebook',  followers: 125000, posts: 45, engagementPct: 8.5,  likes: 15600, comments: 2340, shares: 890 },
    { platform: 'instagram', followers:  89000, posts: 32, engagementPct: 12.3, likes: 23400, comments: 1890 },
    { platform: 'tiktok',    followers: 156000, posts: 28, engagementPct: 15.7, likes: 45600, comments: 3200, shares: 1200 },
    { platform: 'youtube',   subscribers: 67000, videos: 12, engagementPct: 9.8, views: 890000, likes: 12300, comments: 1200 },
    { platform: 'x',         followers: 234000, tweets: 156, engagementPct: 7.2, likes: 4500, comments: 890, mentions: 890 },
  ],
  'Candidato B': [
    { platform: 'facebook',  followers:  98000, posts: 38, engagementPct: 6.8, likes: 12300, comments: 1890, shares: 670 },
    { platform: 'instagram', followers:  67000, posts: 29, engagementPct: 9.5, likes: 18900, comments: 1450 },
    { platform: 'tiktok',    followers: 123000, posts: 24, engagementPct:13.2, likes: 34500, comments: 2800, shares: 950 },
    { platform: 'youtube',   subscribers: 45000, videos:  8, engagementPct: 7.8, views: 567000, likes: 8900, comments: 950 },
    { platform: 'x',         followers: 189000, tweets: 134, engagementPct: 5.9, likes: 3200, comments: 670, mentions: 670 },
  ],
  'Marca X': [
    { platform: 'facebook',  followers: 61000, posts: 22, engagementPct: 7.2, likes: 6100, comments: 820, shares: 300 },
    { platform: 'instagram', followers: 54000, posts: 18, engagementPct:10.8, likes: 9800, comments: 750 },
    { platform: 'tiktok',    followers: 80000, posts: 14, engagementPct:12.1, likes:15000, comments:1100, shares: 410 },
    { platform: 'youtube',   subscribers:35000, videos:  6, engagementPct: 6.9, views:320000, likes: 4500, comments: 400 },
    { platform: 'x',         followers: 92000, tweets:  70, engagementPct: 4.9, likes: 1800, comments: 260, mentions: 220 },
  ],
  'Marca Y': [
    { platform: 'facebook',  followers: 52000, posts: 20, engagementPct: 6.5, likes: 5400, comments: 700, shares: 210 },
    { platform: 'instagram', followers: 47000, posts: 16, engagementPct: 9.3, likes: 8700, comments: 610 },
    { platform: 'tiktok',    followers: 64000, posts: 12, engagementPct:11.2, likes:12000, comments: 950, shares: 300 },
    { platform: 'youtube',   subscribers:28000, videos:  5, engagementPct: 6.1, views:240000, likes: 3200, comments: 310 },
    { platform: 'x',         followers: 74000, tweets:  62, engagementPct: 4.4, likes: 1400, comments: 190, mentions: 170 },
  ],
};

export const platformPrevDataByPlayer: typeof platformDataByPlayer = {
  'Candidato A': [
    { platform: 'facebook',  followers: 120000, posts: 42, engagementPct: 7.9, likes: 15000, comments: 2100, shares: 820 },
    { platform: 'instagram', followers:  86000, posts: 30, engagementPct:11.6, likes: 22000, comments: 1750 },
    { platform: 'tiktok',    followers: 150000, posts: 25, engagementPct:14.9, likes: 43000, comments: 3000, shares: 1100 },
    { platform: 'youtube',   subscribers: 64000, videos: 11, engagementPct: 9.1, views: 820000, likes: 11500, comments: 1100 },
    { platform: 'x',         followers: 226000, tweets: 150, engagementPct: 6.7, likes: 4200, comments: 820, mentions: 830 },
  ],
  'Candidato B': [
    { platform: 'facebook',  followers: 95000, posts: 36, engagementPct: 6.3, likes: 11500, comments: 1700, shares: 610 },
    { platform: 'instagram', followers: 65000, posts: 27, engagementPct: 8.9, likes: 17500, comments: 1320 },
    { platform: 'tiktok',    followers:118000, posts: 22, engagementPct:12.5, likes: 32000, comments: 2650, shares: 880 },
    { platform: 'youtube',   subscribers:43000, videos:  7, engagementPct: 7.2, views: 520000, likes: 8200, comments: 880 },
    { platform: 'x',         followers:182000, tweets: 128, engagementPct: 5.5, likes: 3000, comments: 640, mentions: 630 },
  ],
  'Marca X': [
    { platform: 'facebook',  followers: 59000, posts: 21, engagementPct: 6.8, likes: 5800, comments: 780, shares: 280 },
    { platform: 'instagram', followers: 52000, posts: 17, engagementPct:10.2, likes: 9200, comments: 700 },
    { platform: 'tiktok',    followers: 77000, posts: 13, engagementPct:11.5, likes:14000, comments:1030, shares: 380 },
    { platform: 'youtube',   subscribers:33000, videos:  5, engagementPct: 6.5, views:300000, likes: 4200, comments: 370 },
    { platform: 'x',         followers: 90000, tweets:  66, engagementPct: 4.6, likes: 1700, comments: 240, mentions: 210 },
  ],
  'Marca Y': [
    { platform: 'facebook',  followers: 50500, posts: 19, engagementPct: 6.2, likes: 5100, comments: 660, shares: 200 },
    { platform: 'instagram', followers: 45500, posts: 15, engagementPct: 8.7, likes: 8200, comments: 570 },
    { platform: 'tiktok',    followers: 62000, posts: 11, engagementPct:10.5, likes:11000, comments: 900, shares: 280 },
    { platform: 'youtube',   subscribers:27000, videos:  5, engagementPct: 5.9, views:230000, likes: 3000, comments: 290 },
    { platform: 'x',         followers: 72000, tweets:  60, engagementPct: 4.2, likes: 1330, comments: 180, mentions: 160 },
  ],
};
