// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  colorVars,
  radiusVars,
  spacingVars,
} from '@astryxdesign/core/theme/tokens.stylex';
import {dataVars} from '@astryxdesign/core/theme/dataTokens.stylex';
import {Layout, LayoutContent, VStack, HStack} from '@astryxdesign/core/Layout';
import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';
import {Divider} from '@astryxdesign/core/Divider';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Table, proportional} from '@astryxdesign/core/Table';
import type {TableColumn} from '@astryxdesign/core/Table';
import {
  SegmentedControl,
  SegmentedControlItem,
} from '@astryxdesign/core/SegmentedControl';

type Range = '7d' | '30d' | '90d';

type Metric = {
  id: string;
  label: string;
  value: string;
  delta: number;
};

type Page = {path: string; views: number; share: number};
type Source = {name: string; sessions: number; share: number};

type RangeData = {
  metrics: Metric[];
  daily: number[];
  pages: Page[];
  sources: Source[];
};

const DATA: Record<Range, RangeData> = {
  '7d': {
    metrics: [
      {id: 'visitors', label: 'Visitors', value: '12,480', delta: 4.2},
      {id: 'sessions', label: 'Sessions', value: '18,903', delta: 2.8},
      {id: 'conversion', label: 'Conversion', value: '3.4%', delta: -0.6},
      {id: 'duration', label: 'Avg. session', value: '3m 42s', delta: 7.1},
    ],
    daily: [1480, 1620, 1710, 1590, 1850, 2210, 2020],
    pages: [
      {path: '/', views: 6120, share: 100},
      {path: '/pricing', views: 3480, share: 57},
      {path: '/docs/getting-started', views: 2910, share: 48},
      {path: '/blog/release-notes', views: 1760, share: 29},
      {path: '/contact', views: 940, share: 15},
    ],
    sources: [
      {name: 'Search', sessions: 7840, share: 41},
      {name: 'Direct', sessions: 5120, share: 27},
      {name: 'Referral', sessions: 3460, share: 18},
      {name: 'Social', sessions: 2483, share: 14},
    ],
  },
  '30d': {
    metrics: [
      {id: 'visitors', label: 'Visitors', value: '51,920', delta: 9.4},
      {id: 'sessions', label: 'Sessions', value: '77,350', delta: 6.1},
      {id: 'conversion', label: 'Conversion', value: '3.1%', delta: 0.3},
      {id: 'duration', label: 'Avg. session', value: '3m 18s', delta: -2.4},
    ],
    daily: [
      1500, 1610, 1480, 1720, 1650, 1900, 2050, 1830, 1760, 1940, 2100, 2250,
      2010, 1870, 1960, 2140, 2290, 2380, 2200, 2070, 2150, 2310, 2470, 2390,
      2260, 2180, 2340, 2520, 2610, 2480,
    ],
    pages: [
      {path: '/', views: 24110, share: 100},
      {path: '/pricing', views: 13890, share: 58},
      {path: '/docs/getting-started', views: 12240, share: 51},
      {path: '/blog/release-notes', views: 7010, share: 29},
      {path: '/contact', views: 3720, share: 15},
    ],
    sources: [
      {name: 'Search', sessions: 30210, share: 39},
      {name: 'Direct', sessions: 21060, share: 27},
      {name: 'Referral', sessions: 14770, share: 19},
      {name: 'Social', sessions: 11310, share: 15},
    ],
  },
  '90d': {
    metrics: [
      {id: 'visitors', label: 'Visitors', value: '148,300', delta: 14.8},
      {id: 'sessions', label: 'Sessions', value: '221,040', delta: 11.2},
      {id: 'conversion', label: 'Conversion', value: '2.9%', delta: 0.1},
      {id: 'duration', label: 'Avg. session', value: '3m 05s', delta: -4.9},
    ],
    daily: [
      1200, 1350, 1420, 1580, 1490, 1710, 1850, 1980, 2100, 2040, 2220, 2400,
      2310, 2450, 2590, 2480, 2640, 2770, 2690, 2830, 2960, 2880, 3010, 3150,
    ],
    pages: [
      {path: '/', views: 68400, share: 100},
      {path: '/pricing', views: 38250, share: 56},
      {path: '/docs/getting-started', views: 35120, share: 51},
      {path: '/blog/release-notes', views: 19800, share: 29},
      {path: '/contact', views: 10440, share: 15},
    ],
    sources: [
      {name: 'Search', sessions: 85380, share: 39},
      {name: 'Direct', sessions: 58590, share: 27},
      {name: 'Referral', sessions: 41520, share: 19},
      {name: 'Social', sessions: 35550, share: 15},
    ],
  },
};

const RANGE_LABEL: Record<Range, string> = {
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
};

const formatNumber = (n: number) => n.toLocaleString('en-US');

const pageColumns: TableColumn<Page>[] = [
  {key: 'path', header: 'Page', width: proportional(2)},
  {
    key: 'views',
    header: 'Views',
    align: 'end',
    renderCell: page => (
      <Text hasTabularNumbers>{formatNumber(page.views)}</Text>
    ),
  },
  {
    key: 'share',
    header: 'Relative traffic',
    width: proportional(2),
    renderCell: page => (
      <ProgressBar
        label={`${page.path} relative traffic`}
        isLabelHidden
        value={page.share}
      />
    ),
  },
];

const styles = stylex.create({
  chart: {
    display: 'flex',
    alignItems: 'flex-end',
    columnGap: 2,
    height: 180,
    paddingTop: spacingVars['--spacing-2'],
  },
  bar: (heightPercent: number) => ({
    flexGrow: 1,
    flexBasis: 0,
    minWidth: 2,
    height: `${heightPercent}%`,
    backgroundColor: dataVars['--color-data-categorical-blue'],
    borderStartStartRadius: radiusVars['--radius-inner'],
    borderStartEndRadius: radiusVars['--radius-inner'],
  }),
  barPeak: {
    backgroundColor: dataVars['--color-data-categorical-orange'],
  },
  sourceTrack: {
    display: 'flex',
    height: 12,
    overflow: 'hidden',
    borderRadius: radiusVars['--radius-full'],
    backgroundColor: colorVars['--color-background-muted'],
  },
  sourceSegment: (widthPercent: number) => ({
    width: `${widthPercent}%`,
  }),
  swatch: {
    width: 10,
    height: 10,
    flexShrink: 0,
    borderRadius: radiusVars['--radius-full'],
  },
});

const SOURCE_COLORS = [
  dataVars['--color-data-categorical-blue'],
  dataVars['--color-data-categorical-orange'],
  dataVars['--color-data-categorical-purple'],
  dataVars['--color-data-categorical-green'],
] as const;

const sourceColorStyles = stylex.create({
  c0: {backgroundColor: SOURCE_COLORS[0]},
  c1: {backgroundColor: SOURCE_COLORS[1]},
  c2: {backgroundColor: SOURCE_COLORS[2]},
  c3: {backgroundColor: SOURCE_COLORS[3]},
});
const sourceColor = [
  sourceColorStyles.c0,
  sourceColorStyles.c1,
  sourceColorStyles.c2,
  sourceColorStyles.c3,
] as const;

function MetricCard({metric}: {metric: Metric}) {
  const isUp = metric.delta >= 0;
  const delta = `${isUp ? '+' : ''}${metric.delta.toFixed(1)}%`;
  return (
    <Card>
      <VStack gap={2}>
        <Text type="supporting" color="secondary">
          {metric.label}
        </Text>
        <Text type="display-3" weight="semibold" hasTabularNumbers>
          {metric.value}
        </Text>
        <HStack gap={2} vAlign="center">
          <Badge
            variant={isUp ? 'success' : 'error'}
            label={`${isUp ? '↑' : '↓'} ${delta}`}
          />
          <Text type="supporting" color="secondary">
            vs previous period
          </Text>
        </HStack>
      </VStack>
    </Card>
  );
}

function TrafficChart({daily}: {daily: number[]}) {
  const max = Math.max(...daily);
  const peak = daily.indexOf(max);
  return (
    <Card>
      <VStack gap={3}>
        <VStack gap={1}>
          <Heading level={3}>Daily visitors</Heading>
          <Text type="supporting" color="secondary">
            Peak: {formatNumber(max)} visitors on day {peak + 1}.
          </Text>
        </VStack>
        <div
          role="img"
          aria-label={`Bar chart of daily visitors over ${daily.length} days, peaking at ${formatNumber(max)}.`}
          {...stylex.props(styles.chart)}>
          {daily.map((value, i) => (
            <div
              key={i}
              {...stylex.props(
                styles.bar((value / max) * 100),
                i === peak && styles.barPeak,
              )}
            />
          ))}
        </div>
      </VStack>
    </Card>
  );
}

function SourcesCard({sources}: {sources: Source[]}) {
  return (
    <Card>
      <VStack gap={4}>
        <Heading level={3}>Traffic sources</Heading>
        <div
          role="img"
          aria-label={sources
            .map(source => `${source.name} ${source.share}%`)
            .join(', ')}
          {...stylex.props(styles.sourceTrack)}>
          {sources.map((source, i) => (
            <div
              key={source.name}
              {...stylex.props(
                styles.sourceSegment(source.share),
                sourceColor[i],
              )}
            />
          ))}
        </div>
        <VStack gap={2}>
          {sources.map((source, i) => (
            <HStack key={source.name} gap={2} vAlign="center">
              <span {...stylex.props(styles.swatch, sourceColor[i])} />
              <Text>{source.name}</Text>
              <Text type="supporting" color="secondary">
                {formatNumber(source.sessions)} sessions
              </Text>
              <Text weight="semibold" hasTabularNumbers>
                {source.share}%
              </Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Card>
  );
}

export default function Dashboard() {
  const [range, setRange] = useState<Range>('30d');
  const data = DATA[range];

  return (
    <Layout height="auto" padding={6}>
      <LayoutContent padding={6} role="main">
        <VStack gap={6}>
          <HStack gap={4} vAlign="center" hAlign="between" wrap="wrap">
            <VStack gap={1}>
              <Heading level={1}>Analytics</Heading>
              <Text color="secondary">{RANGE_LABEL[range]}</Text>
            </VStack>
            <SegmentedControl
              label="Date range"
              value={range}
              onChange={value => setRange(value as Range)}>
              <SegmentedControlItem value="7d" label="7 days" />
              <SegmentedControlItem value="30d" label="30 days" />
              <SegmentedControlItem value="90d" label="90 days" />
            </SegmentedControl>
          </HStack>

          <Grid gap={4} columns={{minWidth: 220, max: 4, repeat: 'fit'}}>
            {data.metrics.map(metric => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </Grid>

          <Divider />

          <Grid gap={4} columns={{minWidth: 320, max: 2, repeat: 'fit'}}>
            <TrafficChart daily={data.daily} />
            <SourcesCard sources={data.sources} />
          </Grid>

          <Divider />

          <VStack gap={3}>
            <Heading level={2}>Top pages</Heading>
            <Table data={data.pages} columns={pageColumns} idKey="path" />
          </VStack>
        </VStack>
      </LayoutContent>
    </Layout>
  );
}
