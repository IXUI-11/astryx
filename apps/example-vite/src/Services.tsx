// Copyright (c) Meta Platforms, Inc. and affiliates.

import * as stylex from '@stylexjs/stylex';
import {
  colorVars,
  radiusVars,
  spacingVars,
} from '@astryxdesign/core/theme/tokens.stylex';
import {Layout, LayoutContent, VStack, HStack} from '@astryxdesign/core/Layout';
import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';

type Service = {
  id: string;
  title: string;
  description: string;
  stack: string;
  variant: 'yellow' | 'blue' | 'orange';
  cell: 'feature' | 'small';
};

const SERVICES: Service[] = [
  {
    id: 'showcase',
    title: 'Site vitrine',
    description:
      'Un site clair et rapide pour présenter votre activité, pensé pour le mobile et pour être trouvé sur les moteurs de recherche.',
    stack: 'Angular · React · PHP',
    variant: 'yellow',
    cell: 'feature',
  },
  {
    id: 'webapp',
    title: 'Application sur mesure',
    description: 'Comptes, rôles, base de données et interface soignée.',
    stack: 'ASP.NET · MySQL',
    variant: 'blue',
    cell: 'small',
  },
  {
    id: 'hosting',
    title: 'Hébergement',
    description: 'Serveur, nom de domaine, HTTPS et sauvegardes.',
    stack: 'VPS · Linux',
    variant: 'orange',
    cell: 'small',
  },
];

const STEPS = [
  {title: 'Échange', text: 'On définit le besoin, le public et le budget.'},
  {title: 'Maquette', text: 'Vous validez la structure et le design.'},
  {
    title: 'Développement',
    text: 'Je construis le site, avec des points réguliers.',
  },
  {title: 'Mise en ligne', text: 'Déploiement, tests et prise en main.'},
];

const PILLS = ['Maquette', 'Développement', 'Mise en ligne'] as const;

// A numeric Grid never reflows, and the bento needs cells that span rows.
// A local grid with media rules keeps one, two or four columns by width.
const styles = stylex.create({
  bento: {
    display: 'grid',
    gap: spacingVars['--spacing-4'],
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 640px)': 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 960px)': 'repeat(4, minmax(0, 1fr))',
    },
  },
  feature: {
    gridColumn: {
      default: 'auto',
      '@media (min-width: 640px)': 'span 2',
    },
    gridRow: {
      default: 'auto',
      '@media (min-width: 960px)': 'span 2',
    },
  },
  wide: {
    gridColumn: {
      default: 'auto',
      '@media (min-width: 640px)': 'span 2',
    },
  },
  stepNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    flexShrink: 0,
    borderRadius: radiusVars['--radius-full'],
    backgroundColor: colorVars['--color-accent'],
    color: colorVars['--color-on-accent'],
  },
  pills: {
    alignItems: 'flex-start',
  },
  pillShifted: {
    marginInlineStart: spacingVars['--spacing-8'],
  },
  pillShiftedLess: {
    marginInlineStart: spacingVars['--spacing-3'],
  },
  fill: {
    height: '100%',
  },
});

function ServiceCard({service}: {service: Service}) {
  const isFeature = service.cell === 'feature';
  return (
    <div {...stylex.props(isFeature && styles.feature, styles.fill)}>
      <Card variant={service.variant} padding={isFeature ? 8 : 6} height="100%">
        <VStack gap={3} height="100%">
          <Heading level={3} type={isFeature ? 'display-3' : undefined}>
            {service.title}
          </Heading>
          <Text>{service.description}</Text>
          <Text weight="bold" size="sm">
            {service.stack}
          </Text>
        </VStack>
      </Card>
    </div>
  );
}

export default function Services() {
  return (
    <Layout height="auto" padding={6} contentWidth={1120}>
      <LayoutContent padding={6} role="main">
        <VStack gap={10}>
          <Grid
            gap={6}
            align="center"
            columns={{minWidth: 320, max: 2, repeat: 'fit'}}>
            <VStack gap={5}>
              <Heading level={1} type="display-1">
                Votre site, de A à Z.
              </Heading>
              <Text type="large">
                Je conçois, développe et héberge des sites web qui font le
                travail : clairs, rapides, faciles à gérer.
              </Text>
              <HStack gap={3} wrap="wrap">
                <Button
                  label="Demander un devis"
                  variant="primary"
                  size="lg"
                  href="#contact"
                />
                <Button
                  label="Voir les services"
                  variant="secondary"
                  size="lg"
                  href="#services"
                />
              </HStack>
            </VStack>
            <Card variant="blue" padding={8} minHeight={260}>
              <VStack gap={2} justify="end" height="100%">
                {PILLS.map((pill, i) => (
                  <div
                    key={pill}
                    {...stylex.props(
                      styles.pills,
                      i === 1 && styles.pillShifted,
                      i === 2 && styles.pillShiftedLess,
                    )}>
                    <Badge
                      label={pill}
                      variant={i === 2 ? 'orange' : 'yellow'}
                    />
                  </div>
                ))}
              </VStack>
            </Card>
          </Grid>

          <VStack gap={4} id="services">
            <Heading level={2}>Mes services</Heading>
            <div {...stylex.props(styles.bento)}>
              {SERVICES.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
              <div {...stylex.props(styles.wide)}>
                <Card variant="gray" padding={6} height="100%">
                  <HStack gap={4} vAlign="center" hAlign="between" wrap="wrap">
                    <VStack gap={1}>
                      <Heading level={3}>Maintenance</Heading>
                      <Text>
                        Corrections, mises à jour, nouvelles fonctionnalités.
                      </Text>
                    </VStack>
                    <Button
                      label="Me contacter"
                      variant="primary"
                      href="#contact"
                    />
                  </HStack>
                </Card>
              </div>
            </div>
          </VStack>

          <VStack gap={4}>
            <Heading level={2}>Comment ça se passe</Heading>
            <Grid gap={6} columns={{minWidth: 220, max: 4, repeat: 'fit'}}>
              {STEPS.map((step, i) => (
                <VStack key={step.title} gap={2}>
                  <span {...stylex.props(styles.stepNumber)}>
                    <Text weight="semibold" color="inherit">
                      {i + 1}
                    </Text>
                  </span>
                  <Heading level={3}>{step.title}</Heading>
                  <Text color="secondary">{step.text}</Text>
                </VStack>
              ))}
            </Grid>
          </VStack>

          <Card variant="yellow" padding={8}>
            <VStack gap={3} id="contact">
              <Heading level={2}>Un projet en tête ?</Heading>
              <Text>
                Décrivez votre besoin en quelques lignes, je vous réponds avec
                une proposition.
              </Text>
              <HStack>
                <Button
                  label="Me contacter"
                  variant="primary"
                  size="lg"
                  href="mailto:contact@example.com"
                />
              </HStack>
            </VStack>
          </Card>
        </VStack>
      </LayoutContent>
    </Layout>
  );
}
